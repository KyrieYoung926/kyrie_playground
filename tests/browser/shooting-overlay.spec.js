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
test('shooting defaults to Free with challenge second and preserves explicit modes',async({page})=>{
 await page.goto('/?task=shoot-rubber&audit');await page.waitForFunction(()=>window.catchLab?.state.ready,null,{timeout:90000});
 expect(await page.locator('#shoot-mode').inputValue()).toBe('manual');
 expect(await page.locator('#shoot-mode option').evaluateAll(xs=>xs.map(x=>x.value))).toEqual(['manual','challenge','shot','journey']);
 for(const mode of ['shot','journey','manual']){await open(page,mode);expect(await page.locator('#shoot-mode').inputValue()).toBe(mode);}
});
test('Free pass error line joins receiver target to actual crossing, not hoop',async({page})=>{
 test.setTimeout(180000);await open(page);await step(page,80);
 await page.evaluate(()=>window.catchLab.observation.manual.keys.add('KeyQ'));await step(page,225);await page.evaluate(()=>window.catchLab.observation.manual.keys.clear());await step(page,100);
 await page.evaluate(()=>{window.catchLab.passConfirm();window.__catchEngine.pause();});await step(page,100);
 await page.evaluate(()=>{const o=window.catchLab.observation;o.manual.offset=0;o.manual.phaseStart=window.catchLab.state.time-.6;});await step(page,1);
 await page.evaluate(()=>{window.catchLab.passConfirm();window.__catchEngine.pause();});await step(page,140);
 const result=await page.evaluate(()=>{const o=window.catchLab.observation,s=o.pass[o.holder],scene=o.runner.getContext().scene,line=scene.getObjectByName('crossing-error-segment');return{skill:s.skill,target:s.target,hoop:o.hoopTarget,cross:s.crossing,error:s.error,points:Array.from(line.geometry.attributes.position.array)};});
 expect(result.skill).toBe('pass');expect(result.target).not.toEqual(result.hoop);
 const cv=p=>[p[0],p[2],-p[1]];for(let i=0;i<3;i++){expect(result.points[i]).toBeCloseTo(cv(result.target)[i],5);expect(result.points[i+3]).toBeCloseTo(cv(result.cross)[i],5);}
 expect(Math.hypot(...result.points.slice(0,3).map((x,i)=>x-result.points[i+3]))).toBeCloseTo(result.error,5);
 await page.evaluate(()=>{const r=window.__catchEngine.runtime;r.renderer.setAnimationLoop(r.render);});await page.waitForTimeout(100);await page.screenshot({path:'/tmp/free-pass-error-fixed.png',fullPage:true});
});
