import {HOOP} from './shooting-game.mjs';
function rng(seed){let x=seed>>>0;return()=>{x=(Math.imul(x,1664525)+1013904223)>>>0;return x/4294967296;};}
export class SpotChallenge{
 constructor(seed=Date.now()){
  this.seed=seed;this.index=0;this.made=0;this.retries=0;this.elapsed=0;this.committed=false;this.results=[];
  const r=rng(seed);this.spots=[-45,-22.5,0,22.5,45].map(a=>{
   const angle=(a+(r()-.5)*8)*Math.PI/180,d=1.4+.45*r(),goal=[HOOP[0]-d*Math.cos(angle),-d*Math.sin(angle),0];
   // Spawn behind/diagonal to the spot, keeping the entire route on this half court.
   const heading=angle+(r()-.5)*Math.PI,offset=.35+.30*r();
   const spawn=[goal[0]-offset*Math.cos(heading),goal[1]-offset*Math.sin(heading),0];
   return{goal,spawn,radius:.18};
  });for(let i=4;i>0;i--){const j=Math.floor(r()*(i+1));[this.spots[i],this.spots[j]]=[this.spots[j],this.spots[i]];}
 }
 get spot(){return this.spots[this.index];} get complete(){return this.index>=5;}
 inside(root){return !this.complete&&Math.hypot(root[0]-this.spot.goal[0],root[1]-this.spot.goal[1])<=.18;}
 finish(success){if(!this.committed){this.retries++;return;}this.results.push(!!success);this.made+=Number(success);this.index++;this.committed=false;}
 get summary(){return{index:this.index,made:this.made,retries:this.retries,elapsed:this.elapsed,complete:this.complete,spot:this.spot,results:this.results.slice()};}
}
