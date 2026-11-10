export function celebrate(stage,getHoop,score){
 const el=document.createElement('div');el.className='basket-celebration';el.setAttribute('role','status');
 const label=document.createElement('div');label.className='basket-message';label.textContent=`Nice shot!  ·  ${score} ${score===1?'basket':'baskets'}`;el.append(label);
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(!reduced)for(let i=0;i<36;i++){
  const p=document.createElement('i');p.style.cssText=`--x:${(i*73%101)-50}vw;--r:${i*47}deg;--delay:${i%7*.04}s;--color:${['#ec7243','#f1c85b','#77ba9c','#73d7e2'][i%4]}`;el.append(p);
 }
 stage.append(el);const start=performance.now();let frame;
 function animate(now){
  const t=(now-start)/1000,hoop=getHoop(),net=hoop?.getObjectByName('hoop-net'),rim=hoop?.getObjectByName('hoop-rim');
  if(net)net.position.x=reduced?0:Math.sin(t*16)*.018*Math.exp(-t*2);
  if(rim){rim.material.emissive.setHex(0xf4b547);rim.material.emissiveIntensity=Math.max(0,1-t/2.5);}
  if(t<3)frame=requestAnimationFrame(animate);else clean();
 }
 function clean(){cancelAnimationFrame(frame);el.remove();const h=getHoop(),n=h?.getObjectByName('hoop-net'),r=h?.getObjectByName('hoop-rim');if(n)n.position.x=0;if(r)r.material.emissiveIntensity=0;}
 frame=requestAnimationFrame(animate);return clean;
}
