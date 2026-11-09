import {chromium} from '@playwright/test';import {writeFile} from 'node:fs/promises';
const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH || undefined,args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});const p=await b.newPage();
let out={};
for(const task of (process.env.TASK_FILTER?[process.env.TASK_FILTER]:['pass-rubber','rally-rubber'])){
 await p.goto((process.env.BASE_URL || 'http://127.0.0.1:4173')+'/?task='+task+'&audit');await p.waitForFunction(()=>window.catchLab?.state.ready);
 const rows=[];const cases=task==='pass-rubber'?[.8,1.1,1.4].flatMap(d=>[-45,0,45].map(a=>[d,a])):[[.8,0],[1.1,0],[1.4,0]];
 for(const [distance,angle] of cases.filter(([d])=>!process.env.ONLY_DISTANCE||d===Number(process.env.ONLY_DISTANCE))){
 if(task==='rally-rubber'){await p.goto((process.env.BASE_URL || 'http://127.0.0.1:4173')+'/?task=rally-rubber&audit&distance='+distance);await p.waitForFunction(()=>window.catchLab?.state.ready);}
 const r=await p.evaluate(async({distance,angle,task})=>{
  document.querySelector('#distance').value=distance;if(document.querySelector('#yaw'))document.querySelector('#yaw').value=angle;
  if(task!=='rally-rubber')await window.catchLab.reset();window.catchLab.startAudit();const r=window.__catchEngine.runtime;
  const initial=Array.from(r.mjData.qpos);
  for(let i=0;i<(task==='rally-rubber'?1150:200)&&!window.catchLab.state.done&&window.catchLab.state.catches<4;i++){
   const obs=await r.policyRunner.collectObservationsByKey(r.policyStateBuilder.build());const a=await r.runOnnxInference(obs);await r.processActions(a);r.executeSimulationSteps();r.episodeLength++;r.mujoco.mj_forward(r.mjModel,r.mjData);r.updateCachedState();
   if(i%50===0)await new Promise(res=>setTimeout(res,0));
  }
  return {...window.catchLab.state,initial};
 },{distance,angle,task});rows.push({distance,angle,...r});console.log(task,distance,angle,r.success,r.catches,r.reason);}
 out[task]=rows;await writeFile('/tmp/browser_pass_grid.json',JSON.stringify(out));
}
await b.close();
