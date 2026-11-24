from pathlib import Path
import re
root=Path(__file__).parent
prev=(root.parent/'Belowroads_R0005'/'index.html').read_text()
s=(root/'index.template.html').read_text()
for marker,pattern in [('/*ASSETS*/{}',r'const assetData=(\{.*?\});async function asset'),('/*TEXTURES*/[]',r'const textures=(\[.*?\]);tex'),('/*AUDIO*/{}',r'const audioBytes=(\{.*?\});let clips')]:
    s=s.replace(marker,re.search(pattern,prev,re.S).group(1))
(root/'index.html').write_text(s)
