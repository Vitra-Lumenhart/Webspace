from pathlib import Path
p=Path(__file__).parent
s=(p/'template.html').read_text()
for token,file in [('/*MODEL*/','model.js'),('/*MARKET*/','market.js'),('/*SCREEN_ART*/','screen-art.js'),('/*RENDER*/','render.js'),('/*AUDIO*/','audio.js'),('/*UI*/','ui.js')]:s=s.replace(token,(p/file).read_text())
(p/'index.html').write_text(s)
