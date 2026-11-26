'use strict';
// TC-R0001 — scene graph and Xenos-derived fictional civic movement, no external authority.
const NODES=[
 ['entry','The Entry Tube',0,30,78,0,-1,'The cave releases you into a city.'],
 ['lantern','The Last Lantern',-8,30,63,0,-1,'A tea stall, an empty seat, three disagreeing guides.'],
 ['balcony','Balcony of Arrivals',0,30,45,0,-1,'The Wheel, waterfall and market light unfold below.'],
 ['ramp1','Upper ramp',-23,21,36,1,-1,'A broad returnable route descends.'],
 ['ramp2','Lower ramp',-34,10,22,1,-1,'The market grows louder.'],
 ['bazaar','Bazaar of a Hundred Trades',-18,0,16,0,-1,'Bread, unusual instruments, stained glass and repaired treasures.'],
 ['cross','Central exchange of paths',0,0,2,0,-1,'A crossroads beneath the Wheel.'],
 ['names','Avenue of Second Names',22,0,15,-1,-1,'Tailors, masks, mirrors turned only by invitation.'],
 ['broken','Street of Broken Things',-28,0,-16,1,-1,'Mara repairs what the world has discarded.'],
 ['arts','Hall of Uncertain Arts',-24,0,-39,1,0,'Professor Venn displays a counterexample.'],
 ['fortunes','House of Small Fortunes',18,0,-19,0,1,'Fictional skill games and no-fee demonstrations.'],
 ['commons','Commons of Empty Pockets',0,0,-32,0,-1,'An oven and an exchange of favors; no money required.'],
 ['court','Court of Many Promises',-12,0,-55,0,1,'Independent arbitration; possession is not title.'],
 ['quiet','Quiet Market',26,0,-42,-1,0,'Blue lamps and private conversation.'],
 ['quays','Blackwater Quays',50,-5,-72,-1,0,'Cargo, water and a disputed maker’s mark.'],
 ['homeRamp','Residential ramp',36,8,-13,-1,0,'Homes and workshops share heat.'],
 ['homes','Houses Above the Market',43,18,21,-1,-1,'Lit windows, laundry and a garden.'],
 ['homeBridge','Upper residential bridge',20,24,40,-1,-1,'A bridge joins the upper terraces.'],
 ['exit','The Return Tube',0,0,-75,0,1,'An independent, clearly marked return.'],
 ['silkGate','Silk Gate peddlers',10,30,63,-1,-1,'A side branch at the old caravan threshold; tea, flatbread and repairs.'],
 ['silkShelf','The Silk Shelf',-15,26,43,-1,-1,'A sloping alternative to the main descent, above the carnival lights.'],
 ['ribbonWalk','Ribbon Walk',32,24,37,1,-1,'Mixed households, laundry and small neighborhood shops.'],
 ['blueLanding','Blue Landing',35,13,4,-1,-1,'A quiet intermediate shelf with books and cups.'],
 ['returnCourt','The Farewell Court',14,0,-53,0,-1,'Last-minute provisions and a little performance platform.'],
 ['returnShelf','The Lantern Fork',12,0,-65,-1,-1,'A choice of the old court route or a small peddler’s lane.']
].map(([id,name,x,y,z,dx,dz,desc])=>({id,name,x,y,z,dx,dz,desc}));
const EDGES=[['entry','lantern'],['lantern','balcony'],['balcony','ramp1'],['ramp1','ramp2'],['ramp2','bazaar'],['bazaar','cross'],['bazaar','broken'],['cross','names'],['cross','broken'],['cross','fortunes'],['cross','commons'],['names','fortunes'],['names','homeRamp'],['broken','arts'],['arts','commons'],['arts','court'],['fortunes','commons'],['fortunes','quiet'],['commons','court'],['commons','quiet'],['court','exit'],['quiet','quays'],['quays','exit'],['quiet','homeRamp'],['homeRamp','homes'],['homes','homeBridge'],['homeBridge','balcony'],['lantern','silkGate'],['silkGate','balcony'],['balcony','silkShelf'],['silkShelf','ramp1'],['homeBridge','ribbonWalk'],['ribbonWalk','homes'],['homes','blueLanding'],['blueLanding','homeRamp'],['commons','returnCourt'],['court','returnCourt'],['returnCourt','returnShelf'],['returnShelf','exit']];
// TC-R0007: additive city geography. The original 25 anchors and 72 building records remain canonical.
const ORIGINAL_EDGE_COUNT=EDGES.length;
const VEINS=[],VILLAS=[],RESIDENTIAL_ADDRESSES=[];
function addNode(id,name,x,y,z,desc,dx=0,dz=-1){NODES.push({id,name,x,y,z,dx,dz,desc});return id;}
function addEdge(a,b){EDGES.push([a,b]);}
const polar=(r,a,y)=>[r*Math.cos(a*Math.PI/180),y,r*Math.sin(a*Math.PI/180)];
const sectors=[90,45,0,-45,-90,-135,180,135];
// Two independently traversable rings outside the dome; cross-links form Lost Vein loops.
for(let i=0;i<8;i++){let a=sectors[i],lo=[30,30,20,10,0,10,20,30][i],hi=[76,76,60,60,76,76,60,76][i];addNode('silkVein'+i,'Old Silk Vein · '+(i+1),...polar(145,a,lo),'An ancient trade bypass through the rock.');addNode('houseVein'+i,'House Veins · '+(i+1),...polar(145,a,hi),'A sheltered residential passage.');}
for(let i=0;i<8;i++){let j=(i+1)%8;addEdge('silkVein'+i,'silkVein'+j);addEdge('houseVein'+i,'houseVein'+j);}
for(const i of [1,3,5,7]){let a=sectors[i]+11;addNode('lostVein'+i,'Lost Vein · '+i,...polar(190,a,44),'An older, irregular passage linking the two trade routes.');addEdge('silkVein'+i,'lostVein'+i);addEdge('lostVein'+i,'houseVein'+i);}
// Six actual cavern wall crossings. The mouth is cut out of the boundary mesh.
const VEIN_MOUTHS=[{id:'northMouth',a:90,y:30,outer:'silkVein0',inner:'entry',r:80},{id:'southMouth',a:-90,y:0,outer:'silkVein4',inner:'exit',r:77},{id:'westMouth',a:180,y:60,outer:'houseVein6',r:77},{id:'eastMouth',a:0,y:60,outer:'houseVein2',r:77},{id:'crownNorth',a:45,y:76,outer:'houseVein1',r:60},{id:'crownWest',a:135,y:76,outer:'houseVein7',r:60}];
for(const m of VEIN_MOUTHS){addNode(m.id,({northMouth:'Old Silk Gate',southMouth:'Lower Vein Gate',westMouth:'Western Grotto',eastMouth:'Eastern Fault',crownNorth:'Crown · eastern gallery',crownWest:'Crown · western gallery'})[m.id],...polar(m.r,m.a,m.y),'The rock opens to the inhabited cavern.',-Math.cos(m.a*Math.PI/180),-Math.sin(m.a*Math.PI/180));addEdge(m.id,m.outer);if(m.inner)addEdge(m.inner,m.id);}
// 18 houses in five concentrations. Each exterior address gets a real public landing, not an interior portal.
const villaGroups=[['westMouth','Western Grotto',180,60,77,4,['grotto','weaver','grotto','lantern']],['crownWest','Velvet Cliffs',135,76,60,4,['lantern','weaver','lantern','bridge']],['eastMouth','Eastern Fault',0,60,77,3,['conservatory','grotto','conservatory']],['crownNorth','The Crown',45,76,60,3,['lantern','signal','weaver']],['mixedHigh','Mixed galleries',0,44,66,4,['bridge','grotto','bridge','lantern']]];
addNode('mixedHigh','Upper hearth gallery',58,44,30,'Mixed households and shared domestic infrastructure.',-1,0);addEdge('ribbonWalk','mixedHigh');addEdge('mixedHigh','eastMouth');
let vIndex=0;for(const [base,district,angle,y,r,count,kinds] of villaGroups){let prev=base;for(let j=0;j<count;j++){const rad=angle*Math.PI/180,side=[-Math.sin(rad),0,Math.cos(rad)],out=[Math.cos(rad),0,Math.sin(rad)],n=NODES.find(n=>n.id===base);const offset=(j+1)*8.8;const sign=base==='westMouth'||base==='crownNorth'?-1:1;const x=n.x+side[0]*offset*sign,z=n.z+side[2]*offset*sign,yy=y+(j%2)*2.5;let id='villa'+String(++vIndex).padStart(2,'0');addNode(id,district+' · house '+(j+1),x,yy,z,'A closed residential threshold; no interior world yet.',out[0],out[2]);addEdge(prev,id);prev=id;VILLAS.push({id,district,kind:kinds[j],x:x+out[0]*4.8,y:yy,z:z+out[2]*4.8,dx:out[0],dz:out[2],w:5.4,d:5.0,h:4.3,epoch:5+(j%3)});}}
// Existing addresses are immutable. Six public galleries address representative portions of all original rows.
for(const side of [-1,1])for(let tier=0;tier<3;tier++){const y=tier*19+(side>0&&tier>0?-2:0),x=side*(37+tier*12),id='hearth'+(side<0?'W':'E')+tier;addNode(id,(side<0?'Western':'Eastern')+' hearth gallery '+(tier+1),x,y,52,'Public gallery for inherited residences; private doors remain closed.',side,0);}
addEdge('bazaar','hearthW0');addEdge('silkShelf','hearthW1');addEdge('westMouth','hearthW2');addEdge('hearthW1','hearthW2');addEdge('names','hearthE0');addEdge('homes','hearthE1');addEdge('mixedHigh','hearthE2');addEdge('hearthE1','hearthE2');
addNode('overlook','Old arrival overlook',0,30,35,'A projecting terrace with a clear view of the bazaar.',0,-1);addEdge('balcony','overlook');
// Periphery passage class is independent of the original market graph.
function veinEdge(a,b){return /Vein/.test(a)||/Vein/.test(b);}
function roadClass(a,b){return /lostVein/.test(a+b)?'lost':/houseVein/.test(a+b)?'house':/silkVein/.test(a+b)?'silk':/villa|hearth|mixedHigh/.test(a+b)?'residential':'civic';}

const byId=Object.fromEntries(NODES.map(n=>[n.id,n]));
const CLOSED_ROADS=new Set(['names:homeRamp','fortunes:quiet','quays:exit','quiet:homeRamp','homeRamp:homes','silkShelf:ramp1','ribbonWalk:mixedHigh','hearthW1:hearthW2']);
function roadOpen(a,b){return !CLOSED_ROADS.has(a+':'+b)&&!CLOSED_ROADS.has(b+':'+a);}
function neighbors(id){return EDGES.filter(e=>e.includes(id)&&roadOpen(...e)).map(e=>e[0]===id?e[1]:e[0]);}
function route(a,b,forbidden=[]){const ban=new Set(forbidden);if(ban.has(b)||!byId[a]||!byId[b])return null;const q=[[a]],seen=new Set([a]);while(q.length){const p=q.shift(),n=p.at(-1);if(n===b)return p;for(const k of neighbors(n))if(!seen.has(k)&&!ban.has(k)){seen.add(k);q.push([...p,k]);}}return null;}
function edgeLength(a,b){const p=byId[a],q=byId[b];return Math.hypot(p.x-q.x,p.y-q.y,p.z-q.z);}
function rng(seed){let s=seed>>>0;return()=>{s=(Math.imul(s,1664525)+1013904223)>>>0;return s/4294967296;};}
// Generate visible architecture from epochs; fixed circulation is not randomized.
function generate(seed=365){const r=rng(seed),buildings=[];let i=0;for(const side of [-1,1])for(let tier=0;tier<3;tier++)for(let j=0;j<12;j++){const x=side*(47+tier*12+r()*6),z=-64+j*11+r()*3,y=tier*19+(side>0?-2:0);const w=7+r()*5,d=8+r()*4,h=6+r()*7;buildings.push({id:'b'+i++,x,y,z,w,d,h,side,tier,epoch:tier+2,kind:['clinger','stacker','burrower','engulfer'][Math.floor(r()*4)],palette:Math.floor(r()*6),roof:r()>.45,windows:2+Math.floor(r()*3)});}return buildings;}
function addressBook(seed=365){return [...generate(seed).map(b=>({id:b.id,door:[b.x-b.side*(b.w/2+.07),b.y,b.z],district:residentialStyle(b).name,approach:'hearth'+(b.side<0?'W':'E')+b.tier,status:'gallery-only; individual door spur deferred'})),...VILLAS.map(v=>({id:v.id,door:[v.x-v.dx*2.5,v.y,v.z-v.dz*2.5],district:v.district,approach:v.id,status:'public landing; door closed'}))];}
const DISTRICT=['bazaar','cross','names','broken','arts','fortunes','commons','court','quiet','quays'];
const EXITS=['bazaar','court','quiet'];
function beginEncounter(node){if(!DISTRICT.includes(node))return null;const rival=neighbors(node).find(n=>DISTRICT.includes(n)&&!EXITS.includes(n))||neighbors(node)[0];return {player:node,rival,half:null,rivalHalf:null,round:0,outcome:'active',guard:false,pressure:0,purse:'player',trace:[]};}
function blocked(s){if(s.outcome!=='active'||s.half)return null;return neighbors(s.player).find(n=>n===s.rival&&!EXITS.includes(n))||null;}
function choices(s){if(!s||s.outcome!=='active')return [];if(s.half)return ['continue','retreat','leave'];return [...neighbors(s.player).filter(n=>n!==blocked(s)).map(n=>'move:'+n),'guard','leave'];}
function frameRadius(s){return Math.max(1,Math.min(3,(route(s.rival,s.player)?.length||4)-1));}
function rivalTick(s){if(s.outcome!=='active')return;if(s.rivalHalf){if(s.rivalHalf!==s.player&&s.rivalHalf!==s.half?.to)s.rival=s.rivalHalf;s.rivalHalf=null;return;}const p=route(s.rival,s.player);const next=p?.[1];if(next&&next!==s.player&&next!==s.half?.to)s.rivalHalf=next;}
function step(s,action){if(!choices(s).includes(action))return null;const t=JSON.parse(JSON.stringify(s));t.round++;if(action==='leave'){t.half=null;t.outcome='left';t.trace.push('Explicit legal withdrawal.');return t;}if(action==='guard'){t.guard=true;t.trace.push('You secure the fictional purse and wait.');}else if(action==='retreat'){t.half=null;t.trace.push('You return to your anchor.');}else if(action==='continue'){t.player=t.half.to;t.half=null;t.guard=false;t.trace.push('Full anchor transfer: '+t.player);if(EXITS.includes(t.player))t.outcome='evaded';}else{t.half={from:t.player,to:action.slice(5)};t.guard=false;t.trace.push('Half step toward '+t.half.to);}
 rivalTick(t);if(t.outcome==='active'){const close=frameRadius(t)===1;t.pressure=t.guard||!close?0:(t.pressure||0)+1;if(t.pressure>=4){t.half=null;t.outcome='tagged';t.trace.push('The rival reaches practice-tag range. Your fictional purse stays yours.');}}if(t.round>=12&&t.outcome==='active'){t.half=null;t.outcome='left';t.trace.push('Practice frame ends; no loss.');}return t;}
function alternative(s,target){const opts=neighbors(s.player).filter(n=>n!==blocked(s));return opts.sort((a,b)=>(route(a,target)?.length||999)-(route(b,target)?.length||999)||edgeLength(s.player,a)-edgeLength(s.player,b))[0]||null;}

// Residential styling only; never mutate the generated buildings or their dimensions.
const QUARTERS=[
 {id:'carnival',name:'Ribbon terraces',colors:['#8d654c','#936a7c','#79734d','#6b8264'],trim:'#d1ab55',light:'#f1ba6b'},
 {id:'ordinary',name:'Hearth rows',colors:['#a28b70','#8b7c68','#7d8b83','#a69581'],trim:'#c4ab86',light:'#e8c997'},
 {id:'reclaimer',name:'Menders’ ledges',colors:['#805f4b','#68776b','#9b8158','#77645d'],trim:'#bd9461',light:'#e4b477'},
 {id:'storyteller',name:'Painted cloth houses',colors:['#536c83','#8b5751','#a38b5d','#657f7c'],trim:'#cbaa6a',light:'#e7cc85'},
 {id:'masquerade',name:'Velvet galleries',colors:['#74637b','#976779','#947f83','#5c566a'],trim:'#d1a3a7',light:'#edbdcb'},
 {id:'commoner',name:'Oven terraces',colors:['#738164','#9b8a70','#9b6653','#788982'],trim:'#c4ac82',light:'#e8c48a'},
 {id:'quiet',name:'Blue alcoves',colors:['#4e6570','#738587','#77756a','#9a9986'],trim:'#8eaeb0',light:'#afd0cb'},
 {id:'cyberpunk',name:'The little signal house',colors:['#414c55','#50485c'],trim:'#62b6b6',light:'#79d8d7'}];
function residentialStyle(b){let j=Number(b.id.slice(1))%12;let i=b.side<0?(j<3?2:j<6?3:j<9?0:1):(j<3?6:j<5?4:j<8?5:j<10?0:1);if(b.tier===1&&j===7&&b.side>0)i=7;else if((j+b.tier*2)%5===0)i=(i+1+b.tier)%7;let q=QUARTERS[i];return {id:q.id,name:q.name,mixed:(j+b.tier*2)%5===0,wall:q.colors[(b.palette+b.tier)%q.colors.length],trim:q.trim,light:q.light};}
const ROADSIDE=[
 {id:'silkTea',anchor:'silkGate',x:14,y:30,z:65,sign:'SILK GATE TEA',detail:'Mugs and warm provisions for the road.',kind:'mug'},
 {id:'silkBooks',anchor:'silkGate',x:16,y:30,z:58,sign:'THE TRAVELING BOOK',detail:'A little stack of tales from distant worlds.',kind:'books'},
 {id:'shelfBread',anchor:'silkShelf',x:-20,y:26,z:44,sign:'SHELF FLATBREAD',detail:'Hot flatbread on a plate, a rest before the descent.',kind:'pizza'},
 {id:'ribbonShop',anchor:'ribbonWalk',x:36,y:24,z:38,sign:'RIBBON BODEGA',detail:'Everyday goods and a mug for the neighbor.',kind:'mug'},
 {id:'blueBooks',anchor:'blueLanding',x:30,y:13,z:4,sign:'BLUE LANDING BOOKS',detail:'A quiet shelf of used books. No shouted advertisements.',kind:'books'},
 {id:'farewellBread',anchor:'returnCourt',x:18,y:0,z:-53,sign:'FAREWELL OVEN',detail:'A last flatbread before the road.',kind:'pizza'},
 {id:'forkTea',anchor:'returnShelf',x:16,y:0,z:-66,sign:'LANTERN FORK',detail:'Tea, cups and an empty performer’s rug.',kind:'mug'}];
function pathDistance3(p,a,b){let d=[b.x-a.x,b.y-a.y,b.z-a.z],q=[p.x-a.x,p.y-a.y,p.z-a.z],u=Math.max(0,Math.min(1,q.reduce((v,x,i)=>v+x*d[i],0)/(d.reduce((v,x)=>v+x*x,0)||1)));return Math.hypot(...q.map((x,i)=>x-d[i]*u));}


// R0006: immutable anchors; authored switchback profiles, shared with walking and rendering.
const ROUTE_BENDS={
 'balcony:ramp1':[[-6,30,38],[-12,27,28],[-24,24,26],[-28,21,32]],
 'ramp1:ramp2':[[-29,21,39],[-39,17,34],[-39,13,24]],
 'ramp2:bazaar':[[-34,10,16],[-29,6,7],[-22,2,7]],
 'bazaar:broken':[[-12,0,10],[-17,0,-5]],
 'arts:court':[[-18,0,-44],[-12,0,-48]],
 'fortunes:quiet':[[16,0,-27],[20,0,-36]],
 'fortunes:commons':[[11,0,-24],[0,0,-25]],
 'commons:quiet':[[0,0,-40],[12,0,-40]],
 'commons:returnCourt':[[0,0,-42],[8,0,-49]],
 'names:homeRamp':[[27,0,9],[29,3,-5],[31,6,-13]],
 'homeRamp:homes':[[36,8,-7],[38,12,5],[39,16,14]],
 'quiet:homeRamp':[[23,0,-35],[20,2,-27],[26,5,-18],[30,8,-15]],
 'quiet:quays':[[30,0,-49],[34,0,-59],[35,0,-69],[37,0,-72],[40,-1.5,-76],[45,-3.5,-77],[48,-5,-75]],
 'quays:exit':[[48,-5,-76],[43,-3,-80],[33,0,-80],[10,0,-77]],
 'returnShelf:exit':[[8,0,-63],[3,0,-67],[0,0,-70]],
 'homes:blueLanding':[[37,18,15],[34,15,9]],
 'blueLanding:homeRamp':[[35,13,-1],[34,10,-9],[35,8,-11]],
 'homes:homeBridge':[[37,18,25],[25,21,30],[20,24,35]],
 'ribbonWalk:homes':[[38,24,36],[44,20.5,30],[43,19,26]],
 'homeBridge:balcony':[[14,26,38],[6,30,39]],
 'balcony:silkShelf':[[-6,30,46],[-11,28,45]],
 'silkShelf:ramp1':[[-15,26,38],[-17,23,36],[-19,21,36]]
};
Object.assign(ROUTE_BENDS,{
 'ribbonWalk:mixedHigh':[[36,24,45],[44,30,47],[51,37,44],[55,44,36]],
 'mixedHigh:eastMouth':[[59,44,20],[62,50,10],[68,56,1]],
 'westMouth:hearthW2':[[-72,60,-5],[-62,54,5],[-61,46,28],[-61,38,45]],
 'hearthW1:hearthW2':[[-43,19,52],[-42,26,43],[-46,34,47],[-50,38,52]],
 'silkShelf:hearthW1':[[-15,26,49],[-25,23,55],[-37,19,57]],
 'bazaar:hearthW0':[[-18,0,30],[-24,0,42],[-32,0,50]],
 'names:hearthE0':[[29,0,28],[34,0,42]],
 'homes:hearthE1':[[39,18,23],[39,18,34],[42,17,46]],
 'mixedHigh:hearthE2':[[53,44,34],[51,40,45],[55,36,52]],
 'hearthE1:hearthE2':[[49,17,59],[55,23,65],[61,30,65],[61,36,59]]
});
for(const i of [1,3,5,7]){const a=sectors[i]+11;ROUTE_BENDS['silkVein'+i+':lostVein'+i]=[polar(174,a-10,38),polar(184,a-7,44)];ROUTE_BENDS['lostVein'+i+':houseVein'+i]=[polar(184,a+9,44),polar(172,a+13,58)];}
const xyz=n=>[n.x,n.y,n.z];
function edgePath(a,b){const direct=ROUTE_BENDS[a+':'+b],reverse=ROUTE_BENDS[b+':'+a];const raw=[xyz(byId[a]),...(direct||(reverse?[...reverse].reverse():[])),xyz(byId[b])]; // flatten the approaches to shared landings; grade starts beyond the junction
 const out=[raw[0]];for(let i=1;i<raw.length;i++){let p=raw[i-1],q=raw[i],L=Math.hypot(q[0]-p[0],q[2]-p[2]);if(Math.abs(p[1]-q[1])>.001&&L>4){const f=Math.min(.32,(veinEdge(a,b)?9:3.2)/L);if(i===1)out.push([p[0]+(q[0]-p[0])*f,p[1],p[2]+(q[2]-p[2])*f]);if(i===raw.length-1)out.push([q[0]+(p[0]-q[0])*f,q[1],q[2]+(p[2]-q[2])*f]);}out.push(q);}return out;}
function pathLength(path){return path.slice(1).reduce((s,p,i)=>s+Math.hypot(...p.map((v,k)=>v-path[i][k])),0);}
function pathPoint(path,t){let left=Math.max(0,Math.min(1,t))*pathLength(path);for(let i=1;i<path.length;i++){const a=path[i-1],b=path[i],len=Math.hypot(...b.map((v,k)=>v-a[k]));if(left<=len||i===path.length-1){const u=Math.min(1,left/(len||1));return a.map((v,k)=>v+(b[k]-v)*u);}left-=len;}return path.at(-1).slice();}
function walkingPoint(a,b,t){return pathPoint(edgePath(a,b),t).map((v,i)=>v+(i===1?1.7:0));}
function routeMarker(a,b){const path=edgePath(a,b),len=pathLength(path);return pathPoint(path,Math.min(.70,6.5/len));}
function routeFacing(a,b,yaw){const p=xyz(byId[a]),q=routeMarker(a,b),dx=q[0]-p[0],dz=q[2]-p[2],l=Math.hypot(dx,dz)||1;return (dx*Math.sin(yaw)-dz*Math.cos(yaw))/l;}
function routeCandidates(a,yaw,back=false){return neighbors(a).map(id=>({id,score:routeFacing(a,id,yaw)*(back?-1:1)})).filter(x=>x.score>.18).sort((a,b)=>b.score-a.score).map(x=>x.id);}
function isRaised(a,b){return veinEdge(a,b)||a==='overlook'||b==='overlook'||[a,b].some(x=>/villa|hearth|mixedHigh|Mouth|crown/.test(x))||byId[a].y!==0||byId[b].y!==0||[a,b].some(x=>['exit','returnCourt','returnShelf'].includes(x));}
function deckWidth(a,b){if(veinEdge(a,b))return roadClass(a,b)==='silk'?5.2:3.6;if(roadClass(a,b)==='residential')return 3.2;return [a,b].some(x=>['ramp1','ramp2','homeRamp','homeBridge','balcony','lantern','entry'].includes(x))?6:5.5;}
const DECK_SEGMENTS=EDGES.flatMap(([a,b])=>isRaised(a,b)&&roadOpen(a,b)?edgePath(a,b).slice(1).map((q,i)=>({a,b,p:edgePath(a,b)[i],q,w:deckWidth(a,b)})):[]);
function segmentDistance(p,a,b){return pathDistance3({x:p[0],y:p[1],z:p[2]},{x:a[0],y:a[1],z:a[2]},{x:b[0],y:b[1],z:b[2]});}
function railSections(seg){const {p,q,w}=seg,dx=q[0]-p[0],dz=q[2]-p[2],L=Math.hypot(dx,dz),side=[-dz/L,0,dx/L],count=Math.ceil(L/2),out=[];for(const sign of [-1,1])for(let i=0;i<count;i++){const at=t=>p.map((v,k)=>v+(q[k]-v)*t+side[k]*sign*(w/2-.14));const a=at(i/count),b=at((i+1)/count);const samples=[a,a.map((v,k)=>(v+b[k])/2),b];if(samples.some(x=>DECK_SEGMENTS.some(s=>s!==seg&&segmentDistance(x,s.p,s.q)<s.w/2+.40)))continue;out.push([a,b]);}return out;}

if(typeof module!=='undefined')module.exports={addressBook,VEIN_MOUTHS,VEINS,VILLAS,ORIGINAL_EDGE_COUNT,veinEdge,roadClass,NODES,EDGES,byId,neighbors,route,edgeLength,rng,generate,DISTRICT,EXITS,beginEncounter,blocked,choices,step,alternative,frameRadius,QUARTERS,residentialStyle,ROADSIDE,pathDistance3,edgePath,pathLength,pathPoint,walkingPoint,routeMarker,routeFacing,routeCandidates,isRaised,deckWidth,DECK_SEGMENTS,railSections,roadOpen,CLOSED_ROADS};
