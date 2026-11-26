// Belowroads index.template.html field() lineage @ 6908912: ellipse air, broad relief,
// protected route and boundary search. No 3-D voxel field or marching tetrahedra.
const CAVE_SEG=96,CAVE_RINGS=Array.from(new Set([-10,-2,0,6,12,18,24,28,30,36,42,48,54,58,60,66,72,74,76,82,88,94,100,106,112])).map(y=>[y,y<54?1.03:y<76?1.03-(y-54)*.003:y<100?.964-(y-76)*.014:Math.max(.035,.628-(y-100)*.0494)]);
function rootField(fn,lo,hi){for(let k=0;k<12;k++){let m=(lo+hi)/2;if(fn(m)>0)lo=m;else hi=m;}return (lo+hi)/2;}
function domeRadius(a,k){const [y,s]=CAVE_RINGS[k],r=92*s+(14+9*Math.cos(a-Math.PI)+7*Math.cos(2*a+.45))*Math.sin(Math.PI*Math.max(0,Math.min(1,(y+10)/122)));return rootField(d=>r-d+Math.min(3,r*.12)*(.60*Math.sin(a*7+y*.11)*Math.sin(a*4-y*.15)+.40*Math.sin(a*13+y*.25)),0,r+5);}
function tubeProfile(s){let t=Math.max(0,Math.min(1,s/15));return {w:4.3+4.9*t*t,h:4.5+4.6*t*t,c:.65*Math.sin(t*Math.PI)};}
function tubeField(x,y,s){let p=tubeProfile(s),dx=x-p.c;let air=(1-Math.hypot(dx/p.w,y/p.h))*Math.min(p.w,p.h)+.34*Math.sin(x*1.26+y*.71+s*.84)*Math.sin(s*.78-y*.93)+.12*Math.sin(x*2.2+y*2.9+s*1.5);return Math.max(air,Math.min(2.4-Math.abs(dx),3.1-y));}
function tubeSection(s,a){let p=tubeProfile(s),r=rootField(d=>tubeField(p.c+Math.cos(a)*d,Math.sin(a)*d,s),0,14);return [p.c+Math.cos(a)*r,Math.sin(a)*r];}
function caveSurfaceCounts(){return {domeVertices:CAVE_SEG*(CAVE_RINGS.length-1)*6+CAVE_SEG*3,tubeVertices:2*8*16*6,oldDomeVertices:96*10*6,oldTubeVertices:2*(4*24*6+24*6)};}
