# Webspace · six world addresses and one nested indoor world under one root

> **Revision covenant for human and AI collaborators:** Before changing a release, archive the entire old codebase under the next integer revision. In EVERY revision update `README.md` (player experience) and `TECH_MANUAL.html` (developer architecture and tests); preserve timeless active filenames and provide a full-screen HTML preview.

## Version 5 · 10 November 2026

The root `index.html` launches a playable Garden immediately with a seven-entry selector. The additional `webspace_standalone_preview.html` is a **single-file** seven-entry preview for ChatGPT; it embeds independent engines and uses Canvas compatibility versions in GPU-restricted panels. For direct launch use the separate entrypoints below. Each has its own canvas/runtime and may be developed independently. In GPU-restricted previews, Chuzhoy displays its older Canvas-compatible Garden and Witch’s Hole displays a simplified Canvas-based survey (including the root puzzle).

| World | Direct page | Engine/source | What the visitor does |
| --- | --- | --- | --- |
| Garden of Chuzhoy | `worlds/chuzhoy/index.html` | Chuzhoy 6.2.5.1 self-contained QA build | Explore the canonical Garden, flora, portal connections and route mechanics |
| Gerudo Fortress | `worlds/fortress/index.html` | Preserved Gringotts-era v3 renderer | Approach the throne and its rear banking portal |
| Gringotts Gerudo Branch | `worlds/gringotts/index.html` | Same code lineage but separate launch / initial node | Visit tellers, paper contracts, calendar, fictional ledger and Proton service gallery |
| Witch's Hole | `worlds/witchs-hole/index.html` | Independent Ravine Cliff v2 engine | Traverse 10 sites, break roots, follow the fog, return to Garden |
| Elisium | `worlds/elisium/index.html` | Independent v4.6 compact playable HTML | Explore the star, the Kilns, Concordance Lens and its independent sky |

**Controls:** Use each world's visible travel and look controls. The compact `◈ WORLDS` button near the bottom right opens a cross-world directory. External transitions use only public named arrival tags, not identity, credits, browsing history or passwords. Worlds do not pretend to share an authentication server.

### The Kilns: twenty-four models

`assets/kilns/index.html` lists all H01–H24 with their names, room locations, behavior, optional Poly Haven candidate links and an **actual low-poly GLB proxy** each, generated for this release. These placeholders are not the original Poly Haven artist assets and are not automatically placed into the Elisium v4.6 interior.

No download is needed **before publishing this package** to GitHub. If you want realistic Poly Haven furnishings, you do need to download the selected models (unique models can serve multiple H objects) or allow an authenticated download workflow with a reachable network. Poly Haven originals have not been fetched into this package. An explicit optional `assets/kilns/acquire_polyhaven.py` script records the acquisition method.

### Release limitations

- These are five valid browser entry points and a shared navigation hub, not yet a single reconciled physics/graphics engine. Chuzhoy 6.2.5.1 and the older Gringotts-era renderer have intentionally not had their different botanical/geometry branches silently merged.
- Gringotts's registration, digital currency, secure storage and Proton service controls are creative demonstration UI, not real banking or private storage. **Never enter real credentials.**
- Elisium 4.6 was recovered as a complete self-contained compact playable HTML, but its separate 8.3 MB source archive and Kilns v0.6 ZIP were indexed in the Library without authorized downloadable backing bytes. They remain separately tracked as upstream sources, NOT dishonestly represented as present here.
- Poly Haven catalog entries are source references. This package contains 24 generated original low-poly proxies, not Poly Haven original binary downloads.
- Cathedral Rev06 is included as independent reusable asset source with STEP, GLB, and stained-glass textures; not installed as a sixth playable world.
- Static GitHub Pages is not a trusted backend. Persistent multiuser identity/private vaults require separate secure architecture.

### Publish

Publish this **root directory**, not its outer ZIP folder, to `Vitra-Lumenhart/Webspace` on `main`. Settings → Pages → deploy from branch `main` → `/(root)`. Expected URL: `https://vitra-lumenhart.github.io/Webspace/`. A successful GitHub commit and Pages deployment must be separately verified before anyone calls the site live.

## Source provenance

Predecessor `history/version_0003.zip` is the complete earlier Gringotts-era source. The Garden native build came from the newest retrievable 6.2.5.1 QA HTML; Witch from the actual v2 Ravine Cliff ZIP; Elisium from v4.6 compact playable HTML. See `TECH_MANUAL.html`, `WORLD_MANIFEST.json`, `assets/kilns/OBJECTS.json` and the source-history integrity test.

### Child world: The Kilns

`worlds/elisium/kilns/index.html` is now a navigable **illustrated indoor room graph** (ten room names, 24 selectable object interpretations, local observation journal and explicit return to parent). The exterior Elisium page exposes an Enter the Kilns threshold. It is NOT yet a furnished 3D space or fully connected to its parent sky. Object proxy GLBs are still in `assets/kilns/proxy/`; the optional v0.6 external Kilns source archive could not be exported from the Library and is not represented as included. The child is independent at URL and runtime level; a bounded `postMessage` can announce observations when hosted, and the parent does not yet apply their effects.

### Labyrinth of Purgatorio

`worlds/purgatorio/` reserves a **non-playable** world with an index page and manifest. No detailed mythology, navigation, or mechanics were present in the accessible source materials, so none have been invented.

### Storage and collaboration

GitHub `Vitra-Lumenhart/Webspace` is the public canonical source. Preserve previous release archives and both manuals. Project ChatGPT files are reference material, not an automatically synchronized bidirectional workspace. Save editable code and manifests in Git; place large artist originals/texture libraries in Git LFS or versioned object storage; write mutable visitor journals to a separate opt-in backend with retention/export/delete controls (do not commit personal journals or credentials). GitHub Pages is static and cannot implement multi-user guestbook persistence alone. See `docs/STORAGE_ARCHITECTURE.md` and `docs/CONTRIBUTOR_ACCESS.md`.
