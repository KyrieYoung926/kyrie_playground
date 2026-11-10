import {test,expect} from '@playwright/test';
import fs from 'node:fs';
async function open(page,mode='manual',seed=21){await page.goto(`/?task=shoot-rubber&mode=${mode}&seed=${seed}&audit`);await page.waitForFunction(()=>window.catchLab?.state.ready,null,{timeout:90000});await page.evaluate(()=>{window.__catchEngine.pause();window.__catchEngine.runtime.renderer.setAnimationLoop(null);window.catchLab.startAudit();});}
async function step(page,n,drive=false){return page.evaluate(async({n,drive})=>{const r=window.__catchEngine.runtime;
 for(let i=0;i<n&&!window.catchLab.state.done;i++){
 const o=window.catchLab.observation;
 if(drive&&o.states){const s=o.states[o.holder],g=window.catchLab.challenge.spot.goal,dx=g[0]-s.root[0],dy=g[1]-s.root[1],yaw=Math.atan2(s.R[3],s.R[0]),x=Math.cos(yaw)*dx+Math.sin(yaw)*dy,y=-Math.sin(yaw)*dx+Math.cos(yaw)*dy;o.manual.keys=new Set();if(Math.hypot(dx,dy)>.07){if(Math.abs(x)>.045)o.manual.keys.add(x>0?'KeyW':'KeyS');if(Math.abs(y)>.045)o.manual.keys.add(y>0?'KeyA':'KeyD');}}
 const holder=o.holder,c=o.robots[holder],q=Array.from(r.mjData.qpos.slice(c.rootQ,c.rootQ+36)),ball=Array.from(r.mjData.qpos.slice(o.bq,o.bq+7));
 const obs=await r.policyRunner.collectObservationsByKey(r.policyStateBuilder.build());
 if(q.some((x,j)=>x!==r.mjData.qpos[c.rootQ+j])||ball.some((x,j)=>x!==r.mjData.qpos[o.bq+j]))throw Error('Active robot/ball teleported');
 await r.processActions(await r.runOnnxInference(obs));r.executeSimulationSteps();r.episodeLength++;r.mujoco.mj_forward(r.mjModel,r.mjData);r.updateCachedState();if(i%100===0)await new Promise(resolve=>setTimeout(resolve,0));}
 return JSON.parse(JSON.stringify({...window.catchLab.state,challenge:window.catchLab.challenge?.summary,relay:window.catchLab.observation.relay,results:window.catchLab.observation.results,root:Array.from(r.mjData.qpos.slice(0,3))}));},{n,drive});}
test('three sets of six consecutive physical handoffs and carry after catch',async({page})=>{test.setTimeout(900000);let rows=[];let resources;
 for(const [set,distance] of [1.25,1.5,1.75].entries()){
  await open(page);await step(page,80);await page.evaluate(()=>window.catchLab.observation.manual.keys.add('KeyQ'));await step(page,225);await page.evaluate(()=>window.catchLab.observation.manual.keys.clear());await step(page,100);
  for(let leg=0;leg<6;leg++){
   await page.evaluate(()=>{window.catchLab.passConfirm();window.__catchEngine.pause();});let a=await step(page,100);
   expect(a.manual.stage,JSON.stringify(a)).toBe('pass_distance');
   const offset=[0,.1,-.1][leg%3];
   await page.evaluate(({distance,offset})=>{const o=window.catchLab.observation;o.manual.offset=offset;o.manual.phaseStart=window.catchLab.state.time-(2-distance)*1.2;},{distance,offset});a=await step(page,1);
   expect(a.manual.receiver.valid).toBe(true);
   await page.evaluate(()=>{window.catchLab.passConfirm();window.__catchEngine.pause();});let out=await step(page,550);
   const current=await page.evaluate(()=>{const r=window.__catchEngine.runtime,p=window.catchLab.observation.pool;return{heap:r.mjData.qpos.buffer.byteLength,nq:r.mjModel.nq,nu:r.mjModel.nu,meshes:p.meshes.map(m=>m.length),materialCount:p.meshes.flat().reduce((n,o)=>n+(o.isMesh?(Array.isArray(o.material)?o.material.length:1):0),0),hidden:p.meshes[1-window.catchLab.observation.holder].every(o=>!o.visible),isolated:p.geoms[1-window.catchLab.observation.holder].every(g=>r.mjModel.geom_contype[g]===0&&r.mjModel.geom_conaffinity[g]===0)};});
   if(leg===0)resources=current;else expect(current).toEqual(resources);expect(current.hidden&&current.isolated).toBe(true);
   rows.push({set,leg,distance,offset,out,resources:current});fs.writeFileSync('/tmp/relay-endurance.json',JSON.stringify(rows,null,2));console.log('ENDURANCE',set,leg,out.passStreak,out.reason,out.manual.stage);
   expect(out.passStreak,JSON.stringify(out)).toBe(leg+1);expect(out.done).toBe(false);expect(out.holder).toBe((leg+1)%2);
   // Preserve carry targets after an actual catch and move under physics, no state writes.
   if(leg===2){await page.evaluate(()=>window.catchLab.observation.manual.keys.add('KeyS'));await step(page,30);await page.evaluate(()=>window.catchLab.observation.manual.keys.clear());await step(page,100);}
  }
 }
});
