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
 {id:'orchard',x:-24,y:0,z:20,sign:'NEON ORCHARD',call:'Peaches! Fresh fruit, spectacularly advertised.',detail:'Nella Voss sells ordinary fruit. Her grandson built this extraordinary screen. No purchase or credits required.',tone:587},
 {id:'leather',x:17,y:0,z:12,sign:'HAVEN LEATHERWORKS',call:'A good bag outlasts a good advertisement.',detail:'An independent leatherworker, using electronic advertising. Inspect the illustrated collection; no transaction.',tone:349},
 {id:'witness',x:8,y:0,z:-16,sign:'UNSIGNED NOTICE',call:'',detail:'Anonymous public note: “A promise is not proof.” An unsigned opinion, not a verified claim. No individual identities inferred.',tone:220},
 {id:'story',x:-20,y:0,z:-30,sign:'CARAVAN OF STORIES',call:'Three accounts of one journey. Which would you remember?',detail:'A portable painted story cloth. Interpretations are not testimony.',tone:247},
 {id:'quiet',x:30,y:0,z:-37,sign:'QUIET TEA',call:'',detail:'Blue lamps and a place to breathe.',tone:220}
];
MARKET.push(...ROADSIDE.map((o,i)=>({...o,call:o.id==='blueBooks'?'':o.id==='forkTea'?'Tea before the road.':o.id==='silkBooks'?'Stories for the long journey!':'Provisions for the road!',tone:300+i*35})));
function attentionAt(eye,yaw,pitch){const quiet= Math.hypot(eye[0]-26,eye[2]+42)<10 && Math.abs(eye[1]-1.7)<5;const f=[Math.sin(yaw)*Math.cos(pitch),Math.sin(pitch),-Math.cos(yaw)*Math.cos(pitch)];return MARKET.map(s=>{const d=[s.x-eye[0],s.y+2-eye[1],s.z-eye[2]],distance=Math.hypot(...d),facing=d.reduce((a,b,i)=>a+b*f[i],0)/(distance||1);return {...s,distance,facing,score:Math.max(0,facing)*Math.max(0,1-distance/32)};}).filter(s=>s.distance<32&&(!quiet||s.id==='quiet')).sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id));}
function crowdPosition(a,t){const p=(t*a.speed+a.phase)%1;const u=(1-Math.cos(p*Math.PI*2))/2;return [a.x+(a.tx-a.x)*u,a.y||0,a.z+(a.tz-a.z)*u];}
function makeCrowd(seed=1701){const r=rng(seed),out=[];for(let i=0;i<36;i++){let edge=EDGES.slice(0,ORIGINAL_EDGE_COUNT).filter(([a,b])=>byId[a].y===0&&byId[b].y===0&&!['exit'].includes(a)&&!['exit'].includes(b))[i%14];if(!edge)continue;let a=byId[edge[0]],b=byId[edge[1]],dx=b.x-a.x,dz=b.z-a.z,len=Math.hypot(dx,dz),side=(i%2?1:-1)*(1.45+r()*.6),x=a.x-dz/len*side,z=a.z+dx/len*side;out.push({id:'walker'+i,x,z,tx:b.x-dz/len*side,tz:b.z+dx/len*side,speed:(.6+r()*.8)/(2*len),phase:r(),height:1.48+r()*.42,palette:i%6});}// Additional local shoppers milling around the Bazaar frontage, not a second population for the same actors.
for(let i=0;i<24;i++){const a=byId.bazaar,b=byId.cross,dx=b.x-a.x,dz=b.z-a.z,len=Math.hypot(dx,dz),u=.08+r()*.84,side=(i%2?1:-1)*(1.1+r()*1.0),x=a.x+dx*u-dz/len*side,z=a.z+dz*u+dx/len*side,dist=1+r()*2.8;out.push({id:'shopper'+i,x,z,tx:x+dx/len*dist,tz:z+dz/len*dist,speed:.08+r()*.10,phase:r(),height:1.4+r()*.48,palette:i%6});}return dressExtras(assignCultures(out,seed),seed);}
function walkSample(from,to,elapsed,duration){const p=Math.min(1,Math.max(0,elapsed/duration)),e=p*p*(3-2*p);return {eye:from.map((v,i)=>v+(to[i]-v)*e),done:p===1};}
const CULTURES=[
 {id:'ordinary',count:25,weight:42,colors:['#b6a38b','#526d7a','#817465','#d9c7ad'],home:'homes'},
 {id:'carnival',count:11,weight:19,colors:['#6937a0','#e1b638','#347d53','#c14785'],home:'bazaar'},
 {id:'reclaimer',count:6,weight:10,colors:['#9a603d','#58796b','#bb9c62'],home:'broken'},
 {id:'storyteller',count:5,weight:8,colors:['#234b83','#9b302f','#caa653'],home:'arts'},
 {id:'masquerade',count:4,weight:7,colors:['#2b2035','#a74d73','#e1a9bc'],home:'names'},
 {id:'commoner',count:4,weight:6,colors:['#69825a','#b9a276','#9a4d3b'],home:'commons'},
 {id:'quiet',count:3,weight:5,colors:['#293e48','#738b8d','#756757'],home:'quiet'},
 {id:'cyberpunk',count:2,weight:3,colors:['#10141c','#20e8ea','#ed348c'],home:'cross'}];
function assignCultures(out,seed){const r=rng(seed^0x52b7),pool=CULTURES.flatMap(c=>Array(c.count).fill(c));for(let i=pool.length-1;i>0;i--){let j=Math.floor(r()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}return out.map((a,i)=>{let c=pool[i];let home=byId[c.home],near=neighbors(c.home).filter(n=>byId[n].y===0),anchor=near.length?byId[near[Math.floor(r()*near.length)]]:null;let b={...a,culture:c.id,coat:c.colors[Math.floor(r()*c.colors.length)],trim:c.colors[(i+1)%c.colors.length],home:c.home,occupation:c.id==='ordinary'?'resident or merchant':c.id==='carnival'?'performer':c.id==='reclaimer'?'repair artisan':c.id==='storyteller'?'storyteller':c.id==='masquerade'?'tailor or actor':c.id==='commoner'?'cooperative worker':c.id==='quiet'?'private artisan':'screen technician'};if(anchor&&home.y===0&&c.id!=='ordinary'&&c.id!=='carnival'){let dx=anchor.x-home.x,dz=anchor.z-home.z,len=Math.hypot(dx,dz)||1,offset=(i%2?1:-1)*1.35;b={...b,x:home.x-dz/len*offset,z:home.z+dx/len*offset,tx:home.x+dx*.45-dz/len*offset,tz:home.z+dz*.45+dx/len*offset,speed:.035+r()*.05};}return b;});}
// Garments and jewelry are independently seeded costume choices, not beliefs or permissions.
const HEADWEAR=['kufi','taqiyah','turban','hijab','keffiyeh'];
const PENDANTS=['cross','mjolnir','star','plain'];
function dressExtras(actors,seed){const r=rng(seed^0xa0f7),order=actors.map((_,i)=>i);for(let i=order.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[order[i],order[j]]=[order[j],order[i]];}const head=new Map(order.slice(0,15).map((i,k)=>[i,HEADWEAR[k%5]]));const jewels=new Map(order.slice(9,25).map((i,k)=>[i,PENDANTS[k%4]]));return actors.map((a,i)=>({...a,headwear:head.get(i)||'original',pendant:jewels.get(i)||'none',shirt:order.slice(25,40).includes(i)?order.slice(25,40).indexOf(i)%2:-1,fabric:['#ead8b4','#ddd9c8','#5a6577','#9c6651','#385e52'][i%5]}));}
const SCREENS=[{id:'neon-orchard',x:-24,y:1.7,z:21.65,w:2.2,h:2.75,label:'Neon Orchard · fruit kiosk',slot:0},{id:'haven-leatherworks',x:17,y:1.4,z:13.65,w:2.4,h:3,label:'Haven Leatherworks · catalog',slot:1},{id:'second-print',x:-8,y:4.0,z:-11,w:3.6,h:4.5,label:'Second Print · fictional paid civic message',slot:2},{id:'lucky-draw',x:23,y:2,z:-17,w:2.5,h:3.125,label:'Lucky Draw · fictional arcade poster',slot:3}];
function peachPhase(t,reduced=false){if(reduced)return {burst:0,phase:0};const phase=((t%12)+12)%12;return {phase,burst:phase<4?0:phase<6?(phase-4)/2:phase<8?1-(phase-6)/2:0};}
if(typeof module!=='undefined')module.exports={MARKET,attentionAt,crowdPosition,makeCrowd,walkSample,CULTURES,SCREENS,peachPhase,HEADWEAR,PENDANTS,dressExtras};
