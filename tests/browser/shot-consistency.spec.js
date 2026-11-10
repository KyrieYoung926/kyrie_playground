import {test,expect} from '@playwright/test';
test('rigid world transform preserves policy observation and output',async({page})=>{
 await page.goto('/?task=shoot-rubber&audit');await page.waitForFunction(()=>window.catchLab?.state.ready,null,{timeout:90000});
 const result=await page.evaluate(async()=>{
  const {rotateFreePose}=await import('/src/passing-geometry.mjs'),o=window.catchLab.observation,r=window.__catchEngine.runtime,d=r.mjData;window.__catchEngine.pause();
  const before=Array.from(o.compute()),theta=.7,co=Math.cos(theta),si=Math.sin(theta),p=x=>[co*x[0]-si*x[1]+2,si*x[0]+co*x[1]-3,x[2]];
  for(const [q,v] of [[o.robots[0].rootQ,o.robots[0].rootV],[o.bq,o.bv]]){rotateFreePose(d.qpos,d.qvel,q,v,[0,0,0],theta);d.qpos[q]+=2;d.qpos[q+1]-=3;}
  o.pass[0].target=p(o.pass[0].target);o.pass[0].origin=p(o.pass[0].origin);o.pass[0].previous=p(o.pass[0].previous);for(const s of o.samples)s.p=p(s.p);
  r.mujoco.mj_forward(r.mjModel,d);r.updateCachedState();const after=Array.from(o.compute());
  // The recurrent state starts identically for both independent ONNX calls.
  r.onnxInputDict=r.onnxModule.initInput();await r.runOnnxInference({actor:Float32Array.from(before)});const a=Array.from(r.policyRunner.getLastActions());
  r.onnxInputDict=r.onnxModule.initInput();await r.runOnnxInference({actor:Float32Array.from(after)});const b=Array.from(r.policyRunner.getLastActions());
  return {actionError:Math.max(...a.map((x,i)=>Math.abs(x-b[i]))),maxError:Math.max(...before.map((x,i)=>Math.abs(x-after[i]))),finite:after.every(Number.isFinite)};
 });console.log('RIGID_CONSISTENCY',JSON.stringify(result));expect(result.finite).toBe(true);expect(result.maxError).toBeLessThan(2e-5);expect(result.actionError).toBeLessThan(2e-5);
});
