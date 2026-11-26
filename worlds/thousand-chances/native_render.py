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
for i in range(2):
 raw=(p/f'mesh{i}.bin').read_bytes();vao=U();buf=U();genva(1,c.byref(vao));bindva(vao);genbuf(1,c.byref(buf));bindbuf(0x8892,buf);bufdata(0x8892,len(raw),c.c_char_p(raw),0x88E4)
 for loc,nn,off in [(0,3,0),(1,3,12),(2,4,24)]:enableattr(loc);attr(loc,nn,0x1406,0,40,P(off))
 meshes.append((vao,len(raw)//40))
result={'renderer':getstr(0x1F01).decode(),'vertices':m['vertices'],'wheelVertices':m['wheelVertices'],'buildings':m['buildings'],'views':[]}
for v in m['views']:
 clear(0x4000|0x100);uniformmat(getloc(prog,b'vp'),1,0,(F*16)(*v['vp']));uniform3(getloc(prog,b'eye'),1,(F*3)(*v['eye']))
 for vao,count in meshes:bindva(vao);draw(4,0,count)
 raw=c.create_string_buffer(w*h*4);read(0,0,w,h,0x1908,0x1401,raw);err=geterr();im=Image.frombytes('RGBA',(w,h),raw.raw).transpose(Image.Transpose.FLIP_TOP_BOTTOM);im.save(p/(v['id']+'.png'));result['views'].append({'id':v['id'],'glError':err});assert err==0
(p/'native-results.json').write_text(json.dumps(result,indent=2));print(result)
