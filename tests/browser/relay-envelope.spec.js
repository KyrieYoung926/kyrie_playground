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
test('passing envelope including left and right receiving offsets',async({page})=>{test.setTimeout(900000);const rows=[];
 for(const [distance,offset] of [[1,-.15],[1,.15],[1,-.25],[1,.25],[1.5,-.3],[1.5,.3],[1.5,-.4],[1.5,.4],[2,-.45],[2,.45]]){
 await open(page);await step(page,80);await page.evaluate(()=>window.catchLab.observation.manual.keys.add('KeyQ'));await step(page,225);await page.evaluate(()=>window.catchLab.observation.manual.keys.clear());await step(page,100);
 await page.evaluate(()=>{window.catchLab.passConfirm();window.__catchEngine.pause();});await step(page,100);
 await page.evaluate(({distance,offset})=>{const o=window.catchLab.observation;o.manual.offset=offset;o.manual.phaseStart=window.catchLab.state.time-(2-distance)*1.2;},{distance,offset});let out=await step(page,1),valid=out.manual.receiver.valid;
 if(valid){await page.evaluate(()=>{window.catchLab.passConfirm();window.__catchEngine.pause();});out=await step(page,550);}
 rows.push({distance,offset,valid,out});fs.writeFileSync('/tmp/relay-envelope.json',JSON.stringify(rows,null,2));console.log('ENVELOPE',distance,offset,valid,out.passStreak,out.reason);
 }
 expect(rows.filter(x=>x.valid).every(x=>x.out.passStreak>=1)).toBe(true);
});
