from pathlib import Path
import base64,gzip,json,io,subprocess, tempfile
import trimesh,numpy as np
from PIL import Image
root=Path(__file__).parent
bank=root.parent/'Belowroads_Art_v01'
def mesh(f):
 scene=trimesh.load(bank/'models'/f,force='scene'); out=[]
 for name in scene.graph.nodes_geometry:
  tf,gname=scene.graph[name]; g=scene.geometry[gname].copy();g.apply_transform(tf)
  color=np.array(g.visual.material.baseColorFactor[:3],dtype=float)/255
  p=g.vertices[g.faces].reshape(-1,3); n=np.repeat(g.face_normals,3,axis=0); c=np.tile(color,(len(p),1));out.append(np.concatenate((p,n,c),axis=1))
 return base64.b64encode(gzip.compress(np.rint(np.concatenate(out)*10000).astype('<i2').tobytes(),mtime=0)).decode()
def jpg(f):
 im=Image.open(bank/'materials'/f).convert('RGB').resize((256,256),Image.Resampling.LANCZOS);b=io.BytesIO();im.save(b,format='JPEG',quality=83,subsampling=0);return 'data:image/jpeg;base64,'+base64.b64encode(b.getvalue()).decode()
def audio(f):
 result=subprocess.check_output(['ffmpeg','-loglevel','error','-i',str(bank/'audio'/f),'-c:a','libvorbis','-q:a','2','-f','ogg','pipe:1']);return base64.b64encode(result).decode()
assets={k:mesh(f) for k,f in [('compass','SF01_compass.glb'),('hammer','SF02_survey_hammer.glb'),('lantern','SF03_lantern.glb')]}
textures=[jpg('wet_limestone_basecolor.png'),jpg('wet_limestone_normal.png')]
clips={k:audio(f) for k,f in [('step','gravel_step_1.wav'),('click','sixth_click.wav'),('drip','drip.wav')]}
s=(root/'index.template.html').read_text().replace('/*ASSETS*/{}',json.dumps(assets,separators=(',',':'))).replace('/*TEXTURES*/[]',json.dumps(textures,separators=(',',':'))).replace('/*AUDIO*/{}',json.dumps(clips,separators=(',',':')))
(root/'index.html').write_text(s)
print('HTML bytes',len(s),'assets',[(k,len(v)) for k,v in assets.items()],'textures',list(map(len,textures)),'audio',[(k,len(v)) for k,v in clips.items()])
