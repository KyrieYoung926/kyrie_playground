import {test,expect} from '@playwright/test';
import fs from 'node:fs';
const open=async(page,url='/?task=shoot-rubber&mode=manual&audit')=>{await page.goto(url);await page.waitForFunction(()=>window.catchLab?.state.ready,null,{timeout:90000});await page.evaluate(()=>{window.__catchEngine.pause();window.__catchEngine.runtime.renderer.setAnimationLoop(null);window.catchLab.startAudit();});};
async function run(page,n){return page.evaluate(async n=>{const r=window.__catchEngine.runtime;
 for(let i=0;i<n&&!window.catchLab.state.done;i++){const q=Array.from(r.mjData.qpos),v=Array.from(r.mjData.qvel);const obs=await r.policyRunner.collectObservationsByKey(r.policyStateBuilder.build());
 if(q.some((x,j)=>x!==r.mjData.qpos[j])||v.some((x,j)=>x!==r.mjData.qvel[j]))throw Error('Skill logic changed physical state');
 await r.processActions(await r.runOnnxInference(obs));r.executeSimulationSteps();r.episodeLength++;r.mujoco.mj_forward(r.mjModel,r.mjData);r.updateCachedState();if(i%100===0)await new Promise(resolve=>setTimeout(resolve,0));}
 return {...window.catchLab.state,root:Array.from(r.mjData.qpos.slice(0,3))};},n);}
test('manual carrying motion acceptance',async({page})=>{
 test.setTimeout(300000);const rows=[];
 for(const keys of [[],['KeyW'],['KeyS'],['KeyA'],['KeyD'],['KeyQ'],['KeyE'],['KeyW','KeyA'],['KeyW','KeyE']]){
  await open(page);await page.evaluate(keys=>{window.catchLab.observation.manual.keys=new Set(keys);},keys);
  const moving=await run(page,200);await page.evaluate(()=>window.catchLab.observation.manual.keys.clear());const stopped=await run(page,100);
  rows.push({keys,moving,stopped});console.log('MANUAL_MOVE',keys,JSON.stringify(stopped));
 }
 fs.writeFileSync('/tmp/manual-motion-grid.json',JSON.stringify(rows,null,2));
 for(const r of rows){expect(r.stopped.finiteObservation).toBe(true);expect(r.stopped.done,JSON.stringify(r.keys)).toBe(false);expect(r.stopped.ball[2]).toBeGreaterThan(.5);expect(r.stopped.hold).toBeGreaterThan(1);}
});
test('manual aim, cancel, real keyboard, viewer preservation and fixed hoop',async({page})=>{
 await open(page);await run(page,80);
 // Start the first stage with the actual UI keyboard path, then run physics manually.
 await page.keyboard.press('Space');await page.evaluate(()=>window.__catchEngine.pause());await run(page,100);
 expect(await page.evaluate(()=>window.catchLab.state.manual.stage)).toBe('direction');
 await page.keyboard.press('Escape');await run(page,1);expect(await page.evaluate(()=>window.catchLab.state.manual.stage)).toBe('move');
 await page.keyboard.press('Space');await page.evaluate(()=>window.__catchEngine.pause());await run(page,100);
 await page.keyboard.down('Space');await page.keyboard.down('Space');await page.keyboard.up('Space');await run(page,1);expect(await page.evaluate(()=>window.catchLab.state.manual.stage)).toBe('height');
 await page.keyboard.press('Space');await run(page,1);expect(await page.evaluate(()=>window.catchLab.state.manual.stage)).toBe('power');
 await page.keyboard.press('Space');await run(page,1);expect(await page.evaluate(()=>window.catchLab.state.manual.stage)).toBe('shoot');
 const camera=await page.evaluate(()=>{const e=window.__catchEngine;e.camera.set({azimuth:75,elevation:-27,distance:6});return e.camera.get();});
 await page.evaluate(()=>window.catchLab.reset());expect(await page.evaluate(()=>window.__catchEngine.camera.get())).toEqual(camera);
 await page.setViewportSize({width:900,height:700});const resized=await page.evaluate(()=>window.__catchEngine.camera.get());expect(resized.azimuth).toBeCloseTo(camera.azimuth,6);expect(resized.distance).toBeCloseTo(camera.distance,6);
 const before=await page.evaluate(()=>Array.from(window.__catchEngine.runtime.mjData.mocap_pos));
 await page.locator('#distance').fill('2');await page.locator('#yaw').fill('60');await page.evaluate(()=>window.catchLab.reset());expect(await page.evaluate(()=>Array.from(window.__catchEngine.runtime.mjData.mocap_pos))).toEqual(before);
 await page.evaluate(()=>{const e=window.__catchEngine;e.runtime.renderer.setAnimationLoop(e.runtime.render);});await page.waitForTimeout(200);await page.screenshot({path:'/tmp/manual-shooting-ui.png',fullPage:true});
});
test('manual target mapping after carrying can take a physical shot',async({page})=>{
 await open(page);await page.evaluate(()=>window.catchLab.observation.manual.keys.add('KeyS'));await run(page,35);await page.evaluate(()=>window.catchLab.observation.manual.keys.clear());await run(page,100);
 await page.evaluate(()=>{const m=window.catchLab.observation.manual;m.confirm(window.catchLab.state.time);});await run(page,100);
 // Time each stop at a chosen marker. No snapping or ball velocity writes.
 await page.evaluate(()=>{const o=window.catchLab.observation,m=o.manual,t=window.catchLab.state.time;m.theta=Math.atan2(o.hoopTarget[1]-m.origin[1],o.hoopTarget[0]-m.origin[0]);m.confirm(t);m.height=2;m.confirm(t);m.distance=Math.hypot(o.hoopTarget[0]-m.origin[0],o.hoopTarget[1]-m.origin[1]);});
 await page.evaluate(()=>window.catchLab.manualConfirm());await page.evaluate(()=>window.__catchEngine.pause());const out=await run(page,400);console.log('MANUAL_SHOT',JSON.stringify(out));fs.writeFileSync('/tmp/manual-shot.json',JSON.stringify(out,null,2));expect(out.events.some(x=>x.event==='release'&&x.valid)).toBe(true);expect(out.finiteObservation).toBe(true);
});

test('manual focus loss, on-screen controls and drop reset',async({page})=>{
 await open(page);await page.locator('#throw').click();await page.keyboard.down('KeyW');
 expect(await page.evaluate(()=>window.catchLab.observation.manual.keys.has('KeyW'))).toBe(true);
 await page.evaluate(()=>window.dispatchEvent(new Event('blur')));expect(await page.evaluate(()=>window.catchLab.observation.manual.command)).toEqual([0,0,0]);
 await page.keyboard.up('KeyW');await page.evaluate(()=>window.__catchEngine.pause());
 await page.setViewportSize({width:390,height:844});await page.locator('[data-key="KeyA"]').scrollIntoViewIfNeeded();
 const button=await page.locator('[data-key="KeyA"]').boundingBox();await page.mouse.move(button.x+button.width/2,button.y+button.height/2);await page.mouse.down();
 expect(await page.evaluate(()=>window.catchLab.observation.manual.keys.has('KeyA'))).toBe(true);await page.mouse.up();
 // Real touchscreen coverage is separate; key release must work even after pointer cancellation.
 await page.locator('[data-key="KeyA"]').dispatchEvent('pointercancel',{pointerId:1});expect(await page.evaluate(()=>window.catchLab.observation.manual.keys.size)).toBe(0);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
 const camera=await page.evaluate(()=>window.__catchEngine.camera.get());
 await page.evaluate(()=>{history.replaceState(null,'','/?task=shoot-rubber&mode=manual');const r=window.__catchEngine.runtime,o=window.catchLab.observation;r.mjData.qpos[o.bq+2]=.11;r.mujoco.mj_forward(r.mjModel,r.mjData);});
 await run(page,2);expect(await page.evaluate(()=>window.catchLab.state.reason)).toBe('Ball dropped');
 await page.waitForTimeout(1100);expect(await page.evaluate(()=>window.catchLab.state.time)).toBe(0);expect(await page.evaluate(()=>window.catchLab.scores.manual.shots)).toBe(0);expect(await page.evaluate(()=>window.__catchEngine.camera.get())).toEqual(camera);
});

test('mobile touch movement and aiming outside the recommended zone',async({browser})=>{
 const ctx=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const page=await ctx.newPage();await open(page);
 const b=await page.locator('[data-key="KeyS"]').boundingBox(),cdp=await ctx.newCDPSession(page);
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:b.x+b.width/2,y:b.y+b.height/2}]});
 expect(await page.evaluate(()=>window.catchLab.observation.manual.keys.has('KeyS'))).toBe(true);
 await page.evaluate(()=>window.__catchEngine.pause());await run(page,140);
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 expect(await page.evaluate(()=>window.catchLab.observation.manual.keys.size)).toBe(0);
 await page.locator('[data-aim]').tap();await page.evaluate(()=>window.__catchEngine.pause());await run(page,100);
 expect(await page.evaluate(()=>window.catchLab.state.manual.inside)).toBe(false);expect(await page.evaluate(()=>window.catchLab.state.manual.stage)).toBe('direction');
 await page.locator('[data-aim]').tap();await run(page,1);expect(await page.evaluate(()=>window.catchLab.state.manual.stage)).toBe('height');
 await page.evaluate(()=>{const r=window.__catchEngine.runtime;r.renderer.setAnimationLoop(r.render);});await page.screenshot({path:'/tmp/manual-mobile-touch.png',fullPage:true});
 await ctx.close();
});
