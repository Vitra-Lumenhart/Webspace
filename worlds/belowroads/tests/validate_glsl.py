import os,ctypes as C,re
from pathlib import Path
os.environ['EGL_PLATFORM']='surfaceless';os.environ['LIBGL_ALWAYS_SOFTWARE']='1'
e=C.CDLL('libEGL.so.1');g=None;P=C.c_void_p;I=C.c_int;U=C.c_uint;B=C.c_char_p
def fn(lib,name,ret,*args):
 
 if lib is None:
  proc=e.eglGetProcAddress;proc.restype=P;proc.argtypes=[B];ptr=proc(name.encode());assert ptr,name;return C.CFUNCTYPE(ret,*args)(ptr)
 f=getattr(lib,name);f.restype=ret;f.argtypes=args;return f
getDisplay=fn(e,'eglGetDisplay',P,P);init=fn(e,'eglInitialize',U,P,C.POINTER(I),C.POINTER(I));bind=fn(e,'eglBindAPI',U,U);choose=fn(e,'eglChooseConfig',U,P,C.POINTER(I),C.POINTER(P),I,C.POINTER(I));create=fn(e,'eglCreateContext',P,P,P,P,C.POINTER(I));surface=fn(e,'eglCreatePbufferSurface',P,P,P,C.POINTER(I));current=fn(e,'eglMakeCurrent',U,P,P,P,P)
d=getDisplay(None);major=I();minor=I();assert init(d,C.byref(major),C.byref(minor));assert bind(0x30A0);cfg=P();num=I();a=(I*15)(0x3024,8,0x3023,8,0x3022,8,0x3025,24,0x3033,1,0x3040,0x40,0x3038,0,0);assert choose(d,a,C.byref(cfg),1,C.byref(num)) and num.value;ctx=create(d,cfg,None,(I*3)(0x3098,3,0x3038));sf=surface(d,cfg,(I*5)(0x3057,32,0x3056,32,0x3038));assert current(d,sf,sf,ctx)
getstr=fn(g,'glGetString',B,U);print('Native EGL GLES',getstr(0x1F02).decode(),getstr(0x1F01).decode());cs=fn(g,'glCreateShader',U,U);src=fn(g,'glShaderSource',None,U,I,C.POINTER(B),C.POINTER(I));compile=fn(g,'glCompileShader',None,U);get=fn(g,'glGetShaderiv',None,U,U,C.POINTER(I));log=fn(g,'glGetShaderInfoLog',None,U,I,C.POINTER(I),P)
s=(Path(__file__).resolve().parent.parent / 'index.template.html').read_text();sh=[]
for name,ty in [('VS',0x8B31),('FS',0x8B30)]:
 ss=re.search(r'const '+name+r'=`(.*?)`;',s,re.S).group(1).encode();shader=cs(ty);ptr=B(ss);src(shader,1,C.byref(ptr),None);compile(shader);ok=I();get(shader,0x8B81,C.byref(ok));buf=C.create_string_buffer(16384);log(shader,16384,None,buf);print(name,'PASS' if ok.value else 'FAIL',buf.value.decode());assert ok.value;sh.append(shader)
cp=fn(g,'glCreateProgram',U);attach=fn(g,'glAttachShader',None,U,U);link=fn(g,'glLinkProgram',None,U);gp=fn(g,'glGetProgramiv',None,U,U,C.POINTER(I));pl=fn(g,'glGetProgramInfoLog',None,U,I,C.POINTER(I),P);p=cp();[attach(p,i) for i in sh];link(p);ok=I();gp(p,0x8B82,C.byref(ok));buf=C.create_string_buffer(16384);pl(p,16384,None,buf);print('LINK','PASS' if ok.value else 'FAIL',buf.value.decode());assert ok.value
