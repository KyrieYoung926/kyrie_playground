import {HOOP,COURT_CENTER,COURT_LENGTH} from './shooting-game.mjs';
export function installScoreboard(context){
 const T=globalThis.__mjswanThree,existing=context.scene.getObjectByName('shoot-scoreboard');if(existing)return existing;
 const canvas=document.createElement('canvas');canvas.width=768;canvas.height=300;
 const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;
 const board=new T.Mesh(new T.PlaneGeometry(2.8,1.1),new T.MeshBasicMaterial({map:texture,side:T.DoubleSide}));board.name='shoot-scoreboard';
 board.position.set(COURT_CENTER+(COURT_LENGTH+4)/2-.03,3.4,0);board.rotation.y=-Math.PI/2;
 let last='';board.userData.update=(mode,score)=>{const value=JSON.stringify([mode,score]);if(value===last)return;last=value;
  const c=canvas.getContext('2d');c.fillStyle='#23382f';c.fillRect(0,0,768,300);c.strokeStyle='#839b7c';c.lineWidth=5;c.strokeRect(6,6,756,288);
  c.textAlign='center';c.fillStyle='#d2dcc7';c.font='24px monospace';c.fillText(({shot:'SHOOTING',journey:'CATCH · CARRY · SHOOT',manual:'MANUAL SHOOTING'})[mode],384,48);
  ['MADE','SHOTS','ACCURACY'].forEach((s,i)=>{c.font='21px monospace';c.fillStyle='#b2c3af';c.fillText(s,130+i*252,104);c.font='bold 64px monospace';c.fillStyle='#fff0ba';c.fillText(String([score.made,score.shots,score.shots?Math.round(100*score.made/score.shots)+'%':'—'][i]),130+i*252,202);});
  c.font='18px monospace';c.fillStyle='#b2c3af';c.fillText('CATCHLAB · THIS SESSION',384,265);texture.needsUpdate=true;
 };context.scene.add(board);return board;
}
export function addManualOverlay(T,group,manual,root){
 const cv=p=>new T.Vector3(p[0],p[2],-p[1]);
 const sector=new T.Mesh(new T.CircleGeometry(2,64,Math.PI/2,Math.PI),new T.MeshBasicMaterial({color:0xdd615c,side:T.DoubleSide,transparent:true,opacity:manual.inside?.38:.18,depthWrite:false}));
 sector.rotation.x=-Math.PI/2;sector.position.copy(cv([HOOP[0],HOOP[1],.018]));sector.name='shooting-region';group.add(sector);
 if(!['direction','height','power'].includes(manual.stage))return;
 const origin=[root[0],root[1],.04],direction=[Math.cos(manual.theta),Math.sin(manual.theta),0];
 if(manual.stage!=='direction'){origin[2]=root[2];const a=Math.atan2(manual.height-manual.origin[2],1.4);direction[0]*=Math.cos(a);direction[1]*=Math.cos(a);direction[2]=Math.sin(a);}
 group.add(new T.ArrowHelper(cv(direction).normalize(),cv(origin),.9,0xf2c942,.16,.10));
 const ref=[Math.cos(manual.hoopBearing),Math.sin(manual.hoopBearing),0];group.add(new T.ArrowHelper(cv(ref),cv([root[0],root[1],.035]),.55,0x8fa78c,.09,.06));
 if(manual.preview){const m=new T.Mesh(new T.SphereGeometry(.035,12,8),new T.MeshBasicMaterial({color:0xf2c942}));m.position.copy(cv(manual.preview));group.add(m);}
}
export function mountManualControls({confirm,cancel,reset,press,release}){
 const el=document.createElement('section');el.className='manual-controls';el.hidden=true;
 el.innerHTML='<p class="manual-guide">WASD Move · Q/E Turn · Space Aim/Confirm · Esc Cancel · R Reset</p><p class="manual-stage" aria-live="polite"></p><p class="manual-region"></p><div class="shot-meter" hidden><span></span><i title="Hoop distance"></i></div><p class="manual-values"></p><div class="manual-pad"><button data-key="KeyQ">↶ Q</button><button data-key="KeyW">↑ W</button><button data-key="KeyE">E ↷</button><button data-key="KeyA">← A</button><button data-key="KeyS">↓ S</button><button data-key="KeyD">D →</button></div><div class="manual-actions"><button data-aim>Aim / Confirm</button><button data-cancel>Cancel</button><button data-reset>Reset</button></div><p class="control-hint">Direction, height and power select a target point—not a guaranteed release trajectory.</p>';
 document.querySelector('#parameters').after(el);
 el.querySelector('[data-aim]').onclick=confirm;el.querySelector('[data-cancel]').onclick=cancel;el.querySelector('[data-reset]').onclick=reset;
 for(const b of el.querySelectorAll('[data-key]')){b.onpointerdown=e=>{e.preventDefault();b.setPointerCapture(e.pointerId);press(b.dataset.key);};for(const k of ['onpointerup','onpointercancel','onlostpointercapture'])b[k]=()=>release(b.dataset.key);}
 return {el,update(m){
  el.querySelector('.manual-stage').textContent=({move:'Move with the ball · Space to aim',settle:'Stopping · waiting for balance',direction:'1 / 3 · Lock horizontal direction',height:'2 / 3 · Lock target height',power:'3 / 3 · Lock power and shoot',shoot:'Shooting',result:'Attempt complete'})[m.stage];
  el.querySelector('.manual-region').textContent=(m.inside?'Within shooting range':'Outside recommended shooting range')+(m.hoopDistance<.8?' · Too close: minimum target distance 0.8 m':'');
  el.querySelector('.manual-region').classList.toggle('inside',!!m.inside);
  const meter=el.querySelector('.shot-meter');meter.hidden=m.stage!=='power';meter.querySelector('span').style.width=`${100*(m.distance-.8)/1.2}%`;meter.querySelector('i').style.left=`${100*Math.max(0,Math.min(1,(m.hoopDistance-.8)/1.2))}%`;
  el.querySelector('.manual-values').textContent=m.origin?`Height ${m.height.toFixed(2)} m (hoop 2.00 m) · Power / target distance ${m.distance.toFixed(2)} m · Hoop ${m.hoopDistance.toFixed(2)} m`:'';
 }};
}
