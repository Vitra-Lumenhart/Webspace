import assert from 'node:assert/strict';
import {HUMAN,HALL,STAIR,OPEN_CELL,NODES,PLANNED_ASSETS,addresses,routes,routeLength,sampleRoute,routeById,reachable,stairHeadroom,publicArrival,destinationFor,DISTRICTS,EPOCHS} from './spatial-contract.mjs';
let checks=0;
const ok=(v,msg)=>{assert.ok(v,msg);checks++};
const d=addresses();ok(d.length===138,'46 bays × 3 tiers');ok(new Set(d.map(x=>x.id)).size===138,'unique addresses');ok(d.every(x=>x.leaf==='flat'),'no curved leaves');ok(d.filter(x=>x.state==='open').length===1,'one open cell');ok(d.find(x=>x.id===OPEN_CELL).tier===1,'open upper cell');ok(destinationFor(OPEN_CELL).kind==='local-room','local threshold, not portal');ok(d.filter(x=>x.id!==OPEN_CELL).every(x=>destinationFor(x.id)===null),'all closed doors inert');
ok(reachable('gate','cell')&&reachable('cell','gate'),'return path');ok(reachable('gate','hearing'),'old spine remains in topology; narrative gate is runtime-owned');
ok(STAIR.rise/STAIR.risers<=HUMAN.stepUp,'riser capability');ok(stairHeadroom()>=HUMAN.height+HUMAN.margin,'off-axis head clearance');ok(PLANNED_ASSETS.stairCanopy.clearWidth>=2*(HUMAN.radius+HUMAN.margin),'lateral clearance');ok(PLANNED_ASSETS.openBay.clearWidth>=2*(HUMAN.radius+HUMAN.margin),'door clearance');ok(PLANNED_ASSETS.openBay.clearHeight>HUMAN.height+HUMAN.margin,'door headroom');ok(PLANNED_ASSETS.galleryScreen.upperY-PLANNED_ASSETS.galleryScreen.lowerY>5.9,'full gallery screen');
ok(stairHeadroom(HUMAN.radius+HUMAN.margin)>=2.40,'adult headroom incl lateral margin and worst tread');
ok(stairHeadroom(0)>=2.70,'center tread clearance');
ok(STAIR.spring>=2.20&&STAIR.segments===12,'tall upright profile');
let samples=0;for(const r of routes()){const rev=routeById(r.id,true);ok(JSON.stringify(r.points[0])===JSON.stringify(NODES[r.a]),'edge start');ok(JSON.stringify(r.points.at(-1))===JSON.stringify(NODES[r.b]),'edge end');ok(Math.abs(routeLength(r.points)-routeLength(rev.points))<1e-8,'reversible cost');const pts=sampleRoute(r.points);samples+=pts.length;ok(pts.every(p=>p.every(Number.isFinite)),'finite samples');for(let i=1;i<pts.length;i++)ok(Math.hypot(...pts[i].map((x,j)=>x-pts[i-1][j]))<=.150001,'sample spacing');}
ok(DISTRICTS.length===5&&EPOCHS.length===5,'district and epoch registries');
ok(publicArrival('kilmainham-intake').node==='gate','known public entry');ok(publicArrival('private-token')===null,'unknown arrival rejected');
console.log(JSON.stringify({checks,samples,addresses:d.length,open:OPEN_CELL,headroomAtBodyEdge:stairHeadroom(),routeMeters:routes().map(r=>[r.id,+routeLength(r.points).toFixed(3)]),limitations:'Analytic proposed dimensions and route centerlines only; no rendered support, sweep collision, Choir integration or browser tests.'},null,2));
