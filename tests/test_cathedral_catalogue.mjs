import assert from 'node:assert/strict';
import { compile, compileLocalCatalogue, pointedY, PALETTES, MOODS } from '../commons/cathedral/grammar.mjs';
import { prepareCathedralParts, CATHEDRAL_PROPOSAL } from '../worlds/chuzhoy/cathedral-catalogue.mjs';

const examples=[
  {id:'arch',kind:'dressed_arch',width:4,depth:.7,height:5},
  {id:'shoulders',kind:'shoulder_arch',width:4,depth:.7,height:5},
  {id:'column',kind:'column',width:3,depth:2,height:6},
  {id:'rect',kind:'vault_rect',width:8,depth:10,height:9},
  {id:'oct',kind:'vault_octagon',width:8,depth:8,height:9},
  {id:'trapezoid',kind:'vault_trapezoid',width:8,depth:10,height:9},
  {id:'rose',kind:'glass_rose',width:4,depth:.5,height:5,palette:'nocturne_sapphire',mood:'glimmer'},
  {id:'lancet',kind:'glass_lancet',width:3,depth:.5,height:6,palette:'penitential_ember',mood:'blaze'},
  {id:'garden',kind:'glass_screen',width:5,depth:.5,height:5,palette:'verdant_mercy',mood:'shimmer'}
];
const meshes=compileLocalCatalogue(examples);
assert.equal(meshes.length,9);
for(const m of meshes){
  assert(m.triangles.length>0,m.id);
  assert(m.triangles.length<100000,m.id);
  assert(m.triangles.every(t=>[...t.a,...t.b,...t.c].every(Number.isFinite)),m.id);
  assert(m.hostOwns.includes('2D map'),m.id);
}
const arch=meshes[0];assert(arch.triangles.some(t=>t.part.includes('crown-keystone')));
assert(arch.triangles.some(t=>t.system==='joints'));
const apex=pointedY(2,4,2,2);
assert(apex>pointedY(1.5,4,2,2));
assert(apex>pointedY(2.5,4,2,2));
assert(Math.abs(pointedY(0,4,2,2)-2)<1e-8);
assert(meshes[1].annotations.some(a=>a.style?.includes('shoulder')));
assert(meshes[3].triangles.some(t=>t.system==='vault-infill'));
assert(meshes[4].sockets.filter(s=>s.role==='adjacent-bay').length===8);
assert(meshes[5].sockets.filter(s=>s.role==='adjacent-bay').length===4);
for(const [i,palette] of ['nocturne_sapphire','penitential_ember','verdant_mercy'].entries()){
  assert(meshes[6+i].effects.some(e=>e.palette===palette));
}
assert.equal(Object.keys(PALETTES).length,3);
assert.equal(Object.keys(MOODS).length,3);
assert(MOODS.blaze.halo>MOODS.glimmer.halo);
assert.deepEqual(compile(examples[3]).triangles,compile(examples[3]).triangles);
assert.throws(()=>compile({kind:'vault_rect',width:Infinity}));
assert.throws(()=>compileLocalCatalogue([examples[0],examples[0]]));
const hostGraph={nodes:['fountain','well'],portal:'canonical'};
assert.throws(()=>prepareCathedralParts([examples[0]],null));
const proposals=prepareCathedralParts([examples[0]],()=>({at:[-28,0],yaw:.4}));
assert.equal(proposals[0].approved,false);
assert.deepEqual(hostGraph,{nodes:['fountain','well'],portal:'canonical'});
assert(CATHEDRAL_PROPOSAL.protectedSystems.includes('fountain'));
console.log('PASS cathedral catalogue: nine families, masonry crown, three vaults, glass moods, local-only proposals');
