import * as THREE from 'three';
import {CLOUD,ELECTRIC,cloudBake,electricBake,skyState,budget} from './light-field-bake.mjs';
const params=new URLSearchParams(location.search);
export function mountLightFields({scene,renderer,sun,ambient,fixtures,lamps,lampGlow}){
 const safe=params.has('safe'),gentle=matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(safe)return {update(){},attach(){},mode:'safe'};
 const c=cloudBake(),e=electricBake(fixtures),g=ELECTRIC,ew=g.x+2,eh=g.z+2;
 const atlas=new Uint8Array(ew*4*eh*4);
 for(let y=0;y<g.y;y++)for(let z=-1;z<=g.z;z++)for(let x=-1;x<=g.x;x++){
  const sx=Math.max(0,Math.min(g.x-1,x)),sz=Math.max(0,Math.min(g.z-1,z));
  atlas[(Math.floor(y/4)*eh+z+1)*ew*4+(y%4)*ew+x+1]=e[(y*g.z+sz)*g.x+sx];
 }
 function tex(data,w,h){const t=new THREE.DataTexture(data,w,h,THREE.RedFormat,THREE.UnsignedByteType);t.minFilter=t.magFilter=THREE.LinearFilter;t.generateMipmaps=false;t.needsUpdate=true;return t;}
 const cloud=tex(c.atlas,c.width,c.height),electric=tex(atlas,ew*4,eh*4);
 const uniforms={fCloud:{value:cloud},fElectric:{value:electric},fDrift:{value:new THREE.Vector2()},fDepth:{value:2},fOn:{value:0},fFlash:{value:0},fSunDir:{value:sun.position.clone().sub(sun.target.position).normalize()}};
 const done=new WeakSet();let mode=params.get('sky')||'cycle',start=null,nowState=null,lastThunder=-1,audio=null,noise=null;
 if(!['day','cycle','twilight','storm'].includes(mode))mode='cycle';
 function attach(m){if(!m?.isMeshStandardMaterial||done.has(m)||m.transparent)return;done.add(m);m.userData.lightFields=true;
 const before=m.onBeforeCompile,cache=m.customProgramCacheKey.bind(m);
 m.onBeforeCompile=function(shader,render){before.call(this,shader,render);Object.assign(shader.uniforms,uniforms);
 shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 fWorld;').replace('#include <project_vertex>',`#include <project_vertex>
 vec4 fp=vec4(transformed,1.);
 #ifdef USE_INSTANCING
 fp=instanceMatrix*fp;
 #endif
 fWorld=(modelMatrix*fp).xyz;`);
 shader.fragmentShader=shader.fragmentShader.replace('#include <common>',`#include <common>
 varying vec3 fWorld;
 uniform sampler2D fCloud,fElectric;
 uniform vec2 fDrift;
 uniform float fDepth,fOn,fFlash;
 uniform vec3 fSunDir;
 float fTile(sampler2D t,vec2 p,float k,vec2 dim){
 vec2 cell=vec2(mod(k,4.),floor(k/4.));vec2 size=dim+2.;
 return texture2D(t,(cell*size+1.5+p*(dim-1.))/(size*4.)).r;}
 float fLayers(sampler2D t,vec2 p,float k,vec2 dim){float a=floor(clamp(k,0.,15.));return mix(fTile(t,p,a,dim),fTile(t,p,min(a+1.,15.),dim),fract(k));}
 `).replace('#include <lights_fragment_end>',`#include <lights_fragment_end>
 // Project receiver back towards the roof plane along the same shadow-map direction.
 vec2 aperture=fWorld.xz+fSunDir.xz/max(.1,fSunDir.y)*(21.0-fWorld.y);
 vec2 coord=fract((aperture+fDrift)/vec2(64.,96.));
 // Repeat interpolation across periodic texel centers (padded wrap gutters).
 vec2 cell=coord*64.-.5;
 float layer=clamp(fDepth,0.,15.);float a=floor(layer);
 vec2 off0=vec2(mod(a,4.),floor(a/4.))*66.;
 float b=min(a+1.,15.);vec2 off1=vec2(mod(b,4.),floor(b/4.))*66.;
 float trans=mix(texture2D(fCloud,(off0+1.5+cell)/264.).r,texture2D(fCloud,(off1+1.5+cell)/264.).r,fract(layer));
 trans=mix(.12+.88*trans,1.,fFlash);
 reflectedLight.directDiffuse*=trans;
 reflectedLight.directSpecular*=trans;
 vec3 ep=clamp((fWorld-vec3(-9.,0.,-28.))/vec3(18.,21.5,52.),0.,1.);
 float warmth=fLayers(fElectric,ep.xz,ep.y*15.,vec2(48.,96.))*fOn;
 reflectedLight.indirectDiffuse+=diffuseColor.rgb*vec3(1.,.55,.24)*warmth*1.25;
 `);
 };m.customProgramCacheKey=()=>cache()+'|KIL-FIELD-014';m.needsUpdate=true;
 }
 function scan(){scene.traverse(o=>{if(o.isMesh)for(const m of Array.isArray(o.material)?o.material:[o.material])attach(m);});}
 scan();
 // One static shadow-map bake, including the real roof aperture and ironwork.
 renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=true;
 const panel=document.createElement('div');panel.style.cssText='pointer-events:auto;font-size:12px;margin-top:6px';
 const label=document.createElement('label');label.textContent='Sky ';const sel=document.createElement('select');
 for(const [v,n] of [['cycle','Drifting day → dusk'],['day','Daylight'],['twilight','Twilight'],['storm','Storm · lightning']]){const op=document.createElement('option');op.value=v;op.textContent=n;sel.append(op);}
 sel.value=mode;sel.onchange=()=>{mode=sel.value;start=null;lastThunder=-1;};label.append(sel);panel.append(label);
 const soft=document.createElement('label'),check=document.createElement('input');check.type='checkbox';check.checked=gentle;soft.append(check,' Gentle lightning');panel.append(document.createElement('br'),soft);
 const button=document.createElement('button');button.textContent='Enable thunder';button.onclick=async()=>{try{audio ||= new (window.AudioContext||window.webkitAudioContext)();await audio.resume();noise=audio.createBuffer(1,audio.sampleRate*5,audio.sampleRate);const d=noise.getChannelData(0);let prev=0;for(let i=0;i<d.length;i++){prev=.96*prev+.04*(Math.random()*2-1);d[i]=prev*3;}button.textContent='Thunder enabled';button.disabled=true;}catch(e){button.textContent='Audio unavailable';}};panel.append(button);
 const status=document.createElement('div');panel.append(status);document.querySelector('#hud').append(panel);
 function thunder(){if(!audio||!noise)return;const src=audio.createBufferSource(),filter=audio.createBiquadFilter(),gain=audio.createGain(),t=audio.currentTime;src.buffer=noise;filter.type='lowpass';filter.frequency.value=180;gain.gain.setValueAtTime(0,t);gain.gain.linearRampToValueAtTime(.36,t+.55);gain.gain.exponentialRampToValueAtTime(.001,t+4.9);src.connect(filter).connect(gain).connect(audio.destination);src.start();}
 let lastScan=-10;
 function update(now){if(start===null)start=now;const t=(now-start)/1000;nowState=skyState(t,mode,check.checked);
 const s=nowState;uniforms.fDepth.value=s.depth;uniforms.fDrift.value.set(...s.drift);uniforms.fOn.value=s.electric;uniforms.fFlash.value=s.flash;
 sun.intensity=s.sun+3.6*s.flash;ambient.intensity=s.ambient+.22*s.flash;lampGlow.emissiveIntensity=s.electric?1.35:.08;
 for(const l of lamps)l.intensity=0; // baked electric field replaces point-light loops.
 const n=Math.floor(t/32);if(s.storm&&t%32>=17.7&&lastThunder!==n){lastThunder=n;if(t%32<19)thunder();}
 if(t-lastScan>1){scan();lastScan=t;status.textContent=(s.electric?'Lamps on':'Lamps off')+' · '+Math.round(s.phase*100)+'% dusk · '+Math.round((c.volume.byteLength+c.atlas.byteLength+atlas.byteLength+e.byteLength)/1024)+' KiB field arrays';}
 }
 return {update,attach,get mode(){return mode},get state(){return nowState},bytes:c.volume.byteLength+c.atlas.byteLength+atlas.byteLength+e.byteLength};
}
