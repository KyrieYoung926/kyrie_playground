import {test,expect} from '@playwright/test';
for(const task of ['dynamic-dex','single','depth-dex','depth-rubber','gt-rubber','depth-single']) {
 test(`${task}: a fixed training-distribution throw completes a physical catch`,async({page})=>{
  test.setTimeout(180000);
  await page.goto('/?task='+task+'&audit');
  await page.waitForFunction(()=>window.catchLab?.state.ready,null,{timeout:90000});
  const result=await page.evaluate(async task=>{
   const engine=window.__catchEngine,r=engine.runtime;engine.pause();
   const folder=task==='dynamic-dex'?'':task+'/';
   const bank=await(await fetch('./assets/'+folder+'flights.json')).json();
   window.catchLab.setCase(bank.groups[0].throws[0]);
   await new Promise(resolve=>setTimeout(resolve,50));
   const resetPose=Array.from(r.mjData.qpos),solver=r.mjModel.opt.iterations;
   for(let i=0;i<610&&!window.catchLab.state.done;i++){
    const obs=await r.policyRunner.collectObservationsByKey(r.policyStateBuilder.build());
    const fresh=await r.runOnnxInference(obs);if(!fresh)throw Error('Missing inference');
    await r.processActions(fresh);r.executeSimulationSteps();r.episodeLength++;
    r.mujoco.mj_forward(r.mjModel,r.mjData);r.updateCachedState();
    if(i%50===0)await new Promise(resolve=>setTimeout(resolve,0));
   }
   return {resetPose,solver,...window.catchLab.state};
  },task);
  expect(result.success).toBe(true);expect(result.fall).toBe(false);
  expect(result.everContact).toBe(true);expect(result.finiteObservation).toBe(true);
  expect(result.solver).toBe(100);
  if(task==='dynamic-dex')expect(result.continuousHold).toBeGreaterThan(2);
  if(task==='gt-rubber')expect(result.hold).toBeGreaterThanOrEqual(5-1e-6);
  await page.locator('#reset').click();
  await page.waitForTimeout(100);
  const restored=await page.evaluate(()=>Array.from(window.__catchEngine.runtime.mjData.qpos));
  // Ball geometry recomputation must not silently restore the robot's qpos0.
  expect(Math.max(...restored.slice(0,-7).map((v,i)=>Math.abs(v-result.resetPose[i])))).toBeLessThan(1e-7);
 });
}
