import ctypes as c, os, json, pathlib
from PIL import Image
os.environ['EGL_PLATFORM']='surfaceless';os.environ['LIBGL_ALWAYS_SOFTWARE']='1'
p=pathlib.Path(__file__).parent;e=c.CDLL('libEGL.so.1');g=c.CDLL('libGL.so.1');I=c.c_int;U=c.c_uint;P=c.c_void_p;F=c.c_float

def bind(lib,name,ret,args):
 f=getattr(lib,name);f.restype=ret;f.argtypes=args;return f
D=bind(e,'eglGetDisplay',P,[P])(None);a=I();b=I();assert bind(e,'eglInitialize',U,[P,c.POINTER(I),c.POINTER(I)])(D,c.byref(a),c.byref(b));assert bind(e,'eglBindAPI',U,[U])(0x30A0)
attrs=(I*15)(0x3024,8,0x3023,8,0x3022,8,0x3025,24,0x3033,1,0x3040,0x40,0x3038,0,0);config=P();n=I();assert bind(e,'eglChooseConfig',U,[P,c.POINTER(I),c.POINTER(P),I,c.POINTER(I)])(D,attrs,c.byref(config),1,c.byref(n)) and n.value
w,h=1280,800;pa=(I*5)(0x3057,w,0x3056,h,0x3038);surf=bind(e,'eglCreatePbufferSurface',P,[P,P,c.POINTER(I)])(D,config,pa);ctx=bind(e,'eglCreateContext',P,[P,P,P,c.POINTER(I)])(D,config,None,(I*3)(0x3098,3,0x3038));assert bind(e,'eglMakeCurrent',U,[P,P,P,P])(D,surf,surf,ctx)
B=lambda n,r,*a:bind(g,n,r,list(a));shader=B('glCreateShader',U,U);source=B('glShaderSource',None,U,I,c.POINTER(c.c_char_p),c.POINTER(I));compile_=B('glCompileShader',None,U);getsh=B('glGetShaderiv',None,U,U,c.POINTER(I));slog=B('glGetShaderInfoLog',None,U,I,c.POINTER(I),P);prog=B('glCreateProgram',U)();attach=B('glAttachShader',None,U,U);link=B('glLinkProgram',None,U);getpr=B('glGetProgramiv',None,U,U,c.POINTER(I));use=B('glUseProgram',None,U);getloc=B('glGetUniformLocation',I,U,c.c_char_p);uniformmat=B('glUniformMatrix4fv',None,I,I,U,c.POINTER(F));uniform3=B('glUniform3fv',None,I,I,c.POINTER(F));m=json.loads((p/'geometry.json').read_text())
for s in m['shaders']:
 sh=shader(s['t']);src=c.c_char_p(s['src'].encode());source(sh,1,c.byref(src),None);compile_(sh);ok=I();getsh(sh,0x8B81,c.byref(ok));log=c.create_string_buffer(4096);slog(sh,4096,None,log);assert ok.value,log.value;attach(prog,sh)
link(prog);ok=I();getpr(prog,0x8B82,c.byref(ok));assert ok.value;use(prog)
genva=B('glGenVertexArrays',None,I,c.POINTER(U));bindva=B('glBindVertexArray',None,U);genbuf=B('glGenBuffers',None,I,c.POINTER(U));bindbuf=B('glBindBuffer',None,U,U);bufdata=B('glBufferData',None,U,c.c_ssize_t,P,U);enableattr=B('glEnableVertexAttribArray',None,U);attr=B('glVertexAttribPointer',None,U,I,U,U,I,P);draw=B('glDrawArrays',None,U,I,I);clear=B('glClear',None,U);clearcolor=B('glClearColor',None,F,F,F,F);viewport=B('glViewport',None,I,I,I,I);read=B('glReadPixels',None,I,I,I,I,U,U,P);geterr=B('glGetError',U);enable=B('glEnable',None,U);getstr=B('glGetString',c.c_char_p,U);enable(0xB71);clearcolor(.045,.052,.065,1);viewport(0,0,w,h);meshes=[]
for i in range(3):
 raw=(p/f'mesh{i}.bin').read_bytes();vao=U();buf=U();genva(1,c.byref(vao));bindva(vao);genbuf(1,c.byref(buf));bindbuf(0x8892,buf);bufdata(0x8892,len(raw),c.c_char_p(raw),0x88E4)
 stride=m.get("staticStride",40) if i==0 else 40
 for loc,nn,typ,normalized,off in ([(0,3,0x1406,0,0),(1,3,0x1402,1,12),(2,4,0x1401,1,18)] if stride==24 else [(0,3,0x1406,0,0),(1,3,0x1406,0,12),(2,4,0x1406,0,24)]):enableattr(loc);attr(loc,nn,typ,normalized,stride,P(off))
 meshes.append((vao,len(raw)//stride))
# Verify actual screen shader and texture atlas in native GLES, independently of browser.
import re
sr=(p/'render.js').read_text();shader_text=re.findall(r'sh\(gl\.(VERTEX_SHADER|FRAGMENT_SHADER),`(#version 300 es.*?\n.*?)`\)',sr,re.S);assert len(shader_text)==2
screenprog=B('glCreateProgram',U)()
for kind,src_text in shader_text:
 sh=shader(0x8B31 if kind=='VERTEX_SHADER' else 0x8B30);src=c.c_char_p(src_text.encode());source(sh,1,c.byref(src),None);compile_(sh);ok=I();getsh(sh,0x8B81,c.byref(ok));assert ok.value;attach(screenprog,sh)
link(screenprog);ok=I();getpr(screenprog,0x8B82,c.byref(ok));assert ok.value
verts=[]
for sc in m['screens']:
 u=(sc['slot']%2)*.5;v=(sc['slot']//2)*.5;x,y,z,wid,hei=sc['x'],sc['y'],sc['z']+.027,sc['w']/2,sc['h'];q=[[x-wid,y,z,u,v+.5],[x+wid,y,z,u+.5,v+.5],[x+wid,y+hei,z,u+.5,v],[x-wid,y+hei,z,u,v]]
 for i in [0,1,2,0,2,3]:verts.extend(q[i])
sv=U();sb=U();genva(1,c.byref(sv));bindva(sv);genbuf(1,c.byref(sb));bindbuf(0x8892,sb);va=(F*len(verts))(*verts);bufdata(0x8892,c.sizeof(va),va,0x88E4)
for loc,nn,off in [(0,3,0),(1,2,12)]:enableattr(loc);attr(loc,nn,0x1406,0,20,P(off))
tex=U();B('glGenTextures',None,I,c.POINTER(U))(1,c.byref(tex));B('glBindTexture',None,U,U)(0x0DE1,tex);im=Image.open(p/'screen-atlas.jpg').convert('RGBA');raw=im.tobytes();B('glTexImage2D',None,U,I,I,I,I,I,U,U,P)(0x0DE1,0,0x1908,*im.size,0,0x1908,0x1401,c.c_char_p(raw));param=B('glTexParameteri',None,U,U,I)
for k,v in [(0x2801,0x2601),(0x2800,0x2601),(0x2802,0x812F),(0x2803,0x812F)]:param(0x0DE1,k,v)
use(screenprog);B('glUniform1i',None,I,I)(getloc(screenprog,b'atlas'),0);use(prog)
result={'texturedScreens':len(m['screens']),'renderer' :getstr(0x1F01).decode(),'vertices':m['vertices'],'wheelVertices':m['wheelVertices'],'buildings':m['buildings'],'walkers':m['walkers'],'peopleVertices':m['peopleVertices'],'views':[]}
for v in m['views']:
 use(prog);clear(0x4000|0x100);uniformmat(getloc(prog,b'vp'),1,0,(F*16)(*v['vp']));uniform3(getloc(prog,b'eye'),1,(F*3)(*v['eye']))
 for vao,count in meshes:bindva(vao);draw(4,0,count)
 use(screenprog);uniformmat(getloc(screenprog,b'vp'),1,0,(F*16)(*v['vp']));bindva(sv);draw(4,0,len(verts)//5);use(prog)
 raw=c.create_string_buffer(w*h*4);read(0,0,w,h,0x1908,0x1401,raw);err=geterr();im=Image.frombytes('RGBA',(w,h),raw.raw).transpose(Image.Transpose.FLIP_TOP_BOTTOM);im.save(p/(v['id']+'.png'));result['views'].append({'id':v['id'],'glError':err});assert err==0
(p/'evidence'/'native-results.json').write_text(json.dumps(result,indent=2));print(result)
