// Viewer-only hoop: physical success is the trained descending crossing test.
export function makeHoop(T, center, normal) {
  const group = new T.Group(); group.name = 'shooting-hoop';
  const side = [-normal[1],normal[0],0];
  const point = (a,b,z) => new T.Vector3(center[0]+a*normal[0]+b*side[0],center[2]+z,-center[1]-a*normal[1]-b*side[1]);
  const tube=(points,r,color,straight=false)=>{
    const curve = straight ? new T.CurvePath() : new T.CatmullRomCurve3(points);
    if(straight) for(let i=1;i<points.length;i++)curve.add(new T.LineCurve3(points[i-1],points[i]));
    const m = new T.Mesh(new T.TubeGeometry(curve, Math.max(12,points.length*2),r,6,false),new T.MeshStandardMaterial({color,roughness:.6}));group.add(m);return m;
  };
  const circle=(radius,z)=>Array.from({length:49},(_,i)=>point(radius*Math.cos(i*Math.PI/24),radius*Math.sin(i*Math.PI/24),z));
  tube(circle(.225,0),.012,0xe96b35);
  // Light net strands, tapering below the rim.
  for(let i=0;i<12;i++){
    const a=i*Math.PI/6;
    const strand=Array.from({length:7},(_,j)=>{const r=.225-.055*j/6,t=a+(j%2)*.13;return point(r*Math.cos(t),r*Math.sin(t),-.40*j/6);});
    tube(strand,.0025,0xe9e7dc);
  }
  for(const z of [-.13,-.27,-.40])tube(circle(.225+z*.1375,z),.002,0xe9e7dc);
  const board=new T.Mesh(new T.BoxGeometry(.95,.60,.025),new T.MeshStandardMaterial({color:0xf4f1e7,transparent:true,opacity:.85,roughness:.5}));
  board.position.copy(point(.35,0,.25));board.rotation.y=Math.atan2(normal[0],-normal[1]);group.add(board);
  tube([point(.332,-.22,.04),point(.332,-.22,.32),point(.332,.22,.32),point(.332,.22,.04),point(.332,-.22,.04)],.006,0x5c6b62,true);
  tube([point(.35,0,-.02),point(.225,0,-.02)],.018,0xe96b35);
  tube([point(.70,0,-center[2]+.08),point(.70,0,.48),point(.36,0,.48)],.035,0x566960,true);
  const base=new T.Mesh(new T.BoxGeometry(.7,.1,.55),new T.MeshStandardMaterial({color:0x566960,roughness:.9}));base.position.copy(point(.70,0,-center[2]+.05));group.add(base);
  return group;
}
