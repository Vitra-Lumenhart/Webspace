from pathlib import Path
import time,statistics
import os,ctypes as C,re,json,numpy as np,subprocess,tempfile,base64,io,sys
from PIL import Image
root=Path(__file__).resolve().parent.parent; out=Path(sys.argv[1]) if len(sys.argv)>1 else root/'native_previews'; out.mkdir(parents=True,exist_ok=True); subprocess.run(['node',str(root/'tests/export_geometry.mjs')],check=True); s=(root/'tests/validate_glsl.py').read_text();s=s.replace("(I*5)(0x3057,32,0x3056,32,0x3038)","(I*5)(0x3057,1000,0x3056,650,0x3038)").replace("(Path(__file__).resolve().parent.parent / 'index.template.html')","(root / 'index.template.html')")
exec(s[:s.index('for pair in [sh[:2]')]);programs=[]
for pair in [sh[:2],sh[2:]]:
 p=cp();[attach(p,i) for i in pair];link(p);ok=I();gp(p,0x8B82,C.byref(ok));assert ok.value;programs.append(p)
main,depth=programs
old=(root/'tests/r0005_fragment.glsl').read_text().encode();oldsh=cs(0x8B30);ptr0=B(old);src(oldsh,1,C.byref(ptr0),None);compile(oldsh);ok=I();get(oldsh,0x8B81,C.byref(ok));assert ok.value
oldmain=cp();attach(oldmain,sh[0]);attach(oldmain,oldsh);link(oldmain);gp(oldmain,0x8B82,C.byref(ok));assert ok.value
F=C.c_float; ptr=lambda a:a.ctypes.data_as(P)
def gl(name,ret,*args):return fn(None,'gl'+name,ret,*args)
genva=gl('GenVertexArrays',None,I,C.POINTER(U));bindva=gl('BindVertexArray',None,U);genb=gl('GenBuffers',None,I,C.POINTER(U));bindb=gl('BindBuffer',None,U,U);bufdata=gl('BufferData',None,U,C.c_ssize_t,P,U);ena=gl('EnableVertexAttribArray',None,U);attr=gl('VertexAttribPointer',None,U,I,U,C.c_ubyte,I,P);draw=gl('DrawArrays',None,U,I,I);use=gl('UseProgram',None,U);loc=gl('GetUniformLocation',I,U,B);uni1=gl('Uniform1f',None,I,F);unii=gl('Uniform1i',None,I,I);uni3=gl('Uniform3f',None,I,F,F,F);mat=gl('UniformMatrix4fv',None,I,I,C.c_ubyte,P);gentex=gl('GenTextures',None,I,C.POINTER(U));bindtex=gl('BindTexture',None,U,U);active=gl('ActiveTexture',None,U);teximg=gl('TexImage2D',None,U,I,I,I,I,I,U,U,P);texparam=gl('TexParameteri',None,U,U,I);mip=gl('GenerateMipmap',None,U);genfb=gl('GenFramebuffers',None,I,C.POINTER(U));bindfb=gl('BindFramebuffer',None,U,U);fbtex=gl('FramebufferTexture2D',None,U,U,U,U,I);db=gl('DrawBuffers',None,I,C.POINTER(U));rb=gl('ReadBuffer',None,U);fbs=gl('CheckFramebufferStatus',U,U);enable=gl('Enable',None,U);disable=gl('Disable',None,U);offset=gl('PolygonOffset',None,F,F);viewport=gl('Viewport',None,I,I,I,I);clear=gl('Clear',None,U);cc=gl('ClearColor',None,F,F,F,F);read=gl('ReadPixels',None,I,I,I,I,U,U,P);err=gl('GetError',U)
def obj(gen):v=U();gen(1,C.byref(v));return v.value
def matrix(p,k,m):a=np.asarray(m.T,dtype=np.float32).copy();mat(loc(p,k.encode()),1,0,ptr(a))
def scalar(p,k,v):uni1(loc(p,k.encode()),v)
def vector(p,k,v):uni3(loc(p,k.encode()),*v)
def tex(k,f):
 active(0x84C0+k);t=obj(gentex);bindtex(0x0DE1,t);a=np.array(Image.open(f).convert('RGB'));teximg(0x0DE1,0,0x1907,a.shape[1],a.shape[0],0,0x1907,0x1401,ptr(a));mip(0x0DE1);texparam(0x0DE1,0x2801,0x2703);texparam(0x0DE1,0x2800,0x2601)
encoded=json.loads(re.search(r'const textures=(\[.*?\]);tex', (root/'index.html').read_text()).group(1)); [tex(i,io.BytesIO(base64.b64decode(v.split(',',1)[1]))) for i,v in enumerate(encoded)]
active(0x84C3);shadow=obj(gentex);bindtex(0x0DE1,shadow);teximg(0x0DE1,0,0x81A6,1024,1024,0,0x1902,0x1405,None)
for a in [0x2801,0x2800]:texparam(0x0DE1,a,0x2600)
for a in [0x2802,0x2803]:texparam(0x0DE1,a,0x812F)
fbo=obj(genfb);bindfb(0x8D40,fbo);fbtex(0x8D40,0x8D00,0x0DE1,shadow,0);db(1,(U*1)(0));rb(0);assert fbs(0x8D40)==0x8CD5;bindfb(0x8D40,0)
meshes=[]
for k in ['cave','rocks','pools']:
 a=np.fromfile('/tmp/below_'+k+'.bin',np.float32).reshape(-1,9);packed=np.zeros(len(a),dtype=np.dtype({'names':['p','n','c'],'formats':[('<f4',3),('<i2',3),('u1',3)],'offsets':[0,12,18],'itemsize':24}));packed['p']=a[:,:3];packed['n']=np.rint(np.clip(a[:,3:6],-1,1)*32767).astype(np.int16);packed['c']=np.rint(np.clip(a[:,6:9],0,1)*255).astype(np.uint8);va=obj(genva);bi=obj(genb);bindva(va);bindb(0x8892,bi);bufdata(0x8892,packed.nbytes,ptr(packed),0x88E4)
 for i,typ,norm,off in [(0,0x1406,0,0),(1,0x1402,1,12),(2,0x1401,1,18)]:ena(i);attr(i,3,typ,norm,24,P(off))
 meshes.append((va,len(a)))
def view(e,d):
 z=-d/np.linalg.norm(d);x=np.cross([0,1,0],z);x/=np.linalg.norm(x);y=np.cross(z,x);m=np.eye(4);m[:3,:3]=[x,y,z];m[:3,3]=-m[:3,:3]@e;return m
def persp(deg,asp,n,f):
 t=1/np.tan(np.deg2rad(deg)/2);return np.array([[t/asp,0,0,0],[0,t,0,0],[0,0,(f+n)/(n-f),2*f*n/(n-f)],[0,0,-1,0]])
poses=json.loads(Path('/tmp/below_geo.json').read_text())['poses'];enable(0x0B71);finish=gl('Finish',None);results=[]
# Render one fixed oblique wall view, plus a second camera for the final preset.
variants=[('A_R0005_shader',oldmain,2,1,1,0,True),('B_R0006_old_filter',main,2,1,1,0,True),('C_R0006_metric',main,3,1,1,0,True),('D_R0006_no_bounce',main,3,1,1,0,True),('E_R0006_no_shadow',main,0,1,1,0,True),('F_R0006_no_relief',main,3,0,1,0,True),('G_R0006_lamp_off',main,3,1,1,0,True)]
# For old shader without shadows set a depth map cleared to far; leave the lamp on.
for name,program,mode,bump,grain,fill,forms in variants:
 if os.environ.get('NORMAL_ONLY') and not name.startswith(('I_','J_','K_')):continue
 for idx,yaw,pitch in ([(1,-.6,.28),(2,-.95,.55)] if name in ['A_R0005_shader','C_R0006_metric'] else [(1,-.6,.28)]):
  eye=np.array(poses[idx]);d=np.array([np.sin(yaw)*np.cos(pitch),np.sin(pitch),-np.cos(yaw)*np.cos(pitch)]);lamp=eye+np.array([.18*np.cos(yaw),-.22,.18*np.sin(yaw)]);light=persp(116,1,.12,36)@view(lamp,d)
  def depthpass():
   bindfb(0x8D40,fbo);viewport(0,0,1024,1024);clear(0x100);use(depth);matrix(depth,'uLightVP',light);matrix(depth,'uM',np.eye(4));enable(0x8037);offset(.6,1) if mode==3 else offset(1.4,2)
   if mode:
    for va,count in meshes[:2 if forms else 1]:bindva(va);draw(4,0,count)
   disable(0x8037);bindfb(0x8D40,0)
  def colorpass():
   viewport(0,0,1000,650);cc(.001,.001,.001,1);clear(0x4100);use(program);matrix(program,'uLightVP',light);matrix(program,'uVP',persp(70,1000/650,.055,72)@view(eye,d));matrix(program,'uM',np.eye(4));vector(program,'uEye',eye);vector(program,'uDir',d);vector(program,'uLampPos',lamp);vector(program,'uMark',json.loads(Path('/tmp/below_geo.json').read_text())['mark']);
   for k,v in [('uLamp',0 if name.startswith('G_') else 1),('uTime',0),('uSeed',613),('uSixth',0),('uInspect',0),('uTilt',.15),('uBeds',1),('uFracture',1),('uCalcite',1),('uShadowMode',mode),('uBumpOn',bump),('uGrainOn',grain),('uLegacyFill',fill),('uNormalMode',1),('uFlat',0),('uSoftness',1.6),('uBounce',0 if name.startswith('D_') else .07),('uRelief',.10)]:scalar(program,k,v)
   for i,k in enumerate(['uStone','uNormal','uGravel','uShadow']):unii(loc(program,k.encode()),i)
   for i,(va,count) in enumerate(meshes):
    if i==1 and not forms:continue
    scalar(program,'uMode',2 if i==2 else 1);bindva(va);draw(4,0,count)
  depthpass();colorpass();finish();ts=[];ds=[]
  for _ in range(3):
   t=time.perf_counter();depthpass();finish();ds.append((time.perf_counter()-t)*1000);t=time.perf_counter();colorpass();finish();ts.append((time.perf_counter()-t)*1000)
  a=np.zeros((650,1000,4),np.uint8);read(0,0,1000,650,0x1908,0x1401,ptr(a));img=a[::-1,:,:3].copy();Image.fromarray(img).save(out/(name+'_'+str(idx)+'.png'));code=err();assert code==0,hex(code)
  results.append(dict(variant=name,pose=idx,depth_ms=round(statistics.median(ds),1),color_ms=round(statistics.median(ts),1),mean_rgb=round(float(img.mean()),2),dark_fraction=round(float((img.max(axis=2)<12).mean()),4)))
  print(results[-1],flush=True)
(out/'results.json').write_text(json.dumps(results,indent=2))
