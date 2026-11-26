import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {rise,stairs,spawn,step,speed} from './layout.mjs';
const $=id=>document.getElementById(id),canvas=$('view'),status=$('status');
const scene=new THREE.Scene();scene.background=new THREE.Color(0x647b91);scene.fog=new THREE.Fog(0x647b91,32,75);
const camera=new THREE.PerspectiveCamera(65,1,.06,100),bank=new Map(),root=new THREE.Group();scene.add(root);
scene.add(new THREE.HemisphereLight(0xdceeff,0x67584b,2.2));
const sun=new THREE.DirectionalLight(0xffe6c0,2.7);sun.position.set(-4,18,5);scene.add(sun);
const iron=new THREE.MeshStandardMaterial({color:0x29333b,metalness:.45,roughness:.65}),stone=new THREE.MeshStandardMaterial({color:0x77716b,roughness:.9});
let renderer,p={...spawn},yaw=0,pitch=0,ready=false,last=0,found=new Set(),won=false;
const keys=new Set(),loader=new GLTFLoader(),markers=[];
function place(id,x,y,z,rot=0){const o=bank.get(id).clone(true);o.position.set(x,y,z);o.rotation.y=rot;root.add(o);return o;}
function block(w,h,d,x,y,z,mat=stone){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);o.position.set(x,y,z);root.add(o);return o;}
function rail(x,y,z,w,d){block(w,.10,d,x,y+1,z,iron);if(w>d){for(let a=-w/2;a<=w/2;a+=1.4)block(.07,1,.07,x+a,y+.5,z,iron);}else{for(let a=-d/2;a<=d/2;a+=1.4)block(.07,1,.07,x,y+.5,z+a,iron);}}
function build(){
 for(let x=-8;x<=8;x+=4)for(let z=-12;z<=12;z+=4)place('floor_tile_large',x,0,z);
 for(let k=0;k<3;k++){let y=k*rise;for(let side of [-1,1]){for(let z=-12;z<=12;z+=4)place(z%8===0?'wall_doorway':'wall_gated',side*10,y,z,side*Math.PI/2);
 if(k){for(let z=-12;z<=12;z+=4)place('floor_tile_large',side*8,y,z);rail(side*6,y,-6,.1,8);rail(side*6,y,6,.1,8);}}
 for(let x=-8;x<=8;x+=4){place(x===0?'wall_arched':'wall',x,y,-14);place('wall',x,y,14,Math.PI);}
 if(k){for(let z of [-12,12]){for(let x=-4;x<=4;x+=4)place('floor_tile_large',x,y,z);rail(0,y,z<0?-10:10,10,.1);}}
 }
 // Actual traversable bridge and stepped stairs; procedural dimensions match collision ramp.
 block(12,.25,2.4,0,3.875,0);
 for(const s of stairs){for(let i=0;i<20;i++){const top=s.base+(i+1)*.2;block(2,.2,.5,s.x,top-.1,s.z0+i*.5+.25);}}
 // Native original staircase remains an architectural furnishing outside the playable path.
 // Skylight ribs are procedural, modeled separately from collision.
 for(let z=-14;z<=14;z+=4)for(let side of [-1,1]){const r=block(10.45,.15,.16,side*5,13.5,z,iron);r.rotation.z=side<0?Math.atan2(3,10):-Math.atan2(3,10);}
 block(.15,.15,28,0,15,0,iron);
 for(const [id,x,y,z,label] of [['witness',0,0,-12,'Witness seal'],['record',-8,4,-6,'Archive seal'],['pardon',8,8,12,'Pardon seal']]){
  const o=place('wand_A',x,y+.8,z);const glow=new THREE.PointLight(0xffb64e,12,5);glow.position.set(x,y+1,z);root.add(glow);markers.push({id,x,y,z,label,o,glow});}
}
function reset(){p={...spawn};yaw=0;pitch=0;found.clear();won=false;for(const m of markers){m.o.visible=true;m.glow.visible=true;}status.textContent='Find the three seals in the court and galleries.';}
function interact(){if(!ready)return;const m=markers.find(m=>!found.has(m.id)&&Math.hypot(p.x-m.x,p.z-m.z)<1.9&&Math.abs(p.y-m.y)<.65);if(m){found.add(m.id);m.o.visible=false;m.glow.visible=false;status.textContent=m.label+' recovered. '+found.size+'/3';}else if(found.size===3&&Math.hypot(p.x,p.z-10)<2&&p.y<.5){won=true;status.textContent='The common pardon is complete. You may continue exploring or begin again.';}else status.textContent=found.size===3?'Return to the entrance to complete the pardon.':'Move closer to a glowing seal.';}
function draw(t){const dt=Math.min(.045,(t-last)/1000||0);last=t;if(ready){if(keys.has('arrowleft'))yaw+=dt*1.7;if(keys.has('arrowright'))yaw-=dt*1.7;let f=(keys.has('w')||keys.has('arrowup')?1:0)-(keys.has('s')||keys.has('arrowdown')?1:0),r=(keys.has('d')?1:0)-(keys.has('a')?1:0);const len=Math.hypot(f,r)||1;f/=len;r/=len;p=step(p,(-Math.sin(yaw)*f+Math.cos(yaw)*r)*speed*dt,(-Math.cos(yaw)*f-Math.sin(yaw)*r)*speed*dt);camera.position.set(p.x,p.y+1.65,p.z);camera.rotation.order='YXZ';camera.rotation.set(pitch,yaw,0);for(const m of markers)m.o.rotation.y+=dt*.9;$('count').textContent=found.size+'/3 seals · '+(p.y<.5?'Court':p.y<4.5?'First gallery':'Upper gallery');renderer.render(scene,camera);}}
async function boot(){try{renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;
const payload=await fetch('./asset-data.json').then(r=>{if(!r.ok)throw Error('Asset bank HTTP '+r.status);return r.json();});
for(const [id,model] of Object.entries(payload.models)){const g=structuredClone(model.gltf);for(const b of g.buffers)b.uri=payload.buffers[b.uri];for(const i of g.images)i.uri=payload.images[i.uri];bank.set(id,(await loader.parseAsync(JSON.stringify(g),'')).scene);}
build();const resize=()=>{renderer.setSize(canvas.clientWidth,canvas.clientHeight,false);camera.aspect=canvas.clientWidth/Math.max(1,canvas.clientHeight);camera.updateProjectionMatrix();};new ResizeObserver(resize).observe(canvas);resize();ready=true;reset();renderer.setAnimationLoop(draw);
window.Kilmainham={get state(){return {...p,seals:found.size,won};},get assetCount(){return bank.size;},get renderer(){return renderer;}};
}catch(e){status.textContent='Unable to start the 3D world: '+e.message;console.error(e);}}
addEventListener('keydown',e=>{const k=e.key.toLowerCase();if(['w','a','s','d','arrowup','arrowdown','arrowleft','arrowright','e'].includes(k)){e.preventDefault();keys.add(k);if(k==='e'&&!e.repeat)interact();}});addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));addEventListener('blur',()=>keys.clear());
let drag=null;canvas.addEventListener('pointerdown',e=>{drag={x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);});canvas.addEventListener('pointermove',e=>{if(!drag)return;yaw-=(e.clientX-drag.x)*.004;pitch=THREE.MathUtils.clamp(pitch-(e.clientY-drag.y)*.004,-1.25,1.25);drag={x:e.clientX,y:e.clientY};});for(const event of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(event,()=>drag=null);
$('use').onclick=interact;$('reset').onclick=()=>{if(ready)reset();};for(const b of document.querySelectorAll('[data-key]')){const k=b.dataset.key;b.addEventListener('pointerdown',e=>{e.preventDefault();b.setPointerCapture(e.pointerId);keys.add(k);});for(const event of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(event,()=>keys.delete(k));}boot();
