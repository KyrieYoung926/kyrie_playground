export function ballControls(parent,library,onChange,profile=null) {
  const box=document.createElement('div');box.className='ball-controls';
  box.innerHTML=`<div class="level-field"><label for="ball-kind">Ball</label><select id="ball-kind">${library.balls.map((b,i)=>`<option value="${i}">${b.label}</option>`).join('')}</select></div><label class="ball-dimension">Radius <input id="ball-radius" type="range" step="0.001"><output id="radius-value"></output></label><label class="ball-dimension">Mass <input id="ball-mass" type="range" step="0.005"><output id="mass-value"></output></label>`;
  parent.append(box);const kind=box.querySelector('#ball-kind'),radius=box.querySelector('#ball-radius'),mass=box.querySelector('#ball-mass');
  function labels(){box.querySelector('#radius-value').textContent=(+radius.value*100).toFixed(1)+' cm';box.querySelector('#mass-value').textContent=Math.round(+mass.value*1000)+' g';}
  function select(index=+kind.value){const b=library.balls[index];kind.value=String(index);radius.min=b.radius[0];radius.max=b.radius[1];mass.min=b.mass[0];mass.max=b.mass[1];radius.value=b.default[0];mass.value=b.default[1];radius.disabled=b.radius[0]===b.radius[1];mass.disabled=b.mass[0]===b.mass[1];labels();}
  select(profile??0);if(profile!==null)kind.parentElement.hidden=true;
  kind.onchange=()=>{select();onChange();};for(const el of[radius,mass])el.oninput=()=>{labels();onChange();};
  return {get value(){return{radius:+radius.value,mass:+mass.value,inertia:library.inertiaFactor};},select};
}
export function applyBall(context,cfg,properties,depth) {
  const {mjModel:m,mjData:d,mujoco:mj}=context;
  const gid=mj.mj_name2id(m,mj.mjtObj.mjOBJ_GEOM.value,'ball/ball_geom'),bid=m.geom_bodyid[gid],old=m.geom_size[gid*3],r=properties.radius;
  cfg.ballRadius=r;cfg.ballMass=properties.mass;
  m.geom_size[gid*3]=r;m.geom_rbound[gid]=r;
  if(m.geom_aabb)for(let i=3;i<6;i++)m.geom_aabb[gid*6+i]=r;
  m.body_mass[bid]=properties.mass;for(let i=0;i<3;i++)m.body_inertia[bid*3+i]=properties.inertia*properties.mass*r*r;
  // mj_setConst temporarily installs qpos0. Preserve the chosen reset pose.
  const qpos=Float64Array.from(d.qpos), qvel=Float64Array.from(d.qvel), time=d.time;
  mj.mj_setConst(m,d);d.qpos.set(qpos);d.qvel.set(qvel);d.time=time;mj.mj_forward(m,d);
  for(const scene of [context.scene,depth?.scene])scene?.traverse(obj=>{if(obj.isMesh&&obj.userData.geomId===gid)obj.scale.multiplyScalar(r/old);});
}
