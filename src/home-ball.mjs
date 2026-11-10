import {HomeBallPhysics} from './home-ball-physics.mjs';
// Homepage-only: no MuJoCo, textures or model downloads.
export function mountHomeBall(){
 const ball=document.createElement('button');ball.className='home-ball';ball.type='button';ball.setAttribute('aria-label','Drag and release to shoot the ball');ball.title='Drag to throw · tap to bounce';
 const hoop=document.createElement('div');hoop.className='home-hoop';hoop.innerHTML='<svg width="160" height="150" viewBox="0 0 160 150" aria-hidden="true"><path class="mini-board" d="M137 6V92"/><path class="mini-net" d="M15 84L32 133H108L125 84M33 84L47 133M52 84L60 133M72 84V133M92 84L84 133M110 84L97 133M22 105H118M28 120H113"/><path class="mini-rim" d="M15 84H125"/></svg><span class="home-hoop-score" aria-live="polite">Drag to shoot</span>';
 document.body.classList.add('has-home-ball');document.body.append(hoop,ball);
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),p=new HomeBallPhysics(innerWidth,innerHeight);
 let frame=0,last=0,drag=null,disposed=false,active=!reduced.matches,celebrationTimer;
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 function paint(){p.constrain();ball.style.transform=`translate3d(${p.x-23}px,${p.y-23}px,0)`;hoop.style.left=`${p.hoop.x-70}px`;hoop.style.top=`${p.hoop.y-84}px`;}
 function stop(){cancelAnimationFrame(frame);frame=0;last=0;}
 function wake(){if(!disposed&&!frame&&!document.hidden&&!drag&&active)frame=requestAnimationFrame(tick);}
 function celebrate(){hoop.querySelector('span').textContent=`Nice shot! · ${p.score}`;hoop.classList.remove('scored');void hoop.offsetWidth;if(!reduced.matches)hoop.classList.add('scored');clearTimeout(celebrationTimer);celebrationTimer=setTimeout(()=>{hoop.classList.remove('scored');hoop.querySelector('span').textContent=`${p.score} ${p.score===1?'basket':'baskets'} · Drag to shoot`;},1600);}
 function tick(now){frame=0;const dt=Math.min((now-(last||now))/1000,.025);last=now;if(p.step(dt))celebrate();paint();if(p.y>=innerHeight-39&&Math.abs(p.vx)<3&&p.vy===0){last=0;return;}wake();}
 ball.onpointerdown=e=>{if(e.button!==0||drag)return;stop();p.cancelEntry();active=true;drag={id:e.pointerId,x:e.clientX,y:e.clientY,time:performance.now(),moved:false};p.vx=p.vy=0;ball.setPointerCapture(e.pointerId);ball.classList.add('grabbed');};
 ball.onpointermove=e=>{if(!drag||e.pointerId!==drag.id)return;const now=performance.now(),dt=Math.max((now-drag.time)/1000,.008),dx=e.clientX-drag.x,dy=e.clientY-drag.y;drag.moved||=Math.abs(dx)+Math.abs(dy)>3;p.vx=clamp(dx/dt,-1300,1300);p.vy=clamp(dy/dt,-1500,1500);p.x+=dx;p.y+=dy;Object.assign(drag,{x:e.clientX,y:e.clientY,time:now});paint();};
 function release(e){if(!drag||e.pointerId!==drag.id)return;if(e.type==='pointercancel')p.vx=p.vy=0;else if(!drag.moved)p.vy=-650;else if(performance.now()-drag.time>120)p.vx=p.vy=0;drag=null;p.cancelEntry();ball.classList.remove('grabbed');wake();}
 ball.onpointerup=release;ball.onpointercancel=release;ball.onlostpointercapture=release;ball.onclick=e=>{if(e.detail===0){active=true;p.vy=-650;p.cancelEntry();wake();}};
 function visibility(){if(document.hidden)stop();else wake();}
 function resize(){p.resize(innerWidth,innerHeight);paint();wake();}
 function motion(){stop();active=!reduced.matches;if(!active){p.y=innerHeight-39;p.vx=p.vy=0;paint();}else wake();}
 function destroy(){disposed=true;stop();clearTimeout(celebrationTimer);ball.remove();hoop.remove();document.body.classList.remove('has-home-ball');removeEventListener('resize',resize);removeEventListener('pagehide',destroy);document.removeEventListener('visibilitychange',visibility);reduced.removeEventListener('change',motion);}
 addEventListener('resize',resize);addEventListener('pagehide',destroy);document.addEventListener('visibilitychange',visibility);reduced.addEventListener('change',motion);
 document.querySelector('#launch-task').addEventListener('click',destroy,{once:true});
 addEventListener('pageshow',function restore(e){if(e.persisted&&disposed){removeEventListener('pageshow',restore);mountHomeBall();}});
 if(reduced.matches)p.y=innerHeight-39;paint();wake();return destroy;
}
