# R013 — Kilmainham ironwork correction
27 November 2026

## Primary visual benchmark
[Colin's Main Hall photograph, 3 June 2016](https://commons.wikimedia.org/wiki/File:Kilmainham_Gaol_Main_Hall_2016-06-03.jpg), CC BY-SA 4.0. The 960px image was actually inspected. Compare its top-right mechanism and the central stair. Corroborating [Velvet's 2013 view](https://commons.wikimedia.org/wiki/File:Dublin_kilmainham_gaol_cells_hall.JPG), CC BY-SA 3.0. Both are links to references, not bundled texture files. The full-resolution Colin image could not be retrieved. Photographic detail is not a measured survey.

## KIL-IRON-003A — exposed head
The recognizable silhouette is a projecting four-spoke circular sheave, thin open horizontal iron framework, curved return and pierced lower member, with two exposed poles beneath. The adjacent pale lamp is not a winding drum. R013 replaces the generic small six-spoke wheel and simple solid bar with a twin-cheek .88m diameter wheel, fixed axle/collars, pierced lower plates, narrow rails, curved upper brace, bearing supports, mounting plates and visible rope wrap. Wheel projects courtward of the two poles; axle local Z, rotation about Z. Game head center 15.70m, existing footprint retained. Dimensions, exact spoke thickness, hole rhythm, axle assembly and hidden rope path are interpretive. Do not add a motor or large winding drum. KIL-IRON-003B carrier and KIL-IRON-003C hatch retain their separate pivots and previous behavior; fixed-tick food rounds and maintenance are unchanged. Geometry is original reusable Three.js model, not an exported GLB or real machinery design.

## KIL-IRON-001 — adult stair canopy
Old runtime call used 1.35m spring + .64m arch, despite a taller planning contract. Runtime now imports the shared STAIR dimensions. 1.46m centerline width, 2.25m spring above stair slope, .73m radius, 12 arch facets, 7 longitudinal bars, .76m hoop spacing target, start at riser 12 of 35. Continuous lower rails retained; both flights and bridge cages use tall spring/radius. The nominal crown is 2.98m above slope. Conservatively subtract one riser and bar diagonal, and evaluate actual polygonal hoop at lateral body radius plus margin: center 2.761m, body edge 2.675m, with margin 2.590m. Not a claim of original surveyed dimensions or full swept-body collision clearance. Check bridge transitions and adjacent upper structures visually. No change to 6.30m pitch, 35 risers, three occupied tiers, material palette, Choir or travel graph.

## Acceptance
Compare visible pulley silhouette from intake and side gallery with linked photo; verify light remains separate. Review wheel, open lower web and pole alignment at close range; refine details against full-resolution imagery when accessible. Walk through stair cage with adult eye/body calibration and verify actual geometry at entry, midflight, landing and both bridge junctions; no head strikes. Future work: physical staircase traversal, full-height screens, open cell, GLB export and actual browser verification. No new playable route or Pages release in this correction.

## Executed checks
596 spatial assertions, 548 planned route samples, 4290 food-hoist assertions (4 rounds, 60 events), JS parsing of level and hoist view. Fetched modules executed via import/assert adapter, not Node CI. No WebGL test, physical sweep or published build.
