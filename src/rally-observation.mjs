import { inverseRotate, rotation, sub } from "./physics.mjs";
export function random(seed) {
  let s = seed >>> 0;
  const uniform = () => {
    s += 0x6d2b79f5;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return {
    uniform,
    normal: () =>
      Math.sqrt(-2 * Math.log(Math.max(uniform(), 1e-12))) *
      Math.cos(2 * Math.PI * uniform()),
  };
}
export class BallStream {
  constructor(rng, noisy = true) {
    this.rng = rng;
    this.noisy = noisy;
    this.queue = [];
    this.samples = [];
    this.latest = -1;
    this.step = -1;
    this.remaining = 0;
    this.cooldown = 0;
    this.bias = [0, 0, 0];
    this.tau = 0.05 + 0.1 * rng.uniform();
  }
  update(position) {
    this.step++;
    const fresh = this.step === 0,
      r = this.rng;
    if (
      this.noisy &&
      !fresh &&
      this.remaining === 0 &&
      this.cooldown === 0 &&
      r.uniform() < 0.02
    )
      this.remaining = 1 + Math.floor(r.uniform() * 2);
    const dropped = !fresh && this.remaining > 0;
    this.remaining = Math.max(0, this.remaining - 1);
    this.cooldown = dropped ? 20 : Math.max(0, this.cooldown - 1);
    const alpha = Math.exp(-0.02 / this.tau);
    this.bias = this.bias.map((v) =>
      this.noisy
        ? (fresh ? 0 : alpha * v) +
          Math.sqrt(fresh ? 1 : 1 - alpha * alpha) * 0.005 * r.normal()
        : 0,
    );
    const measured = position.map(
      (v, k) => v + this.bias[k] + (this.noisy ? 0.005 * r.normal() : 0),
    );
    const delay = this.noisy ? 1 + Math.floor(r.uniform() * 2) : 0;
    // First acquisition is valid but still passes through the delivery delay.
    if (!dropped)
      this.queue.push({
        p: measured,
        t: this.step,
        delivery: this.step + delay,
      });
    const eligible = this.queue
      .filter((p) => p.delivery <= this.step && p.t > this.latest)
      .at(-1);
    if (eligible) {
      this.latest = eligible.t;
      this.samples.push(eligible);
      if (this.samples.length > 5) this.samples.shift();
    }
    this.queue = this.queue.filter((p) => p.t > this.latest);
  }
  features(R, root) {
    if (!this.samples.length) return Array(23).fill(0);
    const ss = this.samples,
      last = ss.at(-1),
      mean = ss.reduce((a, s) => a + s.t * 0.02, 0) / ss.length;
    const den = ss.reduce((a, s) => a + (s.t * 0.02 - mean) ** 2, 0);
    const velocity = [0, 1, 2].map(
      (k) =>
        ss.reduce((a, s) => a + (s.t * 0.02 - mean) * (s.p[k] - last.p[k]), 0) /
        Math.max(den, 1e-10),
    );
    const padded = Array.from(
      { length: 5 },
      (_, i) => ss[Math.max(0, i - (5 - ss.length))],
    );
    return [
      ...padded.flatMap((s) => inverseRotate(R, sub(s.p, root))),
      ...inverseRotate(R, velocity),
      ...padded.map((s, i) => Number(i === 0 || s.t !== padded[i - 1].t)),
    ];
  }
}
export function proprioNoise(rng, gravity) {
  const uni = (scale) => (2 * rng.uniform() - 1) * scale;
  const angles = [uni(Math.PI / 360), uni(Math.PI / 360), uni(Math.PI / 360)];
  const [a, b, c] = angles.map((x) => x / 2),
    [sa, sb, sc] = [a, b, c].map(Math.sin),
    [ca, cb, cc] = [a, b, c].map(Math.cos);
  const R = rotation([
    ca * cb * cc + sa * sb * sc,
    sa * cb * cc - ca * sb * sc,
    ca * sb * cc + sa * cb * sc,
    ca * cb * sc - sa * sb * cc,
  ]);
  const rotated = [0, 1, 2].map(
    (i) =>
      R[i * 3] * gravity[0] +
      R[i * 3 + 1] * gravity[1] +
      R[i * 3 + 2] * gravity[2],
  );
  return [
    ...Array.from({ length: 29 }, () => uni(0.005)),
    ...Array.from({ length: 29 }, () => uni(0.005)),
    ...Array.from({ length: 3 }, () => uni(0.01)),
    ...sub(rotated, gravity),
  ];
}
