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
test('relay calibration',async({page})=>{test.setTimeout(600000);const rows=[];
 for(const distance of [1,1.5,2]){
 await open(page);await step(page,80);
 await page.evaluate(()=>window.catchLab.observation.manual.keys.add('KeyQ'));await step(page,225);await page.evaluate(()=>window.catchLab.observation.manual.keys.clear());await step(page,100);
 await page.evaluate(()=>{window.catchLab.passConfirm();window.__catchEngine.pause();});await step(page,100);
 await page.evaluate(distance=>{const o=window.catchLab.observation;o.manual.offset=0;o.manual.phaseStart=window.catchLab.state.time-(2-distance)*1.2;},distance);let preview=await step(page,1);
 console.log('PREVIEW',distance,JSON.stringify(preview.manual));
 await page.evaluate(()=>{window.catchLab.passConfirm();window.__catchEngine.pause();});let out=await step(page,450);rows.push({distance,out});console.log('RELAY',distance,JSON.stringify(out));
 }
 fs.writeFileSync('/tmp/relay-calibration.json',JSON.stringify(rows,null,2));expect(rows.every(r=>r.out.passStreak>=1)).toBe(true);
});
test('five spot physical challenge',async({page})=>{test.setTimeout(600000);let rows=[];
 for(const seed of [21,45,77]){await open(page,'challenge',seed);
 for(let spot=0;spot<5;spot++){
 let out=await step(page,280,true);if(out.done){console.log('CHALLENGE_DROP',seed,spot,JSON.stringify(out));rows.push({seed,spot,out});break;}
 await page.evaluate(()=>window.catchLab.observation.manual.keys.clear());await step(page,80);
 await page.evaluate(()=>{window.catchLab.manualConfirm();window.__catchEngine.pause();});out=await step(page,100);
 expect(out.manual.stage).toBe('direction');
 await page.evaluate(()=>{const o=window.catchLab.observation,m=o.manual,t=window.catchLab.state.time;m.theta=Math.atan2(o.hoopTarget[1]-m.origin[1],o.hoopTarget[0]-m.origin[0]);m.confirm(t);m.height=2;m.confirm(t);m.distance=Math.hypot(o.hoopTarget[0]-m.origin[0],o.hoopTarget[1]-m.origin[1]);window.catchLab.manualConfirm();window.__catchEngine.pause();});out=await step(page,450);rows.push({seed,spot,out});console.log('CHALLENGE',seed,spot,JSON.stringify(out));
 if(spot<4){await page.evaluate(async()=>{await window.catchLab.nextChallenge();window.catchLab.startAudit();});}
 }
 }
 fs.writeFileSync('/tmp/spot-physical.json',JSON.stringify(rows,null,2));expect(rows.length).toBe(15);expect(rows.filter(x=>x.out.challenge.complete).length).toBe(3);
});
