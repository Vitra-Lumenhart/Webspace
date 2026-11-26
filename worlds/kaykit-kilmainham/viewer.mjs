import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const $ = id => document.getElementById(id);
const payload = JSON.parse($('asset-data').textContent);
const canvas = $('view'), status = $('status');
const scene = new THREE.Scene(); scene.background = new THREE.Color(0x161e28);
const camera = new THREE.PerspectiveCamera(53, 1, .04, 240);
const loader = new GLTFLoader(); const bank = new Map();
const groups = new THREE.Group(); scene.add(groups);
scene.add(new THREE.HemisphereLight(0xe4eeff, 0x544239, 2.1));
const sun = new THREE.DirectionalLight(0xffecd4, 3.0); sun.position.set(-12,24,8); scene.add(sun);
const fill = new THREE.DirectionalLight(0xa8c8ff, .9); fill.position.set(16,8,-12); scene.add(fill);
let renderer, orbit, selected, current = 'hall', spinning = false;
const grid = new THREE.GridHelper(56,28,0x576b7e,0x333f4f); grid.position.y=-.13; scene.add(grid);
const setStatus = s => status.textContent = s;
const names = Object.keys(payload.models);
function clear(){groups.clear(); selected=null;}
function place(id,x=0,y=0,z=0,rot=0){
  const model=bank.get(id); if(!model) throw Error('Missing asset '+id);
  const o=model.clone(true); o.position.set(x,y,z); o.rotation.y=rot; groups.add(o);return o;
}
function look(p,t){camera.position.set(...p); orbit.target.set(...t); orbit.update();}
function focus(o){const box=new THREE.Box3().setFromObject(o); const size=box.getSize(new THREE.Vector3()), center=box.getCenter(new THREE.Vector3()); const d=Math.max(size.x,size.y,size.z)*1.8; look([center.x+d,center.y+d*.65,center.z+d],[center.x,center.y,center.z]); $('details').textContent=`Native bounds: ${size.toArray().map(x=>x.toFixed(2)).join(' × ')} units · no geometry rescaling`;}
const stone = new THREE.MeshStandardMaterial({color:0x777a78,roughness: .9});
const iron = new THREE.MeshStandardMaterial({color:0x313c41,roughness:.62,metalness:.4});
function block(w,h,d,x,y,z,mat){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);groups.add(m);return m;}
function hall(){clear(); current='hall';grid.visible=false;
  // Actual 4×4 tiles and 4-unit wall modules, Y-up. 3 tiers, gallery decks at 4 and 8.
  for(let x=-8;x<=8;x+=4)for(let z=-12;z<=12;z+=4)place('floor_tile_large',x,0,z);
  for(let level=0;level<3;level++)for(const side of [-1,1]){
    const y=level*4; for(let z=-12;z<=12;z+=4)place(z%8===0?'wall_doorway':'wall_gated',side*10,y,z,side*Math.PI/2);
    if(level>0){for(let z=-12;z<=12;z+=4)place('floor_tile_large',side*8,y,z);
      block(.13,.12,28,side*6,y+1.1,0,iron);for(let z=-14;z<=14;z+=2)block(.09,1.1,.09,side*6,y+.55,z,iron);
    }
  }
  for(let y=0;y<12;y+=4)for(let x=-8;x<=8;x+=4){place(x===0?'wall_arched':'wall',x,y,-14);place(x===0?'wall_doorway':'wall',x,y,14,Math.PI);}
  // Provisional stair placement: original staircase rises 5.1 units; not yet connected to 4-unit decks.
  place('stairs_long',0,0,-12);
  // Clearly provisional non-KayKit skylight frame, open to overhead lighting.
  for(let z=-14;z<=14;z+=4){for(const side of [-1,1]){const rib=block(.15, .17,Math.sqrt(10*10+3*3),side*5,13.5,z,iron);rib.rotation.order='YXZ';rib.rotation.y=Math.PI/2;rib.rotation.x=side*Math.atan2(3,10);}}
  block(.18,.18,28,0,15,0,iron);
  look([0,2.0,11],[0,5,-5]);$('details').textContent='East Wing study · 3 tiers · 4-unit native grid · 5.1-unit stairs are not yet aligned to galleries · procedural rails and roof frame.';
}
function inspect(id){clear();current=id;grid.visible=true;selected=place(id);focus(selected);}
function overview(){hall();look([24,19,31],[0,5,0]);}
function controls(){
  $('hall').onclick=hall;$('overview').onclick=overview;$('gallery').onclick=()=>{hall();look([7,9.65,10],[0,6,-4]);};
  $('spin').onclick=()=>{spinning=!spinning;orbit.autoRotate=spinning;$('spin').textContent=spinning?'Stop orbit':'Auto orbit';};
  $('reset').onclick=()=>current==='hall'?hall():inspect(current);
  $('wire').onchange=e=>{for(const o of bank.values())o.traverse(m=>{if(m.isMesh){for(const mat of Array.isArray(m.material)?m.material:[m.material])mat.wireframe=e.target.checked;}});};
  $('grid').onchange=e=>grid.visible=e.target.checked;
  $('filter').oninput=e=>{for(const b of $('catalog').children)b.hidden=!b.textContent.toLowerCase().includes(e.target.value.toLowerCase());};
  for(const id of names){const b=document.createElement('button');b.textContent=id.replaceAll('_',' ');b.onclick=()=>inspect(id);$('catalog').append(b);}
}
async function boot(){
  try {renderer=new THREE.WebGLRenderer({canvas,antialias:true});}catch(e){setStatus('WebGL2 unavailable: '+e.message);return;}
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1;
  orbit=new OrbitControls(camera,canvas);orbit.enableDamping=true;orbit.minDistance=.25;orbit.maxDistance=120;
  let done=0;
  for(const id of names){const data=structuredClone(payload.models[id].gltf);for(const b of data.buffers)b.uri=payload.buffers[b.uri];for(const image of data.images)image.uri=payload.images[image.uri];const gltf=await loader.parseAsync(JSON.stringify(data),'');bank.set(id,gltf.scene);setStatus(`Loaded ${++done}/${names.length} original glTF assets`);}
  controls();hall();setStatus(`Three.js r${THREE.REVISION} · ${bank.size} native glTF assets · WebGL2 active`);
  const resize=()=>{const w=canvas.clientWidth,h=canvas.clientHeight;if(w&&h){renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();}};
  new ResizeObserver(resize).observe(canvas);resize();renderer.setAnimationLoop(()=>{orbit.update();renderer.render(scene,camera);});
  window.KayKitLab={revision:THREE.REVISION,assetCount:bank.size,renderer,scene,bank,inspect,hall};
}
boot().catch(e=>{console.error(e);setStatus('Asset startup failed: '+e.message);});
