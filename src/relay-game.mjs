import {HOOP,COURT_CENTER,COURT_LENGTH} from './shooting-game.mjs';
import {rotateFreePose} from './passing-geometry.mjs';
export function receiverPlan(ball,heading,distance,offset){
 const f=[Math.cos(heading),Math.sin(heading)],left=[-f[1],f[0]],target=[ball[0]+distance*f[0],ball[1]+distance*f[1],1.05];
 const root=[target[0]+.5*f[0]+offset*left[0],target[1]+.5*f[1]+offset*left[1],.7495];
 const margin=.8,inside=root[0]>COURT_CENTER-COURT_LENGTH/2+margin&&root[0]<COURT_CENTER+COURT_LENGTH/2-margin&&Math.abs(root[1])<15.24/2-margin;
 const clear=Math.hypot(root[0]-HOOP[0],root[1]-HOOP[1])>.95&&Math.hypot(root[0]-(HOOP[0]+.7),root[1])>.85;
 // Conservative pre-release screening; measured-flight calibration determines the published envelope.
 const time=.25+distance*.18,move=Math.max(0,Math.abs(offset)-.15),needed=2*Math.sqrt(move/5)+.10;
 const offsetLimit=distance<1.3?.15:distance<1.8?.30:.45;
 return{root,target,yaw:heading+Math.PI,distance,offset,flightTime:time,valid:inside&&clear&&needed<=time&&Math.abs(offset)<=offsetLimit};
}
export class RobotPool{
 constructor(context,cfg){
  this.context=context;this.cfg=cfg;this.active=[true,false];this.resetMemory=[0,0];
  const {mujoco:mj,mjModel:m}=context,id=(kind,name)=>mj.mj_name2id(m,mj.mjtObj[kind].value,name);
  this.welds=cfg.robots.map((_,i)=>id('mjOBJ_EQUALITY',`parking_weld_${i}`));
  this.parks=cfg.robots.map((_,i)=>m.body_mocapid[id('mjOBJ_BODY',`parking_${i}`)]);
  this.geoms=cfg.robots.map(r=>Array.from({length:m.ngeom},(_,i)=>i).filter(i=>(mj.mj_id2name(m,mj.mjtObj.mjOBJ_GEOM.value,i)||'').startsWith(r.prefix+'/')));
  this.masks=Array.from(m.geom_contype);this.affinity=Array.from(m.geom_conaffinity);
  this.meshes=this.geoms.map(ids=>{const result=[];context.scene.traverse(o=>{if(ids.includes(o.userData.geomId))result.push(o);});return result;});
 }
 visible(i,alpha){for(const o of this.meshes[i]){if(o.userData.originalRelayVisible===undefined)o.userData.originalRelayVisible=o.visible;o.visible=alpha>0&&o.userData.originalRelayVisible;if(o.isMesh){if(!o.userData.relayMaterials){o.material=Array.isArray(o.material)?o.material.map(m=>m.clone()):o.material.clone();o.userData.relayMaterials=true;}for(const m of(Array.isArray(o.material)?o.material:[o.material])){if(m.userData.relayOpacity===undefined){m.userData.relayOpacity=m.opacity;m.userData.relayTransparent=m.transparent;}m.opacity=alpha*m.userData.relayOpacity;m.transparent=alpha<1||m.userData.relayTransparent;}}}}
 collision(i,enabled){const m=this.context.mjModel;for(const g of this.geoms[i]){m.geom_contype[g]=enabled?this.masks[g]:0;m.geom_conaffinity[g]=enabled?this.affinity[g]:0;}}
 park(i){const {mjData:d,mujoco:mj,mjModel:m}=this.context,c=this.cfg.robots[i];this.active[i]=false;this.collision(i,false);this.visible(i,0);
  const position=[-25-i*3,-25,.74];d.mocap_pos.set(position,this.parks[i]*3);d.mocap_quat.set([1,0,0,0],this.parks[i]*4);d.qpos.set([...position,1,0,0,0],c.rootQ);d.qvel.fill(0,c.rootV,c.rootV+35);d.eq_active[this.welds[i]]=1;this.resetMemory[i]=1;mj.mj_forward(m,d);
 }
 activate(i,plan){const {mjData:d,mujoco:mj,mjModel:m}=this.context,c=this.cfg.robots[i],a=this.cfg.robots[0],q=this.cfg.catchInitialQpos,v=this.cfg.catchInitialQvel;
  d.eq_active[this.welds[i]]=0;d.qpos.set(q.slice(a.rootQ,a.rootQ+7),c.rootQ);d.qvel.set(v.slice(a.rootV,a.rootV+6),c.rootV);
  c.qposAddresses.forEach((k,j)=>d.qpos[k]=q[a.qposAddresses[j]]);c.qvelAddresses.forEach((k,j)=>d.qvel[k]=v[a.qvelAddresses[j]]);
  const [w,x,y,z]=Array.from(d.qpos.slice(c.rootQ+3,c.rootQ+7)),yaw=Math.atan2(2*(w*z+x*y),1-2*(y*y+z*z));
  const pivot=Array.from(d.qpos.slice(c.rootQ,c.rootQ+3));rotateFreePose(d.qpos,d.qvel,c.rootQ,c.rootV,pivot,plan.yaw-yaw);d.qpos[c.rootQ]=plan.root[0];d.qpos[c.rootQ+1]=plan.root[1];
  this.active[i]=true;this.resetMemory[i]=1;this.collision(i,true);this.visible(i,1);mj.mj_forward(m,d);
 }
 restore(){for(let i=0;i<2;i++){this.context.mjData.eq_active[this.welds[i]]=0;this.collision(i,true);this.visible(i,1);}}
}
