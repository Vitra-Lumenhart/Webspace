'use strict';
// Authored attention sources: advertisements are offers, never forced interactions.
const MARKET=[
 {id:'tea',x:-12,y:30,z:61,sign:'LAST LANTERN',call:'Tea for the road. Sit if you like.',detail:'A copper kettle and an empty seat. No purchase required.',tone:440},
 {id:'bread',x:-26,y:0,z:11,sign:'HOT BREAD',call:'Warm bread! The oven is still going.',detail:'A basket of loaves and a handwritten price board.',tone:330},
 {id:'repair',x:-13,y:0,z:1,sign:'SECOND SPRING',call:'Broken things wanted! Bring me the impossible ones.',detail:'Mara is looking for an obsolete musical mechanism.',tone:196},
 {id:'glass',x:-8,y:0,z:15,sign:'SALVAGED GLASS',call:'A little piece of a lost cathedral!',detail:'Colored glass, sorted by hue rather than origin.',tone:659},
 {id:'music',x:-3,y:0,z:11,sign:'ODD MUSIC',call:'Three rhythms, one instrument! Come listen.',detail:'A demonstration of a peculiar three-beat instrument.',tone:294},
 {id:'cloth',x:14,y:0,z:19,sign:'SECOND NAMES',call:'A new coat, a new name, or neither!',detail:'Fabric swatches and unassigned masks.',tone:392},
 {id:'work',x:-7,y:0,z:-19,sign:'WORK AND FAVORS',call:'A chair repaired for a lesson! No coin needed.',detail:'An exchange of favors, open to anyone.',tone:262},
 {id:'venn',x:-17,y:0,z:-32,sign:'FAILED IDEAS',call:'Counterexamples welcome! No admission.',detail:'Professor Venn invites another pair of eyes.',tone:523},
 {id:'quiet',x:30,y:0,z:-37,sign:'QUIET TEA',call:'',detail:'Blue lamps and a place to breathe.',tone:220}
];
function attentionAt(eye,yaw,pitch){const f=[Math.sin(yaw)*Math.cos(pitch),Math.sin(pitch),-Math.cos(yaw)*Math.cos(pitch)];return MARKET.map(s=>{const d=[s.x-eye[0],s.y+2-eye[1],s.z-eye[2]],distance=Math.hypot(...d),facing=d.reduce((a,b,i)=>a+b*f[i],0)/(distance||1);return {...s,distance,facing,score:Math.max(0,facing)*Math.max(0,1-distance/32)};}).filter(s=>s.distance<32).sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id));}
function crowdPosition(a,t){const p=(t*a.speed+a.phase)%1;const u=(1-Math.cos(p*Math.PI*2))/2;return [a.x+(a.tx-a.x)*u,a.y||0,a.z+(a.tz-a.z)*u];}
function makeCrowd(seed=1701){const r=rng(seed),out=[];for(let i=0;i<36;i++){let edge=EDGES.filter(([a,b])=>byId[a].y===0&&byId[b].y===0&&!['exit'].includes(a)&&!['exit'].includes(b))[i%14];if(!edge)continue;let a=byId[edge[0]],b=byId[edge[1]],dx=b.x-a.x,dz=b.z-a.z,len=Math.hypot(dx,dz),side=(i%2?1:-1)*(1.45+r()*.6),x=a.x-dz/len*side,z=a.z+dx/len*side;out.push({id:'walker'+i,x,z,tx:b.x-dz/len*side,tz:b.z+dx/len*side,speed:(.6+r()*.8)/(2*len),phase:r(),height:1.48+r()*.42,palette:i%6});}// Additional local shoppers milling around the Bazaar frontage, not a second population for the same actors.
for(let i=0;i<24;i++){const a=byId.bazaar,b=byId.cross,dx=b.x-a.x,dz=b.z-a.z,len=Math.hypot(dx,dz),u=.08+r()*.84,side=(i%2?1:-1)*(1.1+r()*1.0),x=a.x+dx*u-dz/len*side,z=a.z+dz*u+dx/len*side,dist=1+r()*2.8;out.push({id:'shopper'+i,x,z,tx:x+dx/len*dist,tz:z+dz/len*dist,speed:.08+r()*.10,phase:r(),height:1.4+r()*.48,palette:i%6});}return out;}
function walkSample(from,to,elapsed,duration){const p=Math.min(1,Math.max(0,elapsed/duration)),e=p*p*(3-2*p);return {eye:from.map((v,i)=>v+(to[i]-v)*e),done:p===1};}
if(typeof module!=='undefined')module.exports={MARKET,attentionAt,crowdPosition,makeCrowd,walkSample};
