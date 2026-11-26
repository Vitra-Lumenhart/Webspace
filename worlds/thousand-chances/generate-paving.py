"""Union coplanar roadway and landing surfaces before triangulation. No layered stripes."""
import json,subprocess,math
from pathlib import Path
from collections import defaultdict
from shapely.geometry import Polygon,Point,box
from shapely.ops import unary_union,triangulate
p=Path(__file__).parent
j=json.loads(subprocess.check_output(['node','-e','const m=require("./model");console.log(JSON.stringify({roads:m.EDGES.filter(e=>m.roadOpen(...e)&&m.isRaised(...e)).map(e=>({path:m.edgePath(...e),w:m.deckWidth(...e)})),nodes:m.NODES}))'],cwd=p))
levels=defaultdict(list)
for r in j['roads']:
 path=r['path'];w=r['w']/2
 def side(a,b):
  dx=b[0]-a[0];dz=b[2]-a[2];l=math.hypot(dx,dz) or 1;return (-dz/l,dx/l)
 offsets=[]
 for i,v in enumerate(path):
  a=side(path[max(0,i-1)],v);b=side(v,path[min(len(path)-1,i+1)])
  if i==0:m=b;k=w
  elif i==len(path)-1:m=a;k=w
  else:
   x=a[0]+b[0];z=a[1]+b[1];l=math.hypot(x,z) or 1;m=(x/l,z/l);k=min(w*1.4,w/max(.72,m[0]*b[0]+m[1]*b[1]))
  offsets.append((m[0]*k,m[1]*k))
 for i,(a,b) in enumerate(zip(path,path[1:])):
  if abs(a[1]-b[1])>1e-5:continue
  u,v=offsets[i],offsets[i+1]
  poly=Polygon([(a[0]+u[0],a[2]+u[1]),(a[0]-u[0],a[2]-u[1]),(b[0]-v[0],b[2]-v[1]),(b[0]+v[0],b[2]+v[1])]).buffer(0)
  levels[a[1]].append(poly)
for n in j['nodes']:
 if n['y']!=0 or n['id'] in ['exit','returnCourt','returnShelf'] or 'Vein' in n['id'] or 'Mouth' in n['id']:
  radius=5.0 if 'Vein' in n['id'] else 2.5 if n['id'].startswith('villa') else 2.4
  levels[n['y']].append(Point(n['x'],n['z']).buffer(radius,resolution=4))
# Preserve old arrival plaza, but remove raised decorative slab. Dedicated smaller projecting overlook.
levels[30].append(box(-10,47,10,59));levels[30].append(Point(0,35).buffer(2.7,resolution=6))
# Ground at y=0 already covered within market, avoid coplanar duplicate. Outer flat roads need surface.
levels[0]=[v.difference(box(-48,-72,48,43).difference(box(36,-72,48,-54))) for v in levels[0]]
out=[]
import shapely,random
from shapely.geometry import MultiPoint
rng=random.Random(365)
for y,polys in levels.items():
 u=unary_union(polys)
 if u.is_empty:continue
 parts=[]
 if y==30:
  # Irregular, hand-poured repair patches at the arrival terrace only. Shared boundaries, no coplanar overlays.
  region=box(-39,25,41,86);terrace=u.intersection(region);outside=u.difference(region)
  if not outside.is_empty:parts.append((outside,0))
  sites=[(x+rng.uniform(-.75,.75),z+rng.uniform(-.75,.75)) for x in range(-42,45,3) for z in range(22,90,3)]
  cells=shapely.voronoi_polygons(MultiPoint(sites),extend_to=region).geoms
  for cell in cells:
   patch=terrace.intersection(cell)
   if not patch.is_empty and patch.area>1e-6:parts.append((patch,rng.randrange(6)))
 else:parts.append((u,0))
 for geom,k in parts:
  verts=[]
  ts=shapely.constrained_delaunay_triangles(geom).geoms
  for t in ts:
   pts=list(t.exterior.coords)[:3];verts.extend(round(v,5) for xy in pts for v in xy)
  if verts:out.append([y,verts,k])
(p/'paving.js').write_text('const PAVING='+json.dumps(out,separators=(',',':'))+';\n')
print('paving triangles',sum(len(v)//6 for _,v,_ in out))
