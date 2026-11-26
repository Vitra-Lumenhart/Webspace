# KayKit Kilmainham — R003

## Player
Open index.html served by Webspace or download standalone.html for an offline browser. Drag to orbit, scroll to zoom, right drag to pan. Select one of eight original glTF assets; inspect native bounds, wireframe and reference grid. Three camera stations show a Gaol-inspired three-tier court. No walking, narrative or collision in this study.

## Developer
Inherits the exact Three.js r168/MIT vendor tree already used by The Kilns. GLTFLoader consumes original glTF 2.0 manifests with binary buffers and original PNGs as data URIs; no OBJ conversion. OrbitControls camera. Y-up native geometry; walls and floor are four-unit modules. Stair rise 5.1 versus gallery rise 4 remains an explicit fit problem; rails and roof frame provisional non-KayKit meshes. World state and navigation remain independent. No other world changed.

## Provenance and build
Kay Lousberg, KayKit Dungeon Pack 1.1 (wall_doorway, wall_gated, floor_tile_large, stairs_long, wall, wall_pillar, wall_arched) and Fantasy Weapons Bits 1.0 (wand_A), CC0. Vitra Drive original glTF + .bin and two texture atlases. SHA-256 of original glTF in asset-data.json. Readable shell.html, viewer.mjs and asset-data.json are canonical. build.mjs regenerates index.html and standalone.html using the existing vendored library. Offline build rewrites GLTFLoader's relative utility import to its mapped module name. No CDN required in GitHub builds.

## Evidence and limits
Eight glTF files parsed and all binary byte lengths and bufferView ranges checked; two PNG signatures checked; Node syntax check passed. Browser/GPU visual validation not performed; no assertion of successful rendering. No measured historic reconstruction, pathfinding, snapping editor, shadow QA, flora or sky. R002 rollback: 4ef955ea1ac634550677da49b426310fd11819dc. R001 chronicle remains at chronicle.html.
