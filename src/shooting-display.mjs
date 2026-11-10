import {HOOP,COURT_CENTER,COURT_LENGTH} from './shooting-game.mjs';
export function installScoreboard(context){
 const T=globalThis.__mjswanThree,existing=context.scene.getObjectByName('shoot-scoreboard');if(existing)return existing;
 const canvas=document.createElement('canvas');canvas.width=1152;canvas.height=450;
 const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;
 const board=new T.Mesh(new T.PlaneGeometry(4.2,1.65),new T.MeshBasicMaterial({map:texture,side:T.FrontSide}));board.name='shoot-scoreboard';
 board.position.set(COURT_CENTER+(COURT_LENGTH+4)/2-.03,3.4,2.8);board.rotation.y=-Math.PI/2;
 let last='';board.userData.update=(mode,score)=>{const value=JSON.stringify([mode,score]);if(value===last)return;last=value;
  const c=canvas.getContext('2d');c.setTransform(1.5,0,0,1.5,0,0);c.fillStyle='#23382f';c.fillRect(0,0,768,300);c.strokeStyle='#839b7c';c.lineWidth=5;c.strokeRect(6,6,756,288);
  c.textAlign='center';c.fillStyle='#d2dcc7';c.font='24px monospace';c.fillText(({shot:'SHOOTING',journey:'CATCH · CARRY · SHOOT',manual:'FREE CARRY & SHOOT',challenge:'FIVE-SPOT CHALLENGE'})[mode],384,48);
  ['MADE','SHOTS','ACCURACY'].forEach((s,i)=>{c.font='21px monospace';c.fillStyle='#b2c3af';c.fillText(s,130+i*252,104);c.font='bold 64px monospace';c.fillStyle='#fff0ba';c.fillText(String([score.made,score.shots,score.shots?Math.round(100*score.made/score.shots)+'%':'—'][i]),130+i*252,202);});
  c.font='18px monospace';c.fillStyle='#b2c3af';c.fillText('CATCHLAB · THIS SESSION',384,265);texture.needsUpdate=true;
 };context.scene.add(board);return board;
}
export function addManualOverlay(T,group,manual,root,challenge,receiver){
 const cv=p=>new T.Vector3(p[0],p[2],-p[1]);
 const sector=new T.Mesh(new T.CircleGeometry(2,64,Math.PI/2,Math.PI),new T.MeshBasicMaterial({color:0xdd615c,side:T.DoubleSide,transparent:true,opacity:manual.inside?.38:.18,depthWrite:false}));
 sector.rotation.x=-Math.PI/2;sector.position.copy(cv([HOOP[0],HOOP[1],.018]));sector.name='shooting-region';group.add(sector);
 if(challenge&&!challenge.complete){
  const goal=challenge.spot.goal,ready=challenge.inside(root),ring=new T.Mesh(new T.RingGeometry(.155,.18,48),new T.MeshBasicMaterial({color:ready?0x73e2a2:0xf6cf68,side:T.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.copy(cv([goal[0],goal[1],.025]));group.add(ring);
  if(!ready){const v=new T.Vector3(goal[0]-root[0],0,-goal[1]+root[1]);group.add(new T.ArrowHelper(v.normalize(),cv([root[0],root[1],.04]),.4,0xf6cf68,.10,.06));}
 }
 if(receiver&&manual.stage.startsWith('pass_')){
  const color=receiver.valid?0x75c5ae:0xdc7765;
  const ring=new T.Mesh(new T.RingGeometry(.23,.25,40),new T.MeshBasicMaterial({color,side:T.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.copy(cv([receiver.root[0],receiver.root[1],.025]));group.add(ring);
  const ghost=new T.Mesh(new T.CapsuleGeometry(.15,.5,4,12),new T.MeshBasicMaterial({color,transparent:true,opacity:.18,depthWrite:false}));ghost.position.copy(cv([receiver.root[0],receiver.root[1],1]));group.add(ghost);
  const d=new T.Vector3(Math.cos(manual.theta),0,-Math.sin(manual.theta));group.add(new T.ArrowHelper(d,cv([root[0],root[1],.05]),Math.max(.2,receiver.distance),color,.14,.08));
 }
 if(!['direction','height','power'].includes(manual.stage))return;
 const origin=[root[0],root[1],.04],direction=[Math.cos(manual.theta),Math.sin(manual.theta),0];
 if(manual.stage!=='direction'){origin[2]=root[2];const a=Math.atan2(manual.height-manual.origin[2],1.4);direction[0]*=Math.cos(a);direction[1]*=Math.cos(a);direction[2]=Math.sin(a);}
 group.add(new T.ArrowHelper(cv(direction).normalize(),cv(origin),.9,0xf2c942,.16,.10));
 const ref=[Math.cos(manual.hoopBearing),Math.sin(manual.hoopBearing),0];group.add(new T.ArrowHelper(cv(ref),cv([root[0],root[1],.035]),.55,0x8fa78c,.09,.06));
 if(manual.preview){const m=new T.Mesh(new T.SphereGeometry(.035,12,8),new T.MeshBasicMaterial({color:0xf2c942}));m.position.copy(cv(manual.preview));group.add(m);}
}
export function mountManualControls({confirm,pass,cancel,reset,press,release}){
 const el=document.createElement('section');el.className='manual-controls';el.hidden=true;
 el.innerHTML='<p class="manual-guide">WASD Move · Q/E Turn · Space Aim/Confirm · J Pass · Esc Cancel · R Reset</p><p class="challenge-status"></p><p class="relay-status"></p><p class="manual-stage" aria-live="polite"></p><p class="manual-region"></p><div class="shot-meter" hidden><span></span><i title="Hoop distance"></i></div><p class="manual-values"></p><div class="manual-pad"><button data-key="KeyQ">↶ Q</button><button data-key="KeyW">↑ W</button><button data-key="KeyE">E ↷</button><button data-key="KeyA">← A</button><button data-key="KeyS">↓ S</button><button data-key="KeyD">D →</button></div><div class="manual-actions"><button data-aim>Aim / Confirm</button><button data-pass>J · Pass</button><button data-cancel>Cancel</button><button data-reset>Reset</button></div><p class="control-hint">Direction, height and power select a target point—not a guaranteed release trajectory.</p>';
 document.querySelector('#parameters').after(el);
 el.querySelector('[data-aim]').onclick=confirm;el.querySelector('[data-pass]').onclick=pass;el.querySelector('[data-cancel]').onclick=cancel;el.querySelector('[data-reset]').onclick=reset;
 for(const b of el.querySelectorAll('[data-key]')){b.onpointerdown=e=>{e.preventDefault();b.setPointerCapture(e.pointerId);press(b.dataset.key);};for(const k of ['onpointerup','onpointercancel','onlostpointercapture'])b[k]=()=>release(b.dataset.key);}
 return {el,update(m,challenge){
  el.querySelector('.manual-stage').textContent=({move:'Move with the ball · Space to aim',settle:'Stopping · waiting for balance',direction:'1 / 3 · Lock horizontal direction',height:'2 / 3 · Lock target height',power:'3 / 3 · Lock power and shoot',shoot:'Shooting',result:'Attempt complete',pass_settle:'Stopping · preparing to pass',pass_distance:'J to lock pass distance',pass_preparing:'Receiver getting ready',pass_flight:'Passing · waiting for a stable catch'})[m.stage];
  el.querySelector('.manual-region').textContent=(m.inside?'Within shooting range':'Outside recommended shooting range')+(m.hoopDistance<.8?' · Too close: minimum target distance 0.8 m':'');
  el.querySelector('.manual-region').classList.toggle('inside',!!m.inside);
  const meter=el.querySelector('.shot-meter');meter.hidden=!['power','pass_distance'].includes(m.stage);meter.querySelector('span').style.width=`${100*(m.stage==='pass_distance'?(m.distance-1):(m.distance-.8)/1.2)}%`;meter.querySelector('i').title=m.stage==='pass_distance'?'1.5 m reference':'Hoop distance';meter.querySelector('i').style.left=`${100*Math.max(0,Math.min(1,(m.stage==='pass_distance'?.5:(m.hoopDistance-.8)/1.2)))}%`;
  el.querySelector('.challenge-status').textContent=challenge?`Spot ${Math.min(5,challenge.index+1)} / 5 · ${challenge.made} made · ${challenge.elapsed.toFixed(1)} s · ${challenge.retries} retries${m.challengeReady?' · Ready to aim':''}`:'';
  el.querySelector('.manual-guide').textContent=`WASD Move · Q/E Turn · Space Aim/Confirm${challenge?'':' · J Pass'} · Esc Cancel · R Reset`;
  el.querySelector('[data-reset]').textContent=challenge?.complete?'New challenge':'Reset';
  if(challenge?.complete)el.querySelector('.challenge-status').textContent=`Complete · ${challenge.made}/5 · ${challenge.elapsed.toFixed(1)} s · ${challenge.retries} retries`;
  el.querySelector('.relay-status').textContent=challenge?'':`${window.catchLab?.state.passStreak||0} consecutive passes`;
  el.querySelector('.manual-values').textContent=m.stage.startsWith('pass_')?`Pass distance ${(m.distance||1.5).toFixed(2)} m · Along your facing direction${m.stage==='pass_distance'&&window.catchLab?.observation.receiverPreview?.valid===false?' · Try more distance, move/turn, or Esc to retry':''}`:m.origin?`Height ${m.height.toFixed(2)} m (hoop 2.00 m) · Power / target distance ${m.distance.toFixed(2)} m · Hoop ${m.hoopDistance.toFixed(2)} m`:'';
 }};
}
