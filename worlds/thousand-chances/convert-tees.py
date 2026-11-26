from pathlib import Path
import json,struct,base64,hashlib,io
import numpy as np
from PIL import Image,ImageEnhance
root=Path(__file__).parent
pack=root/'wardrobe-source/TC_Market_Tees_R0002'
m=json.loads((pack/'manifest.json').read_text()); records=[]
# 18 independent 256px cells; a 2px internal gutter prevents cross-cell bleed.
atlas=Image.new('RGB',(6*256,3*256));
for i,g in enumerate(m['garments']):
 raw=(pack/g['model']).read_bytes(); n=struct.unpack_from('<I',raw,12)[0]; j=json.loads(raw[20:20+n]); blob=raw[28+n:]; prim=j['meshes'][0]['primitives'][0]
 def arr(k):
  a=j['accessors'][k]; v=j['bufferViews'][a['bufferView']]; dt={5126:'<f4',5123:'<u2'}[a['componentType']]; c={'VEC3':3,'VEC2':2,'SCALAR':1}[a['type']];return np.frombuffer(blob,dtype=dt,count=a['count']*c,offset=v.get('byteOffset',0)+a.get('byteOffset',0)).reshape(-1,c)
 p=arr(prim['attributes']['POSITION']); uv=arr(prim['attributes']['TEXCOORD_0']); f=arr(prim['indices']).ravel(); assert len(p)==g['vertices'] and len(f)==g['triangles']*3
 # Compact exact neutral mesh positions (0.1 mm) and UV (16-bit), original indices.
 v=np.empty((len(p),5),dtype='<i2');v[:,:3]=np.rint(p*10000).astype(np.int16);v[:,3:]=np.rint(uv*32767).astype(np.int16)
 enc=lambda a:base64.b64encode(a.tobytes()).decode()
 x,y=(i%6)*256,(i//6)*256; im=Image.open(pack/g['baseColor']).convert('RGB').resize((252,252),Image.Resampling.LANCZOS);im=ImageEnhance.Brightness(im).enhance(.78); atlas.paste(im,(x+2,y+2));atlas.paste(im.crop((0,0,1,252)).resize((2,252)),(x,y+2));atlas.paste(im.crop((251,0,252,252)).resize((2,252)),(x+254,y+2));atlas.paste(atlas.crop((x,y+2,x+256,y+3)).resize((256,2)),(x,y));atlas.paste(atlas.crop((x,y+253,x+256,y+254)).resize((256,2)),(x,y+254))
 records.append(dict(id=g['id'],community=g['community'],cut=g['cut'],blank=g['blank_hex'],vertices=len(p),triangles=len(f)//3,mesh=enc(v),indices=enc(f.astype('<u2')),model_sha256=hashlib.sha256(raw).hexdigest(),texture_sha256=hashlib.sha256((pack/g['baseColor']).read_bytes()).hexdigest(),shoulder=float(p[:,1].max()),cuff=float(abs(p[:,0]).max()),depth=float(abs(p[:,2]).max())))
atlas.save(root/'tee-atlas.jpg',quality=86,subsampling=0,optimize=True)
shared=records[0]['indices'];assert all(r['indices']==shared for r in records)
for r in records: del r['indices']
(root/'shirt-art.js').write_text('// TC Market Tees R0002: actual neutral GLB positions/UV/indices; quantized, no morphs.\nconst TEE_INDICES="'+shared+'";\nconst TEE_MODELS='+json.dumps(records,separators=(',',':'))+';\nconst TEE_ATLAS="data:image/jpeg;base64,'+base64.b64encode((root/'tee-atlas.jpg').read_bytes()).decode()+'";\n')
(root/'tee-provenance.json').write_text(json.dumps({'source':'TC_Market_Tees_R0002.zip','source_sha256':hashlib.sha256((root.parent/'TC_Market_Tees_R0002.zip').read_bytes()).hexdigest(),'models':[{k:v for k,v in r.items() if k not in ('mesh','indices')} for r in records],'atlas':'1536x768; 252px artwork per cell, 2px gutter; brightness 0.78 for ambient cloth'},indent=2))
