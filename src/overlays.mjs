// Display-only geometry: never added to the policy camera's physical scene.
export function disposeOverlay(group){if(!group)return;group.removeFromParent();group.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});}
export function flightPreview(context,f){
 const T=globalThis.__mjswanThree,g=new T.Group(),pts=[];
 for(let i=0;i<=64;i++){const t=f.time*i/64;const p=f.start.map((v,k)=>v+f.velocity[k]*t-(k===2?4.905*t*t:0));pts.push(new T.Vector3(p[0],p[2],-p[1]));}
 const curve=new T.CatmullRomCurve3(pts);
 for(const [radius,color] of [[.017,0x173b45],[.010,0x13d9ff]]){
  const mesh=new T.Mesh(new T.TubeGeometry(curve,96,radius,6,false),new T.MeshBasicMaterial({color,transparent:radius>.012,opacity:radius>.012?.3:1,depthWrite:radius<.012}));g.add(mesh);
 }
 for(const [point,color]of [[pts[0],0x73f5ff],[pts.at(-1),0xff58b8]]){const m=new T.Mesh(new T.SphereGeometry(.035,12,8),new T.MeshBasicMaterial({color}));m.position.copy(point);g.add(m);}
 context.scene.add(g);return g;
}

export function flightCamera(f,root=[0,0,.8],aspect=1.6,bounds=[]){
 const points=[...bounds,[root[0]-.35,root[1]-.4,0],[root[0]+.4,root[1]+.4,1.6]];
 for(let i=0;i<=32;i++){const t=f.time*i/32;points.push(f.start.map((v,k)=>v+f.velocity[k]*t-(k===2?4.905*t*t:0)));}
 const low=[0,1,2].map(k=>Math.min(...points.map(p=>p[k]))),high=[0,1,2].map(k=>Math.max(...points.map(p=>p[k])));
 const center=low.map((v,k)=>(v+high[k])/2),radius=Math.hypot(...high.map((v,k)=>(v-low[k])/2));
 const halfFov=Math.min(Math.PI/8,Math.atan(Math.tan(Math.PI/8)*aspect));
 return {center,distance:Math.max(4,1.06*radius/Math.sin(halfFov))};
}
