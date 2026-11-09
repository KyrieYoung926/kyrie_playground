import test from 'node:test';
import assert from 'node:assert/strict';
import {cp,mkdtemp,rm,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {checkRelease} from '../scripts/check-release.mjs';
import {solveThrow} from '../src/physics.mjs';

test('the actual published directory contains one self-contained model per task and no private artifacts',async()=>{
  const files=await checkRelease();
  assert.equal(files.filter(file=>file.endsWith('.onnx')).length,8);
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

test('throw libraries preserve individual task ranges rather than shared curriculum labels',async()=>{
 const {readFile}=await import('node:fs/promises');
 const load=async p=>JSON.parse(await readFile(new URL('../public/assets/'+p+'flights.json',import.meta.url),'utf8'));
 const single=await load('single/'),dex=await load('depth-dex/'),palm=await load('depth-rubber/'),gt=await load('gt-rubber/'),visualSingle=await load('depth-single/'),dynamic=await load('');
 assert.equal(single.groups.length,1);assert.equal(dex.groups.length,1);assert.equal(palm.groups.length,6);assert.equal(dynamic.groups.length,4);
 assert.deepEqual(single.balls[0].radius,[.035,.045]);assert.equal(dex.balls.length,2);
 assert.deepEqual(palm.balls[0].radius,[.11,.11]);assert.deepEqual(palm.balls[0].mass,[.42,.42]);
 assert.equal(gt.groups.length,7);assert.equal(visualSingle.groups.length,1);
 for(const library of [single,dex,palm,dynamic,gt,visualSingle])for(const group of library.groups)for(const f of group.throws){
  for(let axis=0;axis<3;axis++)assert.ok(Math.abs(f.start[axis]+f.velocity[axis]*f.time-(axis===2?4.905*f.time*f.time:0)-f.target[axis])<.002);
 }
});


test('rubber-hand mass survives scene serialization',async()=>{
 const {readFile}=await import('node:fs/promises');const {unzipSync,strFromU8}=await import('fflate');
 const files=unzipSync(await readFile(new URL('../public/assets/depth-rubber/scene.mjz',import.meta.url)));
 const xml=strFromU8(files[Object.keys(files).find(n=>n.endsWith('.xml'))]);
 for(const side of ['left','right']){
  const body=xml.split(`name="robot/${side}_rubber_hand"`)[1].split('</body>')[0];
  assert.match(body,/<inertial[^>]*mass="0.17"/);assert.ok(body.match(/diaginertia="([^"]+)"/)[1].split(" ").every(v=>Number(v)>0));
 }
});


test('left and right single-hand scenes share the model and have the correct active joints',async()=>{
 const {readFile}=await import('node:fs/promises');
 const load=async name=>JSON.parse(await readFile(new URL('../public/assets/single/'+name,import.meta.url),'utf8'));
 const right=await load('scene.json'),left=await load('scene-left.json');
 assert.equal(right.controller,left.controller);assert.equal(right.inputSize,left.inputSize);
 for(const [scene,side] of [[right,'right'],[left,'left']]){
  assert.equal(scene.handSide,side);assert.equal(scene.handNames.length,6);
  assert.ok(scene.handNames.every(n=>n.startsWith(side+'_')));assert.equal(scene.jointNames.length,33);
 }
});

test('passing scenes use the controller football geometry, mass and robot count',async()=>{
 const {readFile}=await import('node:fs/promises');const {unzipSync,strFromU8}=await import('fflate');
 for(const [name,n] of [['pass-rubber',1],['rally-rubber',2]]){
  const c=JSON.parse(await readFile(new URL('../public/assets/'+name+'/scene.json',import.meta.url),'utf8'));
  const z=unzipSync(await readFile(new URL('../public/assets/'+name+'/scene.mjz',import.meta.url)));
  const xml=strFromU8(z[Object.keys(z).find(x=>x.endsWith('.xml'))]);
  assert.equal(c.robots.length,n);assert.equal(c.jointNames.length,29*n);
  assert.match(xml,/<geom[^>]*name="ball\/ball_geom"[^>]*size="0\.11(?:\s|"|0)/);
  const body=xml.split('name="ball/ball"')[1].split('</body>')[0];
  assert.match(body,/<inertial[^>]*mass="0\.42"/);
 }
});
