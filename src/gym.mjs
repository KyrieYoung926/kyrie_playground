// Viewer scenery only. Sensor depth remains the MuJoCo scene, as in native play.
export function installGym(context) {
  if (context.scene.getObjectByName('catch-gym')) return;
  const T = globalThis.__mjswanThree, group = new T.Group();
  group.name = 'catch-gym';
  const loader = new T.TextureLoader(), root = import.meta.env.BASE_URL + 'assets/gym/';
  function material(file, repeats=[1,1]) {
    const map=loader.load(root+file+'.webp'); map.colorSpace=T.SRGBColorSpace;
    map.wrapS=map.wrapT=T.RepeatWrapping;map.repeat.set(...repeats);
    return new T.MeshStandardMaterial({map,roughness:.85,side:T.DoubleSide});
  }
  function plane(w,h,position,rotation,mat) {
    const m=new T.Mesh(new T.PlaneGeometry(w,h),mat);m.position.set(...position);m.rotation.set(...rotation);m.receiveShadow=true;group.add(m);
  }
  const length=28.6512,width=15.24,center=-(.5-827/1713)*length;
  // Border strips avoid overlapping coplanar floor layers.
  const border=material('floor',[18,10]);
  for(const sign of [-1,1]) {
    plane(length+4,2,[center,.007,sign*(width/2+1)],[-Math.PI/2,0,0],border);
    plane(2,width,[center+sign*(length/2+1),.007,0],[-Math.PI/2,0,0],border);
  }
  plane(length,width,[center,.007,0],[-Math.PI/2,0,0],material('court'));
  const wall=material('wall',[12,4]);
  // Interior faces only: an orbit camera outside the room must see the court, not an opaque wall back.
  wall.side=T.FrontSide;
  plane(length+4,10,[center,5,-(width+4)/2],[0,0,0],wall);
  plane(length+4,10,[center,5,(width+4)/2],[0,Math.PI,0],wall);
  plane(width+4,10,[center+(length+4)/2,5,0],[0,-Math.PI/2,0],wall);
  plane(width+4,10,[center-(length+4)/2,5,0],[0,Math.PI/2,0],wall);
  plane(length+4,width+4,[center,10,0],[Math.PI/2,0,0],material('ceiling',[15,9]));
  context.scene.traverse(obj=>{
    if(obj.isLight)obj.intensity=0;
    // Hide only the viewer mesh. DepthCamera builds its own physical ground.
    if(obj.userData.isGroundPlane)obj.visible=false;
  });
  const ambient=new T.HemisphereLight(0xffffff,0xbac7d5,2.2);group.add(ambient);
  const light=new T.DirectionalLight(0xfff8ed,2.0);light.position.set(3,9,4);group.add(light);
  const fill=new T.DirectionalLight(0xe5efff,1.2);fill.position.set(-4,5,-3);group.add(fill);
  context.scene.background=new T.Color('#e5e8df');context.scene.add(group);
}

// Regions are fixed to the reset frame, never to the moving robot.
export function drawCatchRegions(context,cfg,level,old) {
  if(old){old.removeFromParent();old.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});}
  if(!cfg.kind.endsWith('rubber'))return null;
  const T=globalThis.__mjswanThree,g=new T.Group(),edges=[.15,.30,.45,.60,.90,1.20,1.50],y=edges[level];
  const zlo=cfg.kind==='gt-rubber'?.9-.05*level/6:.9,zhi=cfg.kind==='gt-rubber'?1.25+.10*level/6:1.25;
  const q=cfg.initialQpos.slice(3,7),yaw=Math.atan2(2*(q[0]*q[3]+q[1]*q[2]),1-2*(q[2]**2+q[3]**2));
  g.position.set(cfg.initialQpos[0],0,-cfg.initialQpos[1]);g.rotation.y=yaw;
  function outline(points,color){const v=points.map(p=>new T.Vector3(p[0],p[2],-p[1]));for(let i=1;i<v.length;i++){const curve=new T.LineCurve3(v[i-1],v[i]);g.add(new T.Mesh(new T.TubeGeometry(curve,1,.008,6,false),new T.MeshBasicMaterial({color})));}}
  outline([[-.35,-y-.6,.015],[.35,-y-.6,.015],[.35,y+.6,.015],[-.35,y+.6,.015],[-.35,-y-.6,.015]],'#00e5f5');
  outline([[.5,-y,zlo],[.5,y,zlo],[.5,y,zhi],[.5,-y,zhi],[.5,-y,zlo]],'#ff58b8');
  const patch=new T.Mesh(new T.PlaneGeometry(2*y,zhi-zlo),new T.MeshBasicMaterial({color:'#ff58b8',transparent:true,opacity:.14,side:T.DoubleSide,depthWrite:false}));
  patch.rotation.y=Math.PI/2;patch.position.set(.5,(zhi+zlo)/2,0);g.add(patch);context.scene.add(g);return g;
}

// Browser display transform only; the depth sensor has a separate raw renderer.
export function configureGymDisplay(engine) {
  const T=globalThis.__mjswanThree, renderer=engine.runtime.renderer;
  renderer.outputColorSpace=T.SRGBColorSpace;
  renderer.toneMapping=T.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.0;
}
