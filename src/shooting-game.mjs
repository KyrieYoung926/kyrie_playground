// All coordinates here are MuJoCo world coordinates (Z up).
export const COURT_LENGTH=28.6512;
export const COURT_CENTER=-(.5-827/1713)*COURT_LENGTH;
export const HOOP=Object.freeze([COURT_CENTER+COURT_LENGTH/2-1.575,0,2]);
export const HOOP_NORMAL=Object.freeze([1,0,0]);
export const MANUAL_SPEED=.30;
export const SHOOT_MAX_DISTANCE=5.5;
export const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
export function inShootingRegion(root){return root[0]<=HOOP[0] && Math.hypot(root[0]-HOOP[0],root[1]-HOOP[1])<=SHOOT_MAX_DISTANCE;}
export function shootingLimits(mode){return mode==='journey'?[1,1.5]:[.8,SHOOT_MAX_DISTANCE];}
const sweep=(t,period)=>1-Math.abs(2*((t/period+.5)%1)-1);
export class ManualShot {
  constructor(){this.keys=new Set();this.command=[0,0,0];this.stage='move';this.settled=0;this.phaseStart=0;this.target=null;}
  clear(){this.keys.clear();this.command=[0,0,0];}
  cancel(){if(!['shoot','result','pass_preparing','pass_flight'].includes(this.stage)){this.stage='move';this.keys.clear();this.settled=0;}}
  confirm(time){
    if(this.stage==='move'){this.stage='settle';this.keys.clear();this.settled=0;}
    else if(this.stage==='direction'){this.stage='height';this.phaseStart=time;this.height=2;}
    else if(this.stage==='height'){this.stage='power';this.phaseStart=time;this.distance=1.4;}
    else if(this.stage==='power'){
      this.target=[this.origin[0]+this.distance*Math.cos(this.theta),this.origin[1]+this.distance*Math.sin(this.theta),this.height];
      this.stage='shoot';return this.target.slice();
    }
    return null;
  }
  passConfirm(time){
    if(this.stage==='move'){this.stage='pass_settle';this.keys.clear();this.settled=0;this.offset=(Math.random()<.8?Math.random()*.3:.3+Math.random()*.15)*(Math.random()<.5?-1:1);}
    else if(this.stage==='pass_distance')return true;
    return false;
  }
  update(r,ball,time,dt){
    const key=k=>Number(this.keys.has(k));
    let want=[0,0,0];
    if(this.stage==='move'){
      const x=key('KeyW')-key('KeyS'),y=key('KeyA')-key('KeyD'),n=Math.max(1,Math.hypot(x,y));
      want=[MANUAL_SPEED*x/n,MANUAL_SPEED*y/n,.4*(key('KeyQ')-key('KeyE'))];
    }
    const dx=want[0]-this.command[0],dy=want[1]-this.command[1],n=Math.hypot(dx,dy),f=Math.min(1,.5*dt/Math.max(n,1e-12));
    this.command[0]+=dx*f;this.command[1]+=dy*f;this.command[2]+=clamp(want[2]-this.command[2],-.8*dt,.8*dt);
    if(['settle','pass_settle'].includes(this.stage)){
      this.settled=Math.hypot(...r.rv.slice(0,2))<.1 && Math.hypot(...r.omega)<.3 ? this.settled+dt:0;
      if(this.settled>=.6){this.stage=this.stage==='pass_settle'?'pass_distance':'direction';this.phaseStart=time;this.origin=ball.slice();this.baseYaw=Math.atan2(r.R[3],r.R[0]);this.theta=this.baseYaw;this.height=2;this.distance=1.4;}
    }
    const t=time-this.phaseStart;
    if(this.stage==='direction')this.theta=this.baseYaw+(sweep(t,6)*2-1)*Math.PI/2;
    if(this.stage==='height')this.height=1.8+.4*sweep(t,3);
    if(this.stage==='pass_distance')this.distance=1+sweep(t,2.4);
    if(this.stage==='power')this.distance=.8+(SHOOT_MAX_DISTANCE-.8)*sweep(t,4.8);
    this.inside=inShootingRegion(r.root);this.hoopDistance=Math.hypot(HOOP[0]-ball[0],HOOP[1]-ball[1]);
    this.hoopBearing=Math.atan2(HOOP[1]-ball[1],HOOP[0]-ball[0]);
  }
  get preview(){return this.origin?[this.origin[0]+this.distance*Math.cos(this.theta),this.origin[1]+this.distance*Math.sin(this.theta),this.height]:null;}
}
export class ShotScores {
  constructor(){this.rows=Object.fromEntries(['shot','journey','manual','challenge'].map(k=>[k,{made:0,shots:0}]));}
  release(mode,valid){if(valid)this.rows[mode].shots++;}
  basket(mode){this.rows[mode].made++;}
  text(mode){const r=this.rows[mode];return `${r.made} / ${r.shots} · ${r.shots?Math.round(100*r.made/r.shots)+'%':'—'}`;}
}
