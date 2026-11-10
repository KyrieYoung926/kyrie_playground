import test from 'node:test';
import assert from 'node:assert/strict';
import {rotateFreePose,descendingCrossing} from '../src/passing-geometry.mjs';
test('descending hoop crossing interpolates the physical ball and rejects upward shots',()=>{
 const c=descendingCrossing([1,0,2.1],[1.1,.1,1.9],[1.05,0,2],-2);
 assert.ok(Math.abs(c.point[2]-2)<1e-10);assert.ok(Math.abs(c.error-.05)<1e-10);
 assert.equal(descendingCrossing([1,0,1.9],[1,0,2.1],[1,0,2],2),null);
 assert.equal(descendingCrossing([1,0,1.9],[1,0,1.8],[1,0,2],-2),null);
});
test('opening rotation preserves held ball-relative pose and local angular velocity',()=>{
 const q=new Float64Array([1,0,.7,1,0,0,0,2,0,1,1,0,0,0]),v=new Float64Array([1,0,0,.1,.2,.3,1,0,0,.2,.3,.4]);
 const p=[2,0,1];rotateFreePose(q,v,0,0,p,Math.PI/2);rotateFreePose(q,v,7,6,p,Math.PI/2);
 assert.ok(Math.abs(q[0]-2)<1e-10);assert.ok(Math.abs(q[1]+1)<1e-10);assert.equal(q[7],2);assert.equal(q[8],0);
 assert.ok(Math.abs(v[0])<1e-10);assert.ok(Math.abs(v[1]-1)<1e-10);assert.deepEqual([...v.slice(3,6)],[.1,.2,.3]);
 assert.ok(Math.abs(q[3]**2+q[6]**2-1)<1e-10);
});
