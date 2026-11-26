from pathlib import Path
import base64
p=Path(__file__).parent
s=(p/"screen-art.js").read_text().split("base64,",1)[1].split(chr(34),1)[0]
(p/"screen-atlas.jpg").write_bytes(base64.b64decode(s))
