import test from 'node:test';import assert from 'node:assert/strict';
import {HoopScore} from '../src/hoop-score.mjs';
test('entry is provisional, whole-ball exit scores once',()=>{
 const s=new HoopScore([0,0,2]);assert.equal(s.update([0,0,2.1],[0,0,1.98],-2),null);
 assert.ok(s.update([0,0,1.98],[.06,0,1.8],-2));assert.equal(s.update([.06,0,1.8],[0,0,1.7],-2),null);
});
test('outward misses and upward rim rebounds cannot score',()=>{
 let s=new HoopScore([0,0,2]);s.update([.3,0,2.1],[.3,0,1.98],-2);assert.equal(s.update([.3,0,1.98],[.3,0,1.8],-2),null);
 s=new HoopScore([0,0,2]);s.update([0,0,2.1],[0,0,1.98],-2);s.update([0,0,1.98],[.3,0,2.05],2);assert.equal(s.update([.3,0,2.05],[.3,0,1.7],-2),null);
});
test('a ball rising from below or an invalid release cannot score',()=>{
 let s=new HoopScore([0,0,2]);assert.equal(s.update([0,0,1.7],[0,0,1.9],2),null);
 assert.equal(s.update([0,0,2.1],[0,0,1.8],-2,false),null);
});
