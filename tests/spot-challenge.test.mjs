import {test} from 'node:test';
import assert from 'node:assert/strict';
import {SpotChallenge} from '../src/spot-challenge.mjs';
import {HOOP,COURT_CENTER,COURT_LENGTH} from '../src/shooting-game.mjs';
import {receiverPlan} from '../src/relay-game.mjs';
test('1000 five-spot sets have coverage, clear spawns and valid geometry',()=>{
 for(let seed=0;seed<1000;seed++){
  const c=new SpotChallenge(seed);assert.equal(c.spots.length,5);const bins=[];
  for(const {goal,spawn,radius} of c.spots){const d=Math.hypot(goal[0]-HOOP[0],goal[1]-HOOP[1]),offset=Math.hypot(goal[0]-spawn[0],goal[1]-spawn[1]);assert.ok(d>=1.4&&d<=1.85);assert.ok(offset>=.35&&offset<=.65);assert.equal(radius,.18);assert.ok(spawn[0]>0&&spawn[0]<COURT_CENTER+COURT_LENGTH/2-.8&&Math.abs(spawn[1])<6.82);assert.ok(Math.hypot(spawn[0]-HOOP[0],spawn[1])>.95);bins.push(Math.round(Math.atan2(-goal[1],HOOP[0]-goal[0])*180/Math.PI/22.5)||0);}
  assert.deepEqual(bins.sort((a,b)=>a-b),[-2,-1,0,1,2]);assert.deepEqual(c.spots,new SpotChallenge(seed).spots);
 }
});
test('challenge retries do not consume a spot; confirmed attempts do',()=>{const c=new SpotChallenge(11);c.finish(false);assert.equal(c.index,0);assert.equal(c.retries,1);for(let i=0;i<5;i++){c.committed=true;c.finish(i%2===0);}assert.equal(c.made,3);assert.equal(c.complete,true);});
test('receiver geometry preserves direction and rejects unsafe layouts',()=>{const p=receiverPlan([0,0,1],0,1.5,.2);assert.deepEqual(p.target,[1.5,0,1.05]);assert.deepEqual(p.root,[2,.2,.7495]);assert.equal(p.valid,true);assert.equal(receiverPlan([12,0,1],0,1.5,0).valid,false);});
