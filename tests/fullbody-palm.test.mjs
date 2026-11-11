import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
test('GT palm has the direct-joint sensor and five-second holding contract',async()=>{
 const c=JSON.parse(await readFile(new URL('../public/assets/gt-rubber/scene.json',import.meta.url)));
 assert.equal(c.execution,'direct_joint_29');assert.equal(c.inputSize,90);
 assert.equal(c.jointNames.length,29);assert.equal(c.holdSeconds,5);
 assert.ok(c.episodeSeconds>=c.holdSeconds+2);
 assert.equal(c.controller,'controller.onnx');assert.equal(c.controlDt,.02);
});
