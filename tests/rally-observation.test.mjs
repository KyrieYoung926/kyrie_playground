import test from "node:test";
import assert from "node:assert/strict";
import { BallStream, random, proprioNoise } from "../src/rally-observation.mjs";
const I = [1, 0, 0, 0, 1, 0, 0, 0, 1];
test("clean history estimates velocity from actual measurement timestamps", () => {
  const s = new BallStream(random(7), false);
  for (let i = 0; i < 8; i++) s.update([i * 0.04, 0, 1]);
  const f = s.features(I, [0, 0, 0]);
  assert.equal(f.length, 23);
  assert.ok(Math.abs(f[15] - 2) < 1e-8);
  assert.deepEqual(f.slice(18), [1, 1, 1, 1, 1]);
});
test("first noisy measurement is delayed; delivered timestamps never regress or duplicate", () => {
  const s = new BallStream(random(81109));
  s.update([1, 0, 1]);
  assert.deepEqual(s.features(I, [0, 0, 0]), Array(23).fill(0));
  let previous = -1;
  for (let i = 1; i < 500; i++) {
    s.update([1 + i * 0.01, 0, 1]);
    assert.ok(s.latest >= previous);
    assert.ok(s.latest < i);
    assert.equal(new Set(s.samples.map((x) => x.t)).size, s.samples.length);
    assert.ok(s.features(I, [0, 0, 0]).every(Number.isFinite));
    previous = s.latest;
  }
});
test("independent reproducible streams and bounded proprioception perturbations", () => {
  const a = new BallStream(random(4)),
    b = new BallStream(random(4)),
    c = new BallStream(random(5));
  for (let i = 0; i < 30; i++) {
    a.update([1, 0, 1]);
    b.update([1, 0, 1]);
    c.update([1, 0, 1]);
  }
  assert.deepEqual(a.samples, b.samples);
  assert.notDeepEqual(a.samples, c.samples);
  const n = proprioNoise(random(6), [0, 0, -1]);
  assert.equal(n.length, 64);
  assert.ok(n.slice(0, 58).every((x) => Math.abs(x) <= 0.005));
  assert.ok(n.slice(58, 61).every((x) => Math.abs(x) <= 0.01));
});
