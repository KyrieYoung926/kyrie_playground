import {test,expect} from '@playwright/test';
import fs from 'node:fs';
for(const side of ['left','right','alternate'])test(`rally receiver target ${side}`,async({page})=>{
 test.setTimeout(180000);await page.goto(`/?task=rally-rubber&audit&side=${side}`);await page.waitForFunction(()=>window.catchLab?.state.ready,null,{timeout:90000});
 const result=await page.evaluate(async()=>{
  const r=window.__catchEngine.runtime;window.__catchEngine.pause();r.renderer.setAnimationLoop(null);window.catchLab.startAudit();
  const initialTarget=window.catchLab.observation.pass[1].target.slice();
  for(let i=0;i<1700&&!window.catchLab.state.done&&window.catchLab.state.catches<6;i++){
   const obs=await r.policyRunner.collectObservationsByKey(r.policyStateBuilder.build());await r.processActions(await r.runOnnxInference(obs));r.executeSimulationSteps();r.episodeLength++;r.mujoco.mj_forward(r.mjModel,r.mjData);r.updateCachedState();if(i%100===0)await new Promise(resolve=>setTimeout(resolve,0));
  }
  return {...window.catchLab.state,initialTarget};
 });
 console.log('RALLY_TARGET',side,JSON.stringify(result));fs.writeFileSync(`/tmp/rally-target-${side}.json`,JSON.stringify(result,null,2));
 expect(result.finiteObservation).toBe(true);expect(result.catches).toBeGreaterThanOrEqual(4);
 expect(result.initialTarget[1]).toBeCloseTo(side==='right'?-.18:.18,4);
});
test('shooting fits a mobile viewport and edited settings apply on first launch',async({page})=>{
 test.setTimeout(180000);await page.setViewportSize({width:390,height:844});await page.goto('/?task=shoot-rubber&audit');await page.waitForFunction(()=>window.catchLab?.state.ready,null,{timeout:90000});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
 await page.locator('#distance').fill('2');await page.locator('[data-direction="60"]').click();await page.locator('#throw').click();
 await page.waitForFunction(()=>window.catchLab.state.started);const target=await page.evaluate(()=>{window.__catchEngine.pause();return window.catchLab.observation.pass[0].target;});
 expect(target[2]).toBe(2);expect(target[1]).toBeGreaterThan(2);
 await page.waitForTimeout(150);
 const projected=await page.evaluate(()=>{const r=window.__catchEngine.runtime,t=window.catchLab.observation.pass[0].target,T=globalThis.__mjswanThree;r.camera.updateMatrixWorld();const p=new T.Vector3(t[0],t[2],-t[1]).project(r.camera);return [p.x,p.y];});
 expect(Math.max(...projected.map(Math.abs))).toBeLessThan(.95);
 await page.screenshot({path:'/tmp/shooting-mobile.png',fullPage:true});
});
