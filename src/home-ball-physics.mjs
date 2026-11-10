export class HomeBallPhysics {
 constructor(width,height){this.radius=23;this.x=width-31;this.y=105;this.vx=0;this.vy=0;this.score=0;this.pending=false;this.resize(width,height);}
 resize(width,height){this.width=width;this.height=height;this.hoop={x:width-94,y:width>=900?Math.max(220,Math.min(380,height*.42)):Math.max(170,height-220),half:55};this.constrain();this.pending=false;}
 constrain(){this.x=Math.max(31,Math.min(this.width-31,this.x));this.y=Math.max(31,Math.min(this.height-39,this.y));}
 cancelEntry(){this.pending=false;}
 step(dt){let made=false;const n=Math.ceil(dt/(1/240));for(let i=0;i<n;i++)made=this.substep(dt/n)||made;return made;}
 substep(dt){
  const oldY=this.y,oldX=this.x,r=this.radius,h=this.hoop;
  this.vy+=1350*dt;this.x+=this.vx*dt;this.y+=this.vy*dt;
  if(this.x<31){this.x=31;this.vx=Math.abs(this.vx)*.82;}if(this.x>this.width-31){this.x=this.width-31;this.vx=-Math.abs(this.vx)*.82;}
  if(this.y<31){this.y=31;this.vy=Math.abs(this.vy)*.82;}
  const floor=this.height-r-16;
  if(this.y>=floor){this.y=floor;this.vy=-Math.abs(this.vy)*.80;this.vx*=.88;if(Math.abs(this.vy)<45){this.vy=0;this.vx*=.8;}}
  // Circle against rim endpoints and vertical backboard, all in CSS pixels.
  const contact=(px,py,extra)=>{const dx=this.x-px,dy=this.y-py,d=Math.hypot(dx,dy),min=r+extra;if(d<min&&d>1e-6){const nx=dx/d,ny=dy/d;this.x=px+nx*min;this.y=py+ny*min;const v=this.vx*nx+this.vy*ny;if(v<0){this.vx-=1.78*v*nx;this.vy-=1.78*v*ny;}}};
  contact(h.x-h.half,h.y,3);contact(h.x+h.half,h.y,3);
  contact(h.x+h.half+12,Math.max(h.y-78,Math.min(h.y+8,this.y)),3);
  if(oldY<h.y&&this.y>=h.y&&this.vy>0){const u=(h.y-oldY)/(this.y-oldY),x=oldX+u*(this.x-oldX);this.pending=Math.abs(x-h.x)<h.half-r-3;}
  if(this.y<h.y-2||Math.abs(this.x-h.x)>h.half+this.radius)this.pending=false;
  if(this.pending&&this.y>=h.y+r+5&&this.vy>0){this.pending=false;this.score++;return true;}
  return false;
 }
}
