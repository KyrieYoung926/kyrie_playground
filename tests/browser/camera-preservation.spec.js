import {test,expect} from '@playwright/test';
for(const task of ['dynamic-dex','single','depth-dex','depth-rubber','gt-rubber','depth-single','pass-rubber','rally-rubber','shoot-rubber'])test(`${task} retains viewer across reset and resize`,async({page})=>{
 await page.goto('/?task='+task+'&audit');await page.waitForFunction(()=>window.catchLab?.state.ready,null,{timeout:90000});
 const view=await page.evaluate(()=>{const e=window.__catchEngine;e.pause();e.camera.set({lookat:[.12,.34,.85],azimuth:53,elevation:-23,distance:6.7});return e.camera.get();});
 await page.locator('#reset').click();
 if(task==='rally-rubber')await page.waitForFunction(()=>window.catchLab?.state.ready,null,{timeout:90000});else await page.waitForTimeout(200);
 const after=await page.evaluate(()=>window.__catchEngine.camera.get());
 for(const key of ['distance','azimuth','elevation','fovy'])expect(after[key]).toBeCloseTo(view[key],6);
 for(let i=0;i<3;i++)expect(after.lookat[i]).toBeCloseTo(view.lookat[i],6);
 await page.setViewportSize({width:1100,height:740});await page.waitForTimeout(50);
 const resized=await page.evaluate(()=>window.__catchEngine.camera.get());expect(resized.distance).toBeCloseTo(view.distance,6);expect(resized.azimuth).toBeCloseTo(view.azimuth,6);
});
