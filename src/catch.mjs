import {norm,sub,rotation} from './physics.mjs';
const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
const rotate=(m,v)=>[0,1,2].map(i=>dot(m.slice(i*3,i*3+3),v));
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const row=(a,i,n=3)=>Array.from(a.slice(i*n,(i+1)*n));

// Physical result reporting only. None of these simulator measurements enter a
// visual policy. Criteria and timers follow the individual task's evaluator.
export class CatchMonitor {
  constructor(context,cfg,kind){
    this.isPalm=kind.endsWith('rubber');this.isSingle=kind==='single'||kind==='depth-single';this.side=cfg.handSide==='left'?0:1;this.context=context;this.cfg=cfg;this.kind=kind;
    const {mjModel:m,mujoco:mj}=context;
    const id=(type,name)=>mj.mj_name2id(m,mj.mjtObj[type].value,name);
    this.ballGeom=id('mjOBJ_GEOM','ball/ball_geom');
    const j=id('mjOBJ_JOINT','ball/ball_freejoint');this.bq=m.jnt_qposadr[j];this.bv=m.jnt_dofadr[j];
    this.names=Array.from({length:m.ngeom},(_,i)=>mj.mj_id2name(m,mj.mjtObj.mjOBJ_GEOM.value,i)||'');
    this.root=id('mjOBJ_BODY','robot/pelvis');
    this.wrists=['left','right'].map(side=>this.isPalm?{body:id('mjOBJ_BODY',`robot/${side}_wrist_yaw_link`)}:{site:id('mjOBJ_SITE',`robot/${side}_grasp_site`)});
    this.palms=(cfg.palmFrames||[]).map(p=>({...p,id:id('mjOBJ_BODY',p.body)}));
    this.force=new mj.DoubleBuffer(6);this.reset();
  }
  dispose(){this.force.delete();}
  reset(){this.hold=0;this.continuous=0;this.gap=0;this.quiet=0;this.maxHold=0;this.previousTime=null;this.success=false;this.acquired=false;this.contact=false;}
  velocity(body,point){const {mjModel:m,mjData:d}=this.context;const v=row(d.cvel,body,6),com=row(d.subtree_com,m.body_rootid[body]);return v.slice(3).map((x,i)=>x+cross(v.slice(0,3),sub(point,com))[i]);}
  update(level=0){
    const {mjModel:m,mjData:d,mujoco:mj}=this.context;
    if(this.previousTime!==null&&d.time<=this.previousTime+1e-8)return this.result;
    const dt=this.previousTime===null?0:Math.min(.02,d.time-this.previousTime);this.previousTime=d.time;
    const forces=new Map();let bad=false;
    for(let i=0;i<d.ncon;i++){
      const c=d.contact.get(i),g=c.geom1===this.ballGeom?c.geom2:c.geom2===this.ballGeom?c.geom1:-1;c.delete();
      if(g<0)continue;mj.mj_contactForce(m,d,i,this.force);const f=Math.hypot(...this.force.GetView().slice(0,3));forces.set(g,Math.max(forces.get(g)||0,f));
    }
    const fingers=[new Set(),new Set()],touching=[false,false],palm=[false,false];
    const threshold=this.isPalm?.1:1;
    for(const [g,f] of forces){const name=this.names[g],side=name.includes('/left_')?0:name.includes('/right_')?1:-1;
      const allowed=this.isPalm?/(?:_rubber_.*|_wrist_yaw_link)_collision$/.test(name):/(?:_hand_.*|_dex3_palm)_collision$/.test(name);
      if(allowed&&side>=0&&f>threshold){touching[side]=true;if(name.includes('palm'))palm[side]=true;const match=name.match(/_hand_(thumb|index|middle)_([0-9])/);if(match&&!(this.isSingle&&match[1]==='thumb'&&match[2]==='0'))fingers[side].add(match[1]);}
      if(name.startsWith('robot/')&&!allowed&&f>1)bad=true;
    }
    const ball=Array.from(d.qpos.slice(this.bq,this.bq+3)),bv=Array.from(d.qvel.slice(this.bv,this.bv+3));
    const rp=Array.from(d.qpos.slice(0,3)),rv=Array.from(d.qvel.slice(0,3)),omega=Array.from(d.qvel.slice(3,6));
    const wrists=this.wrists.map(w=>{const point=w.site===undefined?row(d.xpos,w.body):row(d.site_xpos,w.site);return {point,velocity:this.velocity(w.site===undefined?w.body:m.site_bodyid[w.site],point)};});
    let enclosure=true,stable;
    if(this.isSingle){
      const f=fingers[this.side],valid=(f.has('thumb')&&(f.has('index')||f.has('middle')||palm[this.side]))||(f.has('index')&&f.has('middle')&&palm[this.side]);
      stable=valid&&norm(sub(bv,rv))<.6;
    }else{
      if(this.isPalm){
        const normals=[];enclosure=this.palms.length===2&&this.palms.every(p=>{const R=row(d.xmat,p.id,9),n=rotate(R,p.normal),point=row(d.xpos,p.id).map((x,i)=>x+rotate(R,p.point)[i]),off=sub(ball,point),dist=norm(off);normals.push(n);return Math.abs(dist-this.cfg.ballRadius)<.025&&dot(off,n)/Math.max(dist,1e-6)>.90;});
        enclosure=enclosure&&dot(normals[0],normals[1])<-.65;
      }else{
        const lp=wrists[0].point,rp=wrists[1].point;enclosure=dot(sub(lp,ball),sub(rp,ball))<0&&norm(sub(lp.map((x,i)=>(x+rp[i])/2),ball))<this.cfg.ballRadius+.05;
      }
      const bilateral=this.isPalm?touching.every(Boolean):fingers.every(s=>s.size>=2);
      stable=bilateral&&enclosure&&!bad&&wrists.every(w=>norm(sub(bv,w.velocity))<.6);
      if(this.isPalm)stable&&=norm(sub(bv,rv))<.6;
    }
    const R=rotation(Array.from(d.qpos.slice(3,7))),fall=rp[2]<.4||R[8]<.34;
    const init=this.cfg.initialQpos,dx=rp[0]-init[0],dy=rp[1]-init[1],ir=rotation(init.slice(3,7)),yaw=Math.atan2(ir[3],ir[0]),local=[Math.cos(yaw)*dx+Math.sin(yaw)*dy,-Math.sin(yaw)*dx+Math.cos(yaw)*dy];
    const outside=this.isPalm?Math.abs(local[0])>.35||Math.abs(local[1])>[.15,.3,.45,.6,.9,1.2,1.5][level]+.6:this.kind==='depth-dex'?Math.abs(rp[0])>.75||Math.abs(rp[1])>.5:false;
    const dropped=ball[2]< (this.isSingle?.12:this.cfg.ballRadius+.005);
    stable&&=!fall&&!dropped;
    this.gap=stable?0:this.gap+dt;this.continuous=stable?this.continuous+dt:0;
    const gapAllowed=this.isSingle||this.isPalm?0:.04;
    this.hold=this.gap>gapAllowed+1e-6||(!this.isSingle&&bad)||fall?0:this.hold+(stable?dt:0);
    this.maxHold=Math.max(this.maxHold,this.hold);this.contact||=touching.some(Boolean);this.acquired||=this.hold>=.6-1e-6;
    const quiet=stable&&!outside&&Math.hypot(...rv.slice(0,2))<.08&&norm(omega)<.15;
    this.quiet=quiet?this.quiet+dt:0;
    const success=this.isSingle?this.hold>=.8-1e-6:this.isPalm?this.hold>=1.5-1e-6&&!outside&&Math.hypot(...rv.slice(0,2))<.3&&norm(omega)<.6:this.kind==='depth-dex'?this.hold>=5-1e-6&&this.quiet>=1-1e-6:this.continuous>2;
    this.success||=success;
    return this.result={success:this.success,stable,hold:this.hold,continuousHold:this.continuous,maxHold:this.maxHold,quietTime:this.quiet,contacts:touching,fingerCount:fingers.map(s=>s.size),enclosure,badContact:bad,fall,outside,dropped,acquired:this.acquired,everContact:this.contact};
  }
}
