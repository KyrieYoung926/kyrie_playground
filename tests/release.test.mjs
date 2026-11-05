import test from 'node:test';
import assert from 'node:assert/strict';
import {cp,mkdtemp,rm,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {checkRelease} from '../scripts/check-release.mjs';
import {solveThrow} from '../src/physics.mjs';

test('the actual published directory contains one self-contained model per task and no private artifacts',async()=>{
  const files=await checkRelease();
  assert.equal(files.filter(file=>file.endsWith('.onnx')).length,4);
});

test('release check rejects an extra model, checkpoints and training provenance',async()=>{
  const directory=await mkdtemp(path.join(tmpdir(),'playground-release-'));
  try{
    await cp(new URL('../public/',import.meta.url),directory,{recursive:true});
    await writeFile(path.join(directory,'extra.onnx'),'bad');
    await assert.rejects(checkRelease(directory),/exactly/);
    await rm(path.join(directory,'extra.onnx'));
    await writeFile(path.join(directory,'private.pt'),'bad');
    await assert.rejects(checkRelease(directory),/Private artifact/);
    await rm(path.join(directory,'private.pt'));
    await writeFile(path.join(directory,'provenance.json'),JSON.stringify({actor_state_dict:'hidden'}));
    await assert.rejects(checkRelease(directory),/Training metadata/);
  }finally{await rm(directory,{recursive:true,force:true});}
});

test('target throws reach the hands for both arcs',()=>{
  for(const arc of ['low','high'])for(const yaw of [-30,0,30]){
    const {start,velocity,time}=solveThrow({distance:3,height:1.4,yaw,speed:5.8,arc});
    const end=start.map((v,i)=>v+velocity[i]*time-(i===2?4.905*time*time:0));
    assert.ok(Math.abs(end[0]-.875)<1e-8&&Math.abs(end[1])<1e-8&&Math.abs(end[2]-1.15)<1e-8);
  }
});
