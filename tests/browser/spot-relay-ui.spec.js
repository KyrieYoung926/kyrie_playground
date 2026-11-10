import {test,expect} from '@playwright/test';
async function load(page,mode){await page.goto(`/?task=shoot-rubber&mode=${mode}&seed=21&audit`);await page.waitForFunction(()=>window.catchLab?.state.ready,null,{timeout:90000});await page.evaluate(()=>{window.__catchEngine.pause();window.__catchEngine.runtime.renderer.setAnimationLoop(null);window.catchLab.startAudit();});}
async function tick(page,n){await page.evaluate(async n=>{const r=window.__catchEngine.runtime;for(let i=0;i<n&&!window.catchLab.state.done;i++){const o=await r.policyRunner.collectObservationsByKey(r.policyStateBuilder.build());await r.processActions(await r.runOnnxInference(o));r.executeSimulationSteps();r.episodeLength++;r.mujoco.mj_forward(r.mjModel,r.mjData);r.updateCachedState();}},n);}
test('challenge controls, real retry, mode aliases and scoreboard',async({page})=>{
 await load(page,'challenge');await tick(page,70);
 await page.keyboard.press('Space');await tick(page,1);expect(await page.evaluate(()=>window.catchLab.observation.manual.stage)).toBe('move');
 await page.keyboard.press('KeyJ');expect(await page.evaluate(()=>window.catchLab.observation.relay)).toBe(null);expect(await page.locator('[data-pass]').isVisible()).toBe(false);
 const before=await page.evaluate(()=>({spot:window.catchLab.challenge.summary,view:window.__catchEngine.camera.get()}));
 // Fault injection is restricted to the failure-path test, never used in success rollouts.
 await page.evaluate(()=>{const r=window.__catchEngine.runtime,o=window.catchLab.observation;r.mjData.qpos[o.bq+2]=.1;});await tick(page,1);
 expect(await page.evaluate(()=>window.catchLab.challenge.retries)).toBe(1);expect(await page.evaluate(()=>window.catchLab.challenge.index)).toBe(0);
 await page.evaluate(()=>window.catchLab.nextChallenge());expect(await page.evaluate(()=>window.catchLab.challenge.spot)).toEqual(before.spot.spot);expect(await page.evaluate(()=>window.__catchEngine.camera.get())).toEqual(before.view);
 const scene=await page.evaluate(()=>{const c=window.catchLab.observation.runner.getContext(),o=window.catchLab.observation,p=o.pool;return{active:p.active,hidden:p.meshes[1].filter(m=>m.visible).length,meshes:p.meshes[1].length,board:c.scene.getObjectByName('shoot-scoreboard').geometry.parameters,masks:p.geoms[1].every(g=>c.mjModel.geom_contype[g]===0&&c.mjModel.geom_conaffinity[g]===0)};});
 expect(scene.active).toEqual([true,false]);expect(scene.hidden).toBe(0);expect(scene.meshes).toBeGreaterThan(0);expect(scene.masks).toBe(true);expect(scene.board.width).toBe(4.2);expect(scene.board.height).toBe(1.65);
 await page.evaluate(()=>{const r=window.__catchEngine.runtime;r.renderer.setAnimationLoop(r.render);});await page.waitForTimeout(300);await page.screenshot({path:'/tmp/spot-challenge-ui.png',fullPage:true});
 await load(page,'free');expect(await page.locator('#shoot-mode').inputValue()).toBe('manual');expect(await page.locator('#shoot-mode option:checked').textContent()).toBe('Free carry & shoot');await tick(page,80);
 await page.keyboard.press('KeyJ');await page.evaluate(()=>window.__catchEngine.pause());await tick(page,100);
 expect(await page.evaluate(()=>window.catchLab.observation.manual.stage)).toBe('pass_distance');expect(await page.evaluate(()=>window.catchLab.observation.receiverPreview.valid)).toBe(false);
 await page.keyboard.press('KeyJ');expect(await page.evaluate(()=>window.catchLab.observation.pendingReceiver)).toBe(null);
 await page.keyboard.press('Escape');await tick(page,1);expect(await page.evaluate(()=>window.catchLab.observation.manual.stage)).toBe('move');
 await page.setViewportSize({width:390,height:844});await page.evaluate(()=>{const r=window.__catchEngine.runtime;r.renderer.setAnimationLoop(r.render);});await page.waitForTimeout(200);await page.screenshot({path:'/tmp/free-mobile-ui.png',fullPage:true});expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});
