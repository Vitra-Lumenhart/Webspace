from pathlib import Path
import os,ctypes as C,re,json,numpy as np,subprocess,tempfile,base64,io,sys
from PIL import Image
root=Path(__file__).resolve().parent.parent; out=Path(sys.argv[1]) if len(sys.argv)>1 else root/'native_previews'; out.mkdir(parents=True,exist_ok=True); subprocess.run(['node',str(root/'tests/export_geometry.mjs')],check=True); s=(root/'tests/validate_glsl.py').read_text();s=s.replace("(I*5)(0x3057,32,0x3056,32,0x3038)","(I*5)(0x3057,1000,0x3056,650,0x3038)").replace("(Path(__file__).resolve().parent.parent / 'index.template.html')","(root / 'index.template.html')")
exec(s[:s.index('for pair in [sh[:2]')]);programs=[]
for pair in [sh[:2],sh[2:]]:
 p=cp();[attach(p,i) for i in pair];link(p);ok=I();gp(p,0x8B82,C.byref(ok));assert ok.value;programs.append(p)
main,depth=programs
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
 a=np.fromfile('/tmp/below_'+k+'.bin',np.float32);va=obj(genva);bi=obj(genb);bindva(va);bindb(0x8892,bi);bufdata(0x8892,a.nbytes,ptr(a),0x88E4)
 for i in range(3):ena(i);attr(i,3,0x1406,0,36,P(i*12))
 meshes.append((va,len(a)//9))
def view(e,d):
 z=-d/np.linalg.norm(d);x=np.cross([0,1,0],z);x/=np.linalg.norm(x);y=np.cross(z,x);m=np.eye(4);m[:3,:3]=[x,y,z];m[:3,3]=-m[:3,:3]@e;return m
def persp(deg,asp,n,f):
 t=1/np.tan(np.deg2rad(deg)/2);return np.array([[t/asp,0,0,0],[0,t,0,0],[0,0,(f+n)/(n-f),2*f*n/(n-f)],[0,0,-1,0]])
poses=json.loads(Path('/tmp/below_geo.json').read_text())['poses'];enable(0x0B71)
for idx,yaw,pitch in [(0,0,0),(1,0,.13),(2,.15,.20),(3,0,0)]:
 eye=np.array(poses[idx]);d=np.array([np.sin(yaw)*np.cos(pitch),np.sin(pitch),-np.cos(yaw)*np.cos(pitch)]);lamp=eye+np.array([.12,-.22,.06]);light=persp(116,1,.12,36)@view(lamp,d)
 bindfb(0x8D40,fbo);viewport(0,0,1024,1024);clear(0x100);use(depth);matrix(depth,'uLightVP',light);matrix(depth,'uM',np.eye(4));enable(0x8037);offset(1.4,2)
 for va,count in meshes[:2]:bindva(va);draw(4,0,count)
 disable(0x8037);bindfb(0x8D40,0);viewport(0,0,1000,650);cc(.001,.001,.001,1);clear(0x4100);use(main);matrix(main,'uLightVP',light);matrix(main,'uVP',persp(70,1000/650,.055,72)@view(eye,d));matrix(main,'uM',np.eye(4));vector(main,'uEye',eye);vector(main,'uDir',d);vector(main,'uLampPos',lamp);vector(main,'uMark',[4,1,-17.1]);
 for k,v in [('uLamp',1),('uTime',0),('uSeed',613),('uSixth',0),('uInspect',0)]:scalar(main,k,v)
 for i,k in enumerate(['uStone','uNormal','uGravel','uShadow']):unii(loc(main,k.encode()),i)
 for i,(va,count) in enumerate(meshes):scalar(main,'uMode',2 if i==2 else 1);bindva(va);draw(4,0,count)
 a=np.zeros((650,1000,4),np.uint8);read(0,0,1000,650,0x1908,0x1401,ptr(a));Image.fromarray(a[::-1,:,:3]).save(out/('Belowroads_R0002_native_'+str(idx)+'.jpg'),quality=92);print('render',idx,'error',hex(err()))
