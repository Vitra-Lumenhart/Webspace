"""Static route regression; offline sample, not a continuous collision engine."""
import numpy as np,json,trimesh,subprocess
from pathlib import Path
p=Path(__file__).parent
paths=json.loads(subprocess.check_output(['node','-e','const m=require("./model.js");console.log(JSON.stringify(m.EDGES.filter(e=>m.roadOpen(...e)).map(([a,b])=>({a,b,path:m.edgePath(a,b)}))))'],cwd=p))
a=np.fromfile(p/'mesh0.bin',dtype=np.dtype([('p','<f4',3),('n','<i2',3),('c','u1',4),('pad','u1',2)]))['p'].reshape(-1,3,3);lo=a.min(1);hi=a.max(1)
from collections import defaultdict
bins=defaultdict(list); cell=4
for i,(l,h) in enumerate(zip(lo,hi)):
 for xx in range(int(np.floor((l[0]-.31)/cell)),int(np.floor((h[0]+.31)/cell))+1):
  for zz in range(int(np.floor((l[2]-.31)/cell)),int(np.floor((h[2]+.31)/cell))+1):bins[xx,zz].append(i)
bins={k:np.array(v,dtype=int) for k,v in bins.items()}
res=[]
for e in paths:
 bad=[];unsupported=[];samples=0
 for x,y in zip(e['path'],e['path'][1:]):
  x=np.array(x);y=np.array(y);l=np.linalg.norm(y-x)
  for t in np.linspace(0,1,max(2,int(np.ceil(l/.25))+1)):
   pt=x+(y-x)*t;samples+=1
   cand=bins.get((int(np.floor(pt[0]/cell)),int(np.floor(pt[2]/cell))),np.array([],dtype=int));ids=cand[((lo[cand]<=pt+[.30,2.0,.30])&(hi[cand]>=pt+[-.30,.30,-.30])).all(1)]
   for h in [.60,.95,1.30,1.70]:
    if not len(ids):continue
    pts=np.repeat((pt+[0,h,0])[None,:],len(ids),0);d=np.linalg.norm(trimesh.triangles.closest_point(a[ids],pts)-pts,axis=1)
    if d.min()<.30:bad.append((pt.round(3).tolist(),h,round(float(d.min()),3)));break
   # Downward vertical ray at route center; no foot surface farther than 0.16 below or 0.12 above intended grade.
   ix=cand[((lo[cand]<=pt+[.0001,.12,.0001])&(hi[cand]>=pt+[-.0001,-.16,-.0001])).all(1)];tri=a[ix];v=tri[:,1]-tri[:,0];w=tri[:,2]-tri[:,0];u=pt-tri[:,0];den=v[:,0]*w[:,2]-v[:,2]*w[:,0];ok=np.abs(den)>1e-8
   if ok.any():
    v=v[ok];w=w[ok];u=u[ok];den=den[ok];base=tri[ok,0];s=(u[:,0]*w[:,2]-u[:,2]*w[:,0])/den;q=(v[:,0]*u[:,2]-v[:,2]*u[:,0])/den;dy=base[:,1]+s*v[:,1]+q*w[:,1]-pt[1];supported=((s>=-1e-5)&(q>=-1e-5)&(s+q<=1+1e-5)&(dy>=-.16)&(dy<=.12)).any()
   else:supported=False
   if not supported:unsupported.append(pt.round(3).tolist())
 res.append({'edge':[e['a'],e['b']],'samples':samples,'body_hits':len(bad),'unsupported':len(unsupported),'first_hits':bad[:3],'first_unsupported':unsupported[:3]})
 print(res[-1],flush=True)
out={'seed':365,'sample_spacing_max_m':.25,'body_radius_m':.30,'body_sample_heights_m':[.6,.95,1.3,1.7],'surface_tolerance_m':[-.16,.12],'open_edges':len(res),'samples':sum(x['samples'] for x in res),'body_hits':sum(x['body_hits'] for x in res),'unsupported':sum(x['unsupported'] for x in res),'edges':res,'scope':'static mesh, sampled route centers, no moving actors or continuous capsule sweep'}
(p/'evidence'/'route-clearance.json').write_text(json.dumps(out,indent=2));print({k:v for k,v in out.items() if k!='edges'})
