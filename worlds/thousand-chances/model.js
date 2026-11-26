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
 ['quays','Blackwater Quays',55,-5,-60,-1,0,'Cargo, water and a disputed maker’s mark.'],
 ['homeRamp','Residential ramp',42,8,-13,-1,0,'Homes and workshops share heat.'],
 ['homes','Houses Above the Market',43,18,21,-1,-1,'Lit windows, laundry and a garden.'],
 ['homeBridge','Upper residential bridge',20,24,40,-1,-1,'A bridge joins the upper terraces.'],
 ['exit','The Return Tube',0,0,-75,0,1,'An independent, clearly marked return.']
].map(([id,name,x,y,z,dx,dz,desc])=>({id,name,x,y,z,dx,dz,desc}));
const EDGES=[['entry','lantern'],['lantern','balcony'],['balcony','ramp1'],['ramp1','ramp2'],['ramp2','bazaar'],['bazaar','cross'],['bazaar','broken'],['cross','names'],['cross','broken'],['cross','fortunes'],['cross','commons'],['names','fortunes'],['names','homeRamp'],['broken','arts'],['arts','commons'],['arts','court'],['fortunes','commons'],['fortunes','quiet'],['commons','court'],['commons','quiet'],['court','exit'],['quiet','quays'],['quays','exit'],['quiet','homeRamp'],['homeRamp','homes'],['homes','homeBridge'],['homeBridge','balcony']];
const byId=Object.fromEntries(NODES.map(n=>[n.id,n]));
function neighbors(id){return EDGES.filter(e=>e.includes(id)).map(e=>e[0]===id?e[1]:e[0]);}
function route(a,b,forbidden=[]){const ban=new Set(forbidden);if(ban.has(b)||!byId[a]||!byId[b])return null;const q=[[a]],seen=new Set([a]);while(q.length){const p=q.shift(),n=p.at(-1);if(n===b)return p;for(const k of neighbors(n))if(!seen.has(k)&&!ban.has(k)){seen.add(k);q.push([...p,k]);}}return null;}
function edgeLength(a,b){const p=byId[a],q=byId[b];return Math.hypot(p.x-q.x,p.y-q.y,p.z-q.z);}
function rng(seed){let s=seed>>>0;return()=>{s=(Math.imul(s,1664525)+1013904223)>>>0;return s/4294967296;};}
// Generate visible architecture from epochs; fixed circulation is not randomized.
function generate(seed=365){const r=rng(seed),buildings=[];let i=0;for(const side of [-1,1])for(let tier=0;tier<3;tier++)for(let j=0;j<12;j++){const x=side*(47+tier*12+r()*6),z=-64+j*11+r()*3,y=tier*19+(side>0?-2:0);const w=7+r()*5,d=8+r()*4,h=6+r()*7;buildings.push({id:'b'+i++,x,y,z,w,d,h,side,tier,epoch:tier+2,kind:['clinger','stacker','burrower','engulfer'][Math.floor(r()*4)],palette:Math.floor(r()*6),roof:r()>.45,windows:2+Math.floor(r()*3)});}return buildings;}
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
if(typeof module!=='undefined')module.exports={NODES,EDGES,byId,neighbors,route,edgeLength,rng,generate,DISTRICT,EXITS,beginEncounter,blocked,choices,step,alternative,frameRadius};
