# KayKit Kilmainham — R002

## Player
Open index.html or standalone.html. Five viewpoints; arrows or drag rotate the camera. This is an architectural asset study, not a playable prison. R001 remains in chronicle.html.

## Developer
Native WebGL2, OBJ position/UV/normal parsing, triangulation, per-atlas batching, depth buffer and simple directional shading. Readable viewer.js and shell index.html; assets.js embeds original OBJ and PNG data. Build standalone by replacing both script src tags with inline source. Related Webspace projects: Elisium WebGL2 architecture and independent world conventions; Chuzhoy flora, Witch's Hole trees and Luna sky deferred. No direct shared-engine import in this revision.

## Sources
Kay Lousberg / KayKit CC0: Dungeon Remastered 1.1 doorway, gated wall, large floor tile, long stairs, dungeon_texture.png; Fantasy Weapons Bits 1.0 wand_A and weapons_bits_texture.png. Vitra Drive originals. Kilmainham Gaol East and West Wings are architectural inspiration, not measured geometry. Roof, decks, railings are procedural studies.

## Tests and limitations
Node syntax passed; all five OBJ files contain face UVs; two original PNGs decode at 1024×1024. 1969 unique triangulated faces. Headless Chromium WebGL2 context unavailable; GPU, actual appearance, browser interactions, covenant and regression unverified. No portal, walking or collision. Rollback 9824cf8082fb2a6c391f10a2cf3f16f0137e44fb.
