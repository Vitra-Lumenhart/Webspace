import * as THREE from 'three';
import {HOIST} from './food-hoist.mjs';
// Original reusable geometry based on the museum's two-pole, overhead-pulley
// food lift. Dimensions and carrier/rope details are interpretive game art.
export function mountFoodHoist(parent,materials={}){
 const iron=materials.iron||new THREE.MeshStandardMaterial({color:0x596671,roughness:.87,metalness:.28});
 const dark=materials.dark||new THREE.MeshStandardMaterial({color:0x333b3e,roughness:.95,metalness:.15});
 const timber=materials.wood||new THREE.MeshStandardMaterial({color:0x6e5034,roughness:.94});
 const ropeMat=new THREE.MeshStandardMaterial({color:0x76684e,roughness:1});
 const potMat=new THREE.MeshStandardMaterial({color:0x46413b,roughness:.91});
 const lidMat=materials.dark||dark,root=new THREE.Group();root.name=HOIST.id+' / exposed food hoist';parent.add(root);
 root.position.set(...HOIST.position);
 const staticGroup=new THREE.Group();staticGroup.name='two poles and decorative support';root.add(staticGroup);
 const add=(p,g,m,x=0,y=0,z=0)=>{const o=new THREE.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;p.add(o);return o;};
 const box=(p,x,y,z,w,h,d,m=iron)=>add(p,new THREE.BoxGeometry(w,h,d),m,x,y,z);
 const rod=(p,a,b,r,m=iron)=>{const A=new THREE.Vector3(...a),B=new THREE.Vector3(...b),d=B.clone().sub(A);const o=add(p,new THREE.CylinderGeometry(r,r,d.length(),10),m);o.position.copy(A).add(B).multiplyScalar(.5);o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());return o;};
 const half=HOIST.poleSpacing/2,H=HOIST.headY;
 for(const x of [-half,half]){
  rod(staticGroup,[x,-3.3,0],[x,H+.1,0],HOIST.poleRadius);
  for(const y of [0,6.3,12.6,H]){add(staticGroup,new THREE.CylinderGeometry(.068,.068,.12,12),dark,x,y,0);}
 }
 // The visibly decorated horizontal head reaches toward the wall, not a lift tower.
 box(staticGroup,1.02,H+.12,0,3.18,.15,.13);
 box(staticGroup,2.6,H-.18,0,.12,.68,.24);
 rod(staticGroup,[.48,H-.05,0],[2.55,H-.65,0],.035);
 const scroll=new THREE.CatmullRomCurve3([[.55,H-.06,0],[1.05,H-.48,0],[1.70,H-.68,0],[2.18,H-.38,0],[1.99,H-.15,0],[1.70,H-.30,0]].map(p=>new THREE.Vector3(...p)));
 add(staticGroup,new THREE.TubeGeometry(scroll,36,.025,8,false),iron);
 const wheel=new THREE.Group();wheel.name='pulley pivot';wheel.position.set(-.15,H,0);root.add(wheel);
 add(wheel,new THREE.TorusGeometry(HOIST.pulleyRadius,.032,10,40),iron);
 add(wheel,new THREE.TorusGeometry(HOIST.pulleyRadius-.047,.017,8,40),dark);
 for(let i=0;i<6;i++){const a=i*Math.PI/3;rod(wheel,[0,0,0],[Math.cos(a)*.23,Math.sin(a)*.23,0],.021);}
 const hub=add(wheel,new THREE.CylinderGeometry(.065,.065,.16,12),dark);hub.rotation.x=Math.PI/2;
 // Small open carrier, no passenger cage; carrier form is a reconstruction.
 const tray=new THREE.Group();tray.name='food carrier pivot';root.add(tray);
 box(tray,0,.055,0,HOIST.trayWidth,.10,HOIST.trayDepth,timber);
 for(const x of [-.37,.37]){box(tray,x,.17,0,.035,.19,.65);rod(tray,[x,.10,0],[0,.82,0],.017);}
 for(const z of [-.31,.31])box(tray,0,.14,z,.76,.15,.035);
 const loads=[];for(let i=0;i<3;i++){
  const g=new THREE.Group();g.position.set((i-1)*.23,.12,0);tray.add(g);loads.push(g);
  add(g,new THREE.CylinderGeometry(.095,.075,.15,12),potMat,0,.075,0);
  add(g,new THREE.CylinderGeometry(.10,.10,.025,12),dark,0,.16,0);
  add(g,new THREE.SphereGeometry(.022,8,6),iron,0,.187,0);
 }
 const cable=add(root,new THREE.CylinderGeometry(.013,.013,1,8),ropeMat);
 const tail=rod(root,[.11,H,0],[.78,.9,.50],.013,ropeMat);
 const hatch=new THREE.Group();hatch.name='kitchen trapdoor pivot';hatch.position.set(0,.012,-.56);root.add(hatch);
 box(hatch,0,0,.56,1.46,.075,1.12,lidMat);
 for(const x of [-.47,.47])box(hatch,x,.044,.56,.07,.012,1.05,iron);
 for(const x of [-.76,.76])box(staticGroup,x,.01,0,.07,.08,1.22,dark);
 for(const z of [-.60,.60])box(staticGroup,0,.01,z,1.54,.08,.07,dark);
 const end=new THREE.Vector3(),start=new THREE.Vector3(-.41,H,0),axis=new THREE.Vector3(0,1,0);
 function update(state,dt=0){
  tray.position.y=state.y;
  // Effective animation ratio for visual continuity, not a mechanical specification.
  wheel.rotation.z=(state.y-HOIST.stops[0])/HOIST.pulleyRadius;
  end.set(0,state.y+.82,0);const d=end.clone().sub(start);cable.position.copy(start).add(end).multiplyScalar(.5);cable.scale.y=d.length();cable.quaternion.setFromUnitVectors(axis,d.normalize());
  loads.forEach((g,i)=>g.visible=i<state.cargo.length);
  const open=state.phase!=='idle'||state.y>-.2;
  hatch.rotation.x=THREE.MathUtils.lerp(hatch.rotation.x,open?-Math.PI*.54:0,dt?1-Math.exp(-5*dt):1);
 }
 return {root,staticGroup,wheel,tray,hatch,update,parts:{wheel,tray,hatch,tail}};
}
