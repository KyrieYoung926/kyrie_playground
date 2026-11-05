// MuJoCo world coordinates: +x forward, +y left, +z up; quaternions wxyz.
export const DT = 0.02;
export const sub = (a, b) => a.map((v, i) => v - b[i]);
export const norm = a => Math.hypot(...a);
export function rotation([w, x, y, z]) {
  return [1 - 2 * (y*y + z*z), 2*(x*y-z*w), 2*(x*z+y*w),
    2*(x*y+z*w), 1-2*(x*x+z*z), 2*(y*z-x*w),
    2*(x*z-y*w), 2*(y*z+x*w), 1-2*(x*x+y*y)];
}
export function inverseRotate(r, v) {
  return [0, 1, 2].map(i => r[i]*v[0]+r[3+i]*v[1]+r[6+i]*v[2]);
}
export function relativeRotation6d(root, site) {
  return [0, 1].flatMap(col => inverseRotate(root, [site[col], site[3+col], site[6+col]]));
}
export function solveThrow({ distance, height, yaw, speed, arc }) {
  const angle = yaw * Math.PI / 180;
  const start = [distance * Math.cos(angle), distance * Math.sin(angle), height];
  const target = [Math.min(.875, Math.max(.35, distance - .1)), 0, 1.15];
  const delta = sub(target, start), d = Math.hypot(delta[0], delta[1]);
  const discriminant = speed**4 - 9.81 * (9.81*d*d+2*delta[2]*speed*speed);
  if (d < 1e-5 || discriminant < 0) throw new Error('Increase speed or shorten the throw to reach the hands.');
  const tangent = (speed*speed + (arc === 'high' ? 1 : -1) * Math.sqrt(discriminant))/(9.81*d);
  const elevation = Math.atan(tangent), horizontal = speed*Math.cos(elevation);
  const time = d/horizontal;
  if (time > 3) throw new Error('This arc takes over 3 seconds. Choose a lower arc or change the speed.');
  return { start, velocity: [delta[0]/d*horizontal, delta[1]/d*horizontal, speed*Math.sin(elevation)], time };
}

export class PhysicalObservation {
  constructor(defaults, delay = 1) { this.defaults = defaults; this.delay = delay; this.reset(); }
  reset() { this.samples = []; this.previousEE = null; this.previousTime = null; }
  build({ qpos, qvel, bodyQ, bodyDQ, handQ, handDQ, sites, ball, time, mass, radius }) {
    const root = qpos.slice(0, 3), r = rotation(qpos.slice(3, 7));
    if (this.previousTime !== null && time < this.previousTime - 1e-8) this.reset();
    const fresh = this.previousTime === null || time > this.previousTime + 1e-8;
    if (fresh) {
      this.samples.push({ p: [...ball], t: time });
      if (this.samples.length > 8) this.samples.shift();
    }
    const newest = Math.max(0, this.samples.length - 1 - this.delay);
    const samples = this.samples.slice(Math.max(0, newest - 4), newest + 1);
    const last = samples.at(-1), centered = samples.map(s => s.t - last.t);
    const mean = centered.reduce((a, b) => a+b, 0)/samples.length;
    const denom = centered.reduce((a, t) => a+(t-mean)**2, 0);
    const velocity = [0,1,2].map(i => denom < 1e-12 ? 0 : samples.reduce((sum, s, j) =>
      sum + (centered[j]-mean)*(s.p[i]-last.p[i]), 0)/denom);
    const history = [2,1,0].flatMap(age => inverseRotate(r,
      sub(samples[Math.max(0, samples.length-1-age)].p, root)));
    const ee = sites.map(site => inverseRotate(r, sub(site.position, root)));
    const eeVel = ee.map((p, i) => this.previousEE && time > this.previousTime + 1e-8
      ? sub(p, this.previousEE[i]).map(v => v/(time-this.previousTime)) : [0,0,0]);
    const features = [
      ...inverseRotate(r, qvel.slice(0,3)), ...qvel.slice(3,6), ...inverseRotate(r,[0,0,-1]),
      ...bodyQ.slice(12).map((v,i) => v-this.defaults[12+i]), ...bodyDQ.slice(12),
      ...handQ.map((v,i) => v-this.defaults[27+i]), ...handDQ,
      ...ee[0], ...relativeRotation6d(r,sites[0].matrix), ...eeVel[0],
      ...ee[1], ...relativeRotation6d(r,sites[1].matrix), ...eeVel[1],
      ...history, ...inverseRotate(r,velocity), mass, radius, ...bodyQ, ...bodyDQ,
    ];
    if (features.length !== 159 || !features.every(Number.isFinite)) throw new Error('Invalid simulation state. Reset to try again.');
    if (fresh) { this.previousEE = ee; this.previousTime = time; }
    return Float32Array.from(features);
  }
}
