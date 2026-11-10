import {test,expect} from '@playwright/test';import fs from 'node:fs';
test('GT journey target grid preserves physical continuity',async({page})=>{
 test.setTimeout(600000);const rows=[];
 for(const distance of [1,1.5])for(const yaw of [-30,0,30]){
  await page.goto(`/?task=shoot-rubber&audit&journey=1&distance=${distance}&yaw=${yaw}`);await page.waitForFunction(()=>window.catchLab?.state.ready,null,{timeout:90000});
  const result=await page.evaluate(async()=>{
   const r=window.__catchEngine.runtime;window.__catchEngine.pause();r.renderer.setAnimationLoop(null);window.catchLab.startAudit();
   let maxBallJump=0,previous=Array.from(r.mjData.qpos.slice(36,39));
   for(let i=0;i<1600&&!window.catchLab.state.done;i++){
    const before=Array.from(r.mjData.qpos),vel=Array.from(r.mjData.qvel);
    const obs=await r.policyRunner.collectObservationsByKey(r.policyStateBuilder.build());
    // Observation/phase transitions may move the hoop at reset, never robot or ball.
    if(before.some((v,k)=>v!==r.mjData.qpos[k])||vel.some((v,k)=>v!==r.mjData.qvel[k]))throw Error('Observation mutated physical state');
    await r.processActions(await r.runOnnxInference(obs));r.executeSimulationSteps();r.episodeLength++;r.mujoco.mj_forward(r.mjModel,r.mjData);r.updateCachedState();
    const ball=Array.from(r.mjData.qpos.slice(36,39));maxBallJump=Math.max(maxBallJump,Math.hypot(...ball.map((x,k)=>x-previous[k])));previous=ball;
    if(i%100===0)await new Promise(resolve=>setTimeout(resolve,0));
   }return {...window.catchLab.state,maxBallJump};
  });rows.push({distance,yaw,...result});console.log('JOURNEY_GRID',JSON.stringify(rows.at(-1)));expect(result.finiteObservation).toBe(true);expect(result.catches).toBe(1);expect(result.journeyStage).toBe('shoot');
 }
 fs.writeFileSync('/tmp/journey-grid.json',JSON.stringify(rows,null,2));
 expect(rows.filter(x=>x.success).length).toBeGreaterThanOrEqual(5);
});
