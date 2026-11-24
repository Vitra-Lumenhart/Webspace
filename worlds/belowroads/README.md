# Belowroads — The Sixth Footfall / R0001

## The Unwritten Sign

A first-person, harmless single-chamber WebGL2 prototype. Open `index.html` in a modern hardware-accelerated browser (or serve this folder with `python3 -m http.server 8080`). Click **Enter the cave**. There is no Canvas2D mode, login, network service, credit or permanent loss.

Walk with WASD or arrows; drag the view (double-click to request pointer lock), E to inspect, F for lantern, C to crouch, Shift to move faster. Touch: left stick and drag to look; use the inspection button. Gamepad sticks support walking and looking. Approach the abandoned compass or hammer and look toward it to inspect the actual 3D model; drag to rotate. On the right-hand wall look at the survey tally from an oblique viewpoint to reveal an extra stroke, then inspect it. The Vitra panel exposes a bounded reveal angle and a seed control, both local demonstration parameters. Reset restores safe starting state.

## Revision DW-R0001 — 2026-11-24
- **Backwards:** Original one-chamber prototype implementing a generated 3D rock mesh, GLSL rock material/normal mapping, attenuating entrance daylight and handheld lantern, first-person controller, inspectable original GLB-derived props, spatial audio and a viewpoint-dependent sixth mark.
- **Forwards:** Build toward shared layered hex topology, signed-distance field excavation, Rapier/BVH integration, verified puzzle graphs, and the remaining stations only after this chamber is accepted.
- **Not yet:** Full volumetric SDF/hex engine, physics-engine collisions, actual field/ramp/shaft generation, complete geological art, shadow maps, advanced sensing, Hester character/portal integration, Styx, multiplayer, bank, authoritative Vitra, and complete browser/mobile testing. Native GLES shader compile/link succeeded; Chromium in the available environment refused local navigation/WebGL2, so this release is not browser-playtested or visually approved. No Pages deployment is assumed. The included props and materials are original starter assets, not external photogrammetry.
- **Invariant impact:** Existing Webspace worlds and portal routes unchanged; no mandatory exposure or credentials. Prototype stays entirely in its own directory. No economic stakes. Lantern off removes its contribution, but the single entrance chamber retains physical daylight and a small ambient approximation; the fully dark back-half stations are not implemented.
- **Evidence:** `index.html`, readable `index.template.html`, `build.py`, `TECH_MANUAL.html`, and `tests/` (syntax, mesh generation and native GLSL checks). Immutable prior Webspace source is preserved by Git history; no prior accepted Belowroads build exists.

## Asset provenance

Source ART-R0001, original generated models SF01, SF02, SF03; wet limestone color and normal maps; gravel step, sixth click and drip audio. Runtime mesh data is quantized gzip-packed, textures are 256 px JPEG derivatives, audio is Ogg Vorbis. The source bank is kept in Drive separately from this build. No externally sourced photogrammetry is included. Original code intended MIT; original generated art derivatives intended CC0 to the extent rights permit, as documented in the asset bank. No third-party artwork is represented as ours.
