import {test,expect} from '@playwright/test';
import fs from 'node:fs';
test('body shooter near and extended physical hoop grid',async({page})=>{
 test.setTimeout(600000);const rows=[];
 for(const distance of [1,1.5,3,4,5,5.5])for(const yaw of [-60,0,60]){
  await page.goto(`/?task=shoot-rubber&mode=shot&audit&distance=${distance}&yaw=${yaw}`);
  await page.waitForFunction(()=>window.catchLab?.state.ready,null,{timeout:90000});
  expect(Number(await page.locator('#distance').inputValue())).toBe(distance);
  const out=await page.evaluate(async()=>{
   const r=window.__catchEngine.runtime;window.__catchEngine.pause();r.renderer.setAnimationLoop(null);window.catchLab.startAudit();
   for(let i=0;i<500&&!window.catchLab.state.done;i++){
    const obs=await r.policyRunner.collectObservationsByKey(r.policyStateBuilder.build());await r.processActions(await r.runOnnxInference(obs));r.executeSimulationSteps();r.episodeLength++;r.mujoco.mj_forward(r.mjModel,r.mjData);r.updateCachedState();
    if(i%50===0)await new Promise(resolve=>setTimeout(resolve,0));
   }
   const s=window.catchLab.state;return {success:s.success,reason:s.reason,time:s.time,error:s.crossing?.distance,events:s.events,finite:s.finiteObservation};
  });
  rows.push({distance,yaw,...out});console.log('BODY_GRID',JSON.stringify(rows.at(-1)));expect(out.finite).toBe(true);
  fs.writeFileSync('/tmp/body-shoot-web-grid.json',JSON.stringify(rows,null,2));
 }
 expect(rows.filter(r=>r.success).length).toBeGreaterThanOrEqual(14);
});
test('near shot diagnostic records insufficient clearance',async({page})=>{
 await page.goto('/?task=shoot-rubber&mode=shot&audit&distance=1&yaw=0');
 await page.waitForFunction(()=>window.catchLab?.state.ready,null,{timeout:90000});
 const result=await page.evaluate(async()=>{
  const r=window.__catchEngine.runtime,o=window.catchLab.observation;window.__catchEngine.pause();r.renderer.setAnimationLoop(null);window.catchLab.startAudit();
  const hits=new Set();let maxZ=0;
  for(let i=0;i<250&&!window.catchLab.state.done;i++){
   const obs=await r.policyRunner.collectObservationsByKey(r.policyStateBuilder.build());await r.processActions(await r.runOnnxInference(obs));r.executeSimulationSteps();r.episodeLength++;r.mujoco.mj_forward(r.mjModel,r.mjData);r.updateCachedState();
   maxZ=Math.max(maxZ,r.mjData.qpos[o.bq+2]);
   const contacts=r.mjData.contact;
   for(let k=0;k<r.mjData.ncon;k++){const c=contacts.get(k);for(const g of c.geom){const name=o.monitors[0].names[g];if(name?.startsWith('hoop/'))hits.add(name);}c.delete();}
   contacts.delete();if(i%50===0)await new Promise(resolve=>setTimeout(resolve,0));
  }
  return{hits:[...hits],maxZ,success:window.catchLab.state.success};
 });console.log('NEAR_CONTACT',JSON.stringify(result));expect(Number.isFinite(result.maxZ)).toBe(true);expect(result.maxZ).toBeLessThan(2.0);expect(result.success).toBe(false);
});
