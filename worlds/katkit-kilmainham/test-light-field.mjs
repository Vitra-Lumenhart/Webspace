import assert from 'node:assert/strict';
import {CLOUD,ELECTRIC,cloudBake,electricBake,skyState,wrap,budget} from './light-field-bake.mjs';
let checks=0;function ok(v,m){assert.ok(v,m);checks++}
const a=cloudBake(),b=cloudBake();ok(a.volume.length===131072,'3D density size');ok(a.atlas.length===69696,'padded optical atlas size');ok(a.volume.every((v,i)=>v===b.volume[i]),'determinism');
const at=(k,x,z)=>a.atlas[(Math.floor(k/4)*66+z+1)*264+(k%4)*66+x+1];
for(let k=0;k<16;k++)for(let i=0;i<64;i++){ok(at(k,-1,i)===at(k,63,i),'X left gutter');ok(at(k,64,i)===at(k,0,i),'X right gutter');ok(at(k,i,-1)===at(k,i,63),'Z low gutter');ok(at(k,i,64)===at(k,i,0),'Z high gutter');}
let min=255,max=0;for(let z=0;z<64;z++)for(let x=0;x<64;x++){min=Math.min(min,at(15,x,z));max=Math.max(max,at(15,x,z));for(let k=1;k<16;k++)ok(at(k,x,z)<=at(k-1,x,z),'optical depth monotonic');}
ok(max-min>30,'spatial variation');
const e=electricBake([[6,5.8,0],[-6,12.1,-10]]);ok(e.length===73728,'electric volume size');ok(e.some(v=>v>20)&&e.some(v=>v===0),'localized electric response');
ok(skyState(0,'day').electric===0,'day off');ok(skyState(0,'twilight').electric===1,'dusk on');ok(skyState(0,'storm').flash===0,'storm quiet');ok(skyState(15.3,'storm').flash>.9,'lightning pulse');ok(skyState(15.3,'storm',true).flash<=.18,'gentle amplitude');ok(skyState(18,'storm').flash===0,'no strobing');
ok(wrap(-1,64)===63&&wrap(64,64)===0,'wrap');ok(budget()<300000,'field source budget');
console.log(JSON.stringify({checks,sourceBytes:budget(),runtimeBytes:budget()+200*392,cloudMin:min,cloudMax:max,electricPeak:Math.max(...e)}));
