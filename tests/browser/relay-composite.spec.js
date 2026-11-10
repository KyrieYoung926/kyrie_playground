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
test('walk, pass, change controller, walk and shoot; failures preserve scores',async({page})=>{test.setTimeout(300000);await open(page);await step(page,80);
 const camera=await page.evaluate(()=>window.__catchEngine.camera.get());
 await page.evaluate(()=>{const m=window.catchLab.observation.manual;m.keys.add('KeyQ');m.keys.add('KeyS');});await step(page,225);await page.evaluate(()=>window.catchLab.observation.manual.keys.clear());await step(page,100);
 await page.evaluate(()=>{window.catchLab.passConfirm();window.__catchEngine.pause();});await step(page,100);await page.evaluate(()=>{const o=window.catchLab.observation;o.manual.offset=.1;o.manual.phaseStart=window.catchLab.state.time-.6;});await step(page,1);await page.evaluate(()=>{window.catchLab.passConfirm();window.__catchEngine.pause();});let out=await step(page,550);expect(out.passStreak,JSON.stringify(out)).toBe(1);
 const handoff=await page.evaluate(()=>({view:window.__catchEngine.camera.get(),scores:window.catchLab.scores.manual,active:window.catchLab.observation.pool.active,heap:window.__catchEngine.runtime.mjData.qpos.buffer.byteLength}));expect(handoff.scores.shots).toBe(0);expect(handoff.active).toEqual([false,true]);for(const k of ['azimuth','elevation','distance'])expect(handoff.view[k]).toBeCloseTo(camera[k],6);expect(handoff.view.lookat).not.toEqual(camera.lookat);
 for(let i=0;i<45;i++){
  const near=await page.evaluate(()=>{const o=window.catchLab.observation,r=o.states[o.holder],m=o.manual,dx=o.hoopTarget[0]-r.root[0],dy=o.hoopTarget[1]-r.root[1],yaw=Math.atan2(r.R[3],r.R[0]),a=Math.atan2(Math.sin(Math.atan2(dy,dx)-yaw),Math.cos(Math.atan2(dy,dx)-yaw));m.keys.clear();if(Math.abs(a)>.08)m.keys.add(a>0?'KeyQ':'KeyE');else if(Math.hypot(dx,dy)>1.75)m.keys.add('KeyW');return Math.hypot(dx,dy)<=1.75&&Math.abs(a)<.08;});await step(page,20);if(near)break;
 }
 await page.evaluate(()=>window.catchLab.observation.manual.keys.clear());out=await step(page,100);expect(out.done).toBe(false);
 await page.evaluate(()=>{window.catchLab.manualConfirm();window.__catchEngine.pause();});out=await step(page,100);expect(out.manual.stage).toBe('direction');
 await page.evaluate(()=>{const o=window.catchLab.observation,m=o.manual,t=window.catchLab.state.time;m.theta=Math.atan2(o.hoopTarget[1]-m.origin[1],o.hoopTarget[0]-m.origin[0]);m.confirm(t);m.height=2;m.confirm(t);m.distance=Math.max(.8,Math.min(2,Math.hypot(o.hoopTarget[0]-m.origin[0],o.hoopTarget[1]-m.origin[1])));window.catchLab.manualConfirm();window.__catchEngine.pause();});out=await step(page,450);fs.writeFileSync('/tmp/relay-composite.json',JSON.stringify(out,null,2));console.log('COMPOSITE',JSON.stringify(out));expect(out.events.filter(e=>e.event==='release'&&e.valid).length).toBe(2);expect(out.score.shots).toBe(1);
 // Only the failure-path check injects a drop; success trials above never modify physical state.
 for(let i=0;i<3;i++){await page.evaluate(()=>{window.catchLab.reset();});await page.evaluate(()=>window.catchLab.startAudit());await step(page,2);await page.evaluate(()=>{const o=window.catchLab.observation,r=window.__catchEngine.runtime;r.mjData.qpos[o.bq+2]=.1;});out=await step(page,2);expect(out.reason).toBe('Ball dropped');expect(out.passStreak).toBe(0);expect(out.score.shots).toBe(1);}
});
