// Deterministic, unpaced browser evaluation through the real public controller.
import {chromium} from '@playwright/test';
import {writeFile} from 'node:fs/promises';
import {parseArgs} from 'node:util';
import {resolveTask} from '../src/tasks.mjs';
const {values:o}=parseArgs({options:{hand:{type:'string',default:'right'},task:{type:'string',default:'single'},level:{type:'string',default:'0'},episodes:{type:'string',default:'16'},start:{type:'string',default:'0'},ball:{type:'string',default:'0'},profile:{type:'string',default:'standard'},url:{type:'string',default:'http://127.0.0.1:4173'},output:{type:'string',default:'evaluation.json'}}});
const task=resolveTask(o.task);if(!task)throw Error('Unknown task');
for(const key of ['level','episodes','start','ball'])if(!Number.isInteger(+o[key])||+o[key]<0)throw Error('Invalid '+key);
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,headless:true,args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const results=[];
try{
 const page=await browser.newPage();page.on('pageerror',e=>{throw e;});
 await page.goto(new URL('?task='+o.task+'&hand='+o.hand+'&audit',o.url).href);
 await page.waitForFunction(()=>window.catchLab?.state.ready,null,{timeout:120000});
 if(o.task==='dynamic-dex')await page.selectOption('#policy',o.profile);
 else{await page.selectOption('#level',o.level);await page.selectOption('#ball-kind',o.ball);}
 for(let index=+o.start;index<+o.start+ +o.episodes;index++){
  const result=await page.evaluate(async({index,asset,level})=>{
   const engine=window.__catchEngine,r=engine.runtime;engine.pause();
   const bank=await(await fetch('./'+asset+'/flights.json')).json(),flight=bank.groups[level]?.throws[index];
   if(!flight)throw Error('No throw at this level/index');
   window.catchLab.setCase(flight);await new Promise(resolve=>setTimeout(resolve,50));
   const begin=performance.now();let steps=0;
   while(steps<610&&!window.catchLab.state.done){
    const obs=await r.policyRunner.collectObservationsByKey(r.policyStateBuilder.build());
    const fresh=await r.runOnnxInference(obs);if(!fresh)throw Error('Inference failed');
    await r.processActions(fresh);r.executeSimulationSteps();r.episodeLength++;
    r.mujoco.mj_forward(r.mjModel,r.mjData);r.updateCachedState();steps++;
    if(steps%50===0)await new Promise(resolve=>setTimeout(resolve,0));
   }
   return {index,...window.catchLab.state,wallSeconds:(performance.now()-begin)/1000};
  },{index,asset:task.asset,level:+o.level});
  results.push(result);console.log(JSON.stringify({index,success:result.success,time:result.time,fall:result.fall}));
  await writeFile(o.output,JSON.stringify({task:o.task,hand:o.hand,level:+o.level,ball:+o.ball,profile:o.profile,episodes:results.length,successes:results.filter(r=>r.success).length,falls:results.filter(r=>r.fall).length,results},null,2));
 }
 console.log(`Success: ${results.filter(r=>r.success).length}/${results.length}`);
}finally{await browser.close();}
