import {test,expect} from '@playwright/test';
import fs from 'node:fs';
for(const task of ['pass-rubber','shoot-rubber'])test(`${task} distance and bearing acceptance grid`,async({page})=>{
 test.setTimeout(600000);
 const rows=[];const distances=task==='pass-rubber'?[1,1.5,2,2.5,2.75]:[1,1.5,1.75,2];
 for(const distance of distances)for(const angle of [-60,0,60]){
  await page.goto(`/?task=${task}&audit&mode=shot&distance=${distance}&yaw=${angle}`);
  await page.waitForFunction(()=>window.catchLab?.state.ready,null,{timeout:90000});
  const out=await page.evaluate(async()=>{
   const r=window.__catchEngine.runtime;window.__catchEngine.pause();r.renderer.setAnimationLoop(null);window.catchLab.startAudit();
   for(let i=0;i<405 && !window.catchLab.state.done;i++){
    const obs=await r.policyRunner.collectObservationsByKey(r.policyStateBuilder.build());await r.processActions(await r.runOnnxInference(obs));r.executeSimulationSteps();r.episodeLength++;r.mujoco.mj_forward(r.mjModel,r.mjData);r.updateCachedState();
    if(i%50===0)await new Promise(resolve=>setTimeout(resolve,0));
   }
   const s=window.catchLab.state;return {success:s.success,reason:s.reason,time:s.time,error:s.crossing?.distance,events:s.events,finite:s.finiteObservation};
  });
  rows.push({mode:task==='pass-rubber'?'pass':'shot',distance,angle,...out});
  console.log('GRID',JSON.stringify(rows.at(-1)));expect(out.finite).toBe(true);
  if(distance===1.5&&angle===0) { await page.evaluate(()=>{const r=window.__catchEngine.runtime;r.renderer.setAnimationLoop(r.render);});await page.waitForTimeout(200); }
  if(distance===1.5&&angle===0)await page.screenshot({path:`/tmp/${task}-new.png`,fullPage:true});
 }
 fs.writeFileSync(`/tmp/${task}-web-grid.json`,JSON.stringify(rows,null,2));
 expect(rows.filter(x=>x.distance<=2&&x.success).length).toBeGreaterThanOrEqual(task==='pass-rubber'?7:8);
});
for(const yaw of [-45,45])test(`rally ${yaw} degree opening`,async({page})=>{
 test.setTimeout(240000);await page.goto(`/?task=rally-rubber&audit&yaw=${yaw}`);await page.waitForFunction(()=>window.catchLab?.state.ready,null,{timeout:90000});
 const out=await page.evaluate(async()=>{
  const r=window.__catchEngine.runtime;window.__catchEngine.pause();r.renderer.setAnimationLoop(null);window.catchLab.startAudit();
  for(let i=0;i<1700&&!window.catchLab.state.done&&window.catchLab.state.catches<6;i++){
   const obs=await r.policyRunner.collectObservationsByKey(r.policyStateBuilder.build());await r.processActions(await r.runOnnxInference(obs));r.executeSimulationSteps();r.episodeLength++;r.mujoco.mj_forward(r.mjModel,r.mjData);r.updateCachedState();if(i%50===0)await new Promise(resolve=>setTimeout(resolve,0));
  }
  return window.catchLab.state;
 });console.log('RALLY_DIRECTION',yaw,JSON.stringify(out));fs.writeFileSync(`/tmp/rally-${yaw}.json`,JSON.stringify(out,null,2));
 expect(out.events.find(x=>x.event==='release')?.valid).toBe(true);expect(out.catches).toBeGreaterThanOrEqual(4);
});
test('robot spacing limit reloads and automatically restarts a clean rally',async({page})=>{
 test.setTimeout(180000);await page.goto('/?task=rally-rubber&audit');await page.waitForFunction(()=>window.catchLab?.state.ready,null,{timeout:90000});
 await page.evaluate(async()=>{
  history.replaceState(null,"","/?task=rally-rubber");
  const r=window.__catchEngine.runtime,c=window.catchLab.config;
  // Test fixture deliberately places the second robot beyond the safety boundary.
  r.mjData.qpos[c.robots[1].rootQ]+=2;r.mujoco.mj_forward(r.mjModel,r.mjData);r.updateCachedState();window.catchLab.startAudit();
  await r.policyRunner.collectObservationsByKey(r.policyStateBuilder.build());
 });
 await page.waitForURL(/cycle=1/);await page.waitForFunction(()=>window.catchLab?.state.ready&&window.catchLab.state.started&&window.catchLab.state.baseDistance>0,null,{timeout:90000});
 const s=await page.evaluate(()=>window.catchLab.state);
 expect(s.baseDistance).toBeLessThan(2.75);expect(s.resetRequested).toBe(false);expect(s.catches).toBe(0);expect(s.time).toBeLessThan(1);
});
