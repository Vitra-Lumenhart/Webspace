from pathlib import Path
import json,base64,struct,math,shutil
from PIL import Image
p=Path(__file__).resolve().parent
# Props: original geometry, UV centroid color bake, normalized height, compact quantized face coordinates.
assets={}; provenance=[]
for key,filename,texture,drive in [('mug','mug_A.obj','furniturebits_texture.png','1j8cy_goL-7UL0ArxgiiXYAfIY6MHGfy8'),('books','book_set.obj','furniturebits_texture.png','1OWGHxALs4XPpRs1q6yXt3k1hbXaxC9rV'),('pizza','food_pizza_cheese_plated.obj','restaurantbits_extra.png','1g6FnMDQIEoZIAy59rt8Rk7z3DB955QZd')]:
 v=[];uv=[];faces=[]
 for l in (p/'kaykit-source'/filename).read_text().splitlines():
  a=l.split();
  if not a:continue
  if a[0]=='v':v.append(tuple(map(float,a[1:4])))
  if a[0]=='vt':uv.append(tuple(map(float,a[1:3])))
  if a[0]=='f':
   f=[tuple(map(int,q.split('/')[:2])) for q in a[1:]];faces.extend((f[0],f[i],f[i+1]) for i in range(1,len(f)-1))
 lo=[min(q[i] for q in v) for i in range(3)];hi=[max(q[i] for q in v) for i in range(3)];size=max(hi[i]-lo[i] for i in range(3));center=[(lo[0]+hi[0])/2,lo[1],(lo[2]+hi[2])/2];im=Image.open(p/'kaykit-source'/texture).convert('RGB'); w,h=im.size;out=bytearray()
 for f in faces:
  uu=sum(uv[t-1][0] for _,t in f)/3;vv=sum(uv[t-1][1] for _,t in f)/3;rgb=im.getpixel((min(w-1,max(0,int(uu*w))),min(h-1,max(0,int((1-vv)*h)))));out.extend(struct.pack('<9h3B',*[round((v[i-1][j]-center[j])/size*16000) for i,_ in f for j in range(3)],*rgb))
 assets[key]=base64.b64encode(out).decode();provenance.append(dict(key=key,source=filename,texture=texture,drive=drive,triangles=len(faces),bytes=len(out)))
(p/'prop-art.js').write_text('const PROP_ART='+json.dumps(assets,separators=(',',':'))+';\n')
(p/'prop-provenance.json').write_text(json.dumps({'creator':'Kay Lousberg, www.kaylousberg.com','license':'CC0 1.0','license_drive':'https://drive.google.com/file/d/18lJqHaa5ih0a26nCbHHgQ1fbKEx8WlKz/view','conversion':'original OBJ faces triangulated, UV centroid sampled from original atlas, quantized positions, face colors; no walls, people or tech','assets':provenance},indent=2))
