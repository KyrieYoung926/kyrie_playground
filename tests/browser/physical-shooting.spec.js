import {test,expect} from '@playwright/test';
import fs from 'node:fs';
for(const journey of [false,true])test(`physical shooting journey=${journey}`,async({page})=>{
 test.setTimeout(240000);page.on('pageerror',e=>console.log('PAGEERROR',e.message));
 await page.goto(`/?task=shoot-rubber&audit${journey?'&journey=1':'&mode=shot'}`);await page.waitForFunction(()=>window.catchLab?.state.ready,null,{timeout:90000});
 const out=await page.evaluate(async()=>{
  const r=window.__catchEngine.runtime;window.__catchEngine.pause();r.renderer.setAnimationLoop(null);window.catchLab.startAudit();
  const phases=[];let last;
  for(let i=0;i<1800&&!window.catchLab.state.done;i++){
   const obs=await r.policyRunner.collectObservationsByKey(r.policyStateBuilder.build());await r.processActions(await r.runOnnxInference(obs));r.executeSimulationSteps();r.episodeLength++;r.mujoco.mj_forward(r.mjModel,r.mjData);r.updateCachedState();
   if(last!==window.catchLab.state.journeyStage){last=window.catchLab.state.journeyStage;phases.push({phase:last,time:r.mjData.time,q:Array.from(r.mjData.qpos.slice(0,3)),hold:window.catchLab.state.hold});}
   if(i%100===0)await new Promise(resolve=>setTimeout(resolve,0));
  }
  r.renderer.setAnimationLoop(r.render);return {...window.catchLab.state,phases};
 });fs.writeFileSync(`/tmp/physical-shot-${journey}.json`,JSON.stringify(out,null,2));console.log('PHYSICAL',JSON.stringify(out));
 await page.waitForTimeout(100);await page.screenshot({path:`/tmp/physical-shot-${journey}.png`,fullPage:true});
 expect(out.finiteObservation).toBe(true);expect(out.success).toBe(true);
});

test('challenge switching resets history, preserves score, and celebration never changes physics',async({page})=>{
 test.setTimeout(180000);await page.goto('/?task=shoot-rubber&mode=shot&audit');await page.waitForFunction(()=>window.catchLab?.state.ready,null,{timeout:90000});
 async function finish(){return page.evaluate(async()=>{
  const r=window.__catchEngine.runtime;window.__catchEngine.pause();r.renderer.setAnimationLoop(null);window.catchLab.startAudit();
  for(let i=0;i<1600&&!window.catchLab.state.done;i++){
   const obs=await r.policyRunner.collectObservationsByKey(r.policyStateBuilder.build());await r.processActions(await r.runOnnxInference(obs));r.executeSimulationSteps();r.episodeLength++;r.mujoco.mj_forward(r.mjModel,r.mjData);r.updateCachedState();if(i%100===0)await new Promise(resolve=>setTimeout(resolve,0));
  }return window.catchLab.state;
 });}
 expect((await finish()).baskets).toBe(1);await expect(page.locator('#basket-count')).toHaveText('Made / Shots · 1 / 1 · 100%');
 const before=await page.evaluate(()=>Array.from(window.__catchEngine.runtime.mjData.qpos));await page.waitForTimeout(200);
 expect(await page.evaluate(()=>Array.from(window.__catchEngine.runtime.mjData.qpos))).toEqual(before);
 await page.emulateMedia({reducedMotion:'reduce'});await page.locator('#shoot-mode').selectOption('journey');await page.evaluate(()=>window.catchLab.reset());
 expect(await page.evaluate(()=>window.catchLab.state.time)).toBe(0);await expect(page.locator('.basket-celebration')).toHaveCount(0);
 const s=await finish();expect(s.success).toBe(true);expect(s.baskets).toBe(2);expect(s.catches).toBe(1);await expect(page.locator('#basket-count')).toHaveText('Made / Shots · 1 / 1 · 100%');await expect(page.locator('.basket-celebration i')).toHaveCount(0);
 await page.setViewportSize({width:390,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
 await page.evaluate(()=>{const r=window.__catchEngine.runtime;r.renderer.setAnimationLoop(r.render);});await page.waitForTimeout(100);await page.screenshot({path:'/tmp/physical-journey-mobile.png',fullPage:true});
});

test('browser floor, rim and board produce physical rebound',async({page})=>{
 await page.goto('/?task=shoot-rubber&mode=shot&audit');await page.waitForFunction(()=>window.catchLab?.state.ready,null,{timeout:90000});
 const rows=await page.evaluate(()=>{
  const r=window.__catchEngine.runtime,m=r.mjModel,d=r.mjData,mj=r.mujoco;window.__catchEngine.pause();
  const id=(kind,name)=>mj.mj_name2id(m,mj.mjtObj[kind].value,name),j=id('mjOBJ_JOINT','ball/ball_freejoint'),q=m.jnt_qposadr[j],v=m.jnt_dofadr[j],bg=id('mjOBJ_GEOM','ball/ball_geom');
  const rows=[];
  for(const type of ['drop','board','rim']){
   mj.mj_resetDataKeyframe(m,d,0);d.qpos[0]=-5;d.qvel.fill(0);d.mocap_pos.set([0,0,2]);d.mocap_quat.set([1,0,0,0]);d.qpos.set([1,0,0,0],q+3);
   let axis;
   if(type==='drop'){d.qpos.set([3,0,2],q);axis=2;}
   else if(type==='board'){d.qpos.set([-.5,0,2.45],q);d.qvel[v]=4;axis=0;}
   else{d.qpos.set([0,-.8,2.08],q);d.qvel[v+1]=4;axis=1;}
   mj.mj_forward(m,d);let impact=null,rebound=0,apex=.11;const names=new Set();
   for(let i=0;i<650;i++){
    const before=d.qvel[v+axis];mj.mj_step(m,d);const contacts=d.contact;
    for(let k=0;k<d.ncon;k++){const c=contacts.get(k),other=c.geom1===bg?c.geom2:c.geom2===bg?c.geom1:-1;c.delete();if(other>=0){if(impact===null)impact=before;names.add(mj.mj_id2name(m,mj.mjtObj.mjOBJ_GEOM.value,other));}}contacts.delete();
    if(impact!==null){rebound=type==='drop'?Math.max(rebound,d.qvel[v+axis]):Math.min(rebound,d.qvel[v+axis]);apex=Math.max(apex,d.qpos[q+2]);}
   }rows.push({type,impact,rebound,apex,contacts:[...names]});
  }return rows;
 });console.log('BROWSER_BOUNCE',JSON.stringify(rows));fs.writeFileSync('/tmp/browser-bounce.json',JSON.stringify(rows,null,2));
 expect(rows[0].apex).toBeGreaterThan(.8);expect(rows[0].apex).toBeLessThan(1);expect(rows[1].contacts).toContain('hoop/backboard');expect(rows[2].contacts.some(x=>x.startsWith('hoop/rim'))).toBe(true);for(const r of rows.slice(1))expect(r.rebound).toBeLessThan(-.5);
});
