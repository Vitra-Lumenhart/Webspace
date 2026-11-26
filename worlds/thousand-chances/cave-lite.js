// Belowroads index.template.html field() lineage @ 6908912: ellipse air, broad relief,
// protected route and boundary search. No 3-D voxel field or marching tetrahedra.
const CAVE_SEG=64,CAVE_RINGS=[[-10,1],[0,1],[16,1.01],[35,1.045],[54,1.05],[72,.95],[88,.76],[101,.46],[110,.035]];
function rootField(fn,lo,hi){for(let k=0;k<12;k++){let m=(lo+hi)/2;if(fn(m)>0)lo=m;else hi=m;}return (lo+hi)/2;}
function domeRadius(a,k){const [y,s]=CAVE_RINGS[k],r=92*s;return rootField(d=>r-d+Math.min(3,r*.12)*(.60*Math.sin(a*7+y*.11)*Math.sin(a*4-y*.15)+.40*Math.sin(a*13+y*.25)),0,r+5);}
function tubeProfile(s){let t=Math.max(0,Math.min(1,s/15));return {w:4.3+4.9*t*t,h:4.5+4.6*t*t,c:.65*Math.sin(t*Math.PI)};}
function tubeField(x,y,s){let p=tubeProfile(s),dx=x-p.c;let air=(1-Math.hypot(dx/p.w,y/p.h))*Math.min(p.w,p.h)+.34*Math.sin(x*1.26+y*.71+s*.84)*Math.sin(s*.78-y*.93)+.12*Math.sin(x*2.2+y*2.9+s*1.5);return Math.max(air,Math.min(2.4-Math.abs(dx),3.1-y));}
function tubeSection(s,a){let p=tubeProfile(s),r=rootField(d=>tubeField(p.c+Math.cos(a)*d,Math.sin(a)*d,s),0,14);return [p.c+Math.cos(a)*r,Math.sin(a)*r];}
function caveSurfaceCounts(){return {domeVertices:64*8*6+64*3,tubeVertices:2*8*16*6,oldDomeVertices:96*10*6,oldTubeVertices:2*(4*24*6+24*6)};}
