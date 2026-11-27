import json,subprocess,numpy as np,trimesh,math
from pathlib import Path
from collections import defaultdict
p=Path(__file__).parent
src="const fs=require('fs');console.log(JSON.stringify(new Function(fs.readFileSync('model.js','utf8')+'\\n'+fs.readFileSync('market.js','utf8')+'\\n'+fs.readFileSync('road-fabric.js','utf8')+'\\nreturn {market:MARKET,cells:ROAD_FABRIC.cells};')()))"
a=json.loads(subprocess.check_output(['node','-e',src],cwd=p));mesh=np.fromfile(p/'mesh0.bin',dtype=np.dtype([('p','<f4',3),('n','<i2',3),('c','u1',4),('pad','u1',2)]))['p'].reshape(-1,3,3);lo=mesh.min(1);hi=mesh.max(1);bins=defaultdict(list)
for i,(l,h) in enumerate(zip(lo,hi)):
 for x in range(math.floor((l[0]-.35)/4),math.floor((h[0]+.35)/4)+1):
  for z in range(math.floor((l[2]-.35)/4),math.floor((h[2]+.35)/4)+1):bins[x,z].append(i)
bins={k:np.array(v) for k,v in bins.items()}
def valid(pt):
 pt=np.array(pt);cand=bins.get((math.floor(pt[0]/4),math.floor(pt[2]/4)),np.array([],dtype=int));ids=cand[((lo[cand]<=pt+[.31,1.9,.31])&(hi[cand]>=pt+[-.31,.25,-.31])).all(1)]
 for h in [.45,.8,1.2,1.65]:
  if len(ids) and np.linalg.norm(trimesh.triangles.closest_point(mesh[ids],np.repeat((pt+[0,h,0])[None,:],len(ids),axis=0))-(pt+[0,h,0]),axis=1).min()<.31:return False
 ix=cand[((lo[cand]<=pt+[.001,.13,.001])&(hi[cand]>=pt+[-.001,-.16,-.001])).all(1)];tr=mesh[ix];v=tr[:,1]-tr[:,0];w=tr[:,2]-tr[:,0];u=pt-tr[:,0];den=v[:,0]*w[:,2]-v[:,2]*w[:,0];ok=np.abs(den)>1e-8
 if not ok.any():return False
 v,w,u,den,tr=v[ok],w[ok],u[ok],den[ok],tr[ok];s=(u[:,0]*w[:,2]-u[:,2]*w[:,0])/den;q=(v[:,0]*u[:,2]-v[:,2]*u[:,0])/den;dy=tr[:,0,1]+s*v[:,1]+q*w[:,1]-pt[1];return bool(((s>=-1e-5)&(q>=-1e-5)&(s+q<=1+1e-5)&(dy>=-.16)&(dy<=.12)).any())
out={};tested=0
for o in a['market']:
 if o['y']!=0:continue
 x,y,z=o['x'],o['y'],o['z'];angle=o.get('angle',0);ss,cc=math.sin(angle),math.cos(angle);positions=[]
 # local customer sockets in front of shop, not movement paths
 for f in [1.55,1.85,2.2,2.6,3.1,3.6]:
  for u in [0,-.65,.65,-1.2,1.2]:
   pt=[x+u*cc+f*ss,y,z-u*ss+f*cc];tested+=1
   if valid(pt) and all(math.dist(pt,v)>.78 for v in positions):positions.append([round(v,4) for v in pt])
   if len(positions)>=2:break
  if len(positions)>=2:break
 if len(positions)>=2:out[o['id']]=positions
(p/'activity-sockets.js').write_text('const TC_SOCKETS='+json.dumps(out,separators=(',',':'))+';\n');(p/'evidence'/'socket-results.json').write_text(json.dumps({'validatedShops':len(out),'positions':len(out)*2,'candidates':tested,'scope':'static point support and 4 sample heights, not swept approach or dynamic collisions'},indent=2));print(len(out),tested)
