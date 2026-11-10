import {descendingCrossing} from './passing-geometry.mjs';
// Entry alone is not a basket: require a subsequent downward exit below the rim.
export class HoopScore {
 constructor(center,radius=.11){this.center=[...center];this.radius=radius;this.clearance=.225-radius;this.entered=false;this.scored=false;}
 update(previous,current,vz,eligible=true){
  if(this.scored)return null;
  if(!eligible){this.entered=false;return null;}
  if(current[2]>this.center[2]+.02)this.entered=false;
  const entry=descendingCrossing(previous,current,this.center,vz);
  if(entry)this.entered=entry.error<this.clearance;
  if(!this.entered)return null;
  const exit=descendingCrossing(previous,current,[this.center[0],this.center[1],this.center[2]-this.radius-0.03],vz);
  if(exit){this.entered=false;if(exit.error<.225){this.scored=true;return exit;}}
  return null;
 }
}
