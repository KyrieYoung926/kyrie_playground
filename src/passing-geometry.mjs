export function rotateFreePose(qpos, qvel, q, v, pivot, angle) {
  const c=Math.cos(angle),s=Math.sin(angle),x=qpos[q]-pivot[0],y=qpos[q+1]-pivot[1];
  qpos[q]=pivot[0]+c*x-s*y;qpos[q+1]=pivot[1]+s*x+c*y;
  const [w,a,b,z]=Array.from(qpos.slice(q+3,q+7)),cw=Math.cos(angle/2),sw=Math.sin(angle/2);
  qpos.set([cw*w-sw*z,cw*a-sw*b,cw*b+sw*a,cw*z+sw*w],q+3);
  const vx=qvel[v],vy=qvel[v+1];qvel[v]=c*vx-s*vy;qvel[v+1]=s*vx+c*vy;
  // Free-joint angular velocity is local: a world-yaw transform leaves it unchanged.
}
export function descendingCrossing(previous, current, target, vz) {
  if(previous[2]<target[2] || current[2]>=target[2] || vz>=0)return null;
  const u=(previous[2]-target[2])/(previous[2]-current[2]);
  const point=previous.map((x,i)=>x+u*(current[i]-x));
  return {point,error:Math.hypot(point[0]-target[0],point[1]-target[1])};
}
