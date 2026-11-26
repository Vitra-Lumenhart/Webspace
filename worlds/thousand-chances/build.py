from pathlib import Path
p=Path(__file__).parent
s=(p/'template.html').read_text()
for token,file in [('/*MODEL*/','model.js'),('/*MARKET*/','market.js'),('/*SCREEN_ART*/','screen-art.js'),('/*CAVE_LITE*/','cave-lite.js'),('/*PROP_ART*/','prop-art.js'),('/*PAVING*/','paving.js'),('/*SHIRT_ART*/','shirt-art.js'),('/*DETAIL*/','detail.js'),('/*RENDER*/','render.js'),('/*AUDIO*/','audio.js'),('/*UI*/','ui.js')]:s=s.replace(token,(p/file).read_text())
(p/'index.html').write_text(s)
