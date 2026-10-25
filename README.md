# Webspace — Garden of Chuzhoy canonical landing

**Migration in progress.** The existing GitHub Pages `index.html` is a small placeholder from the earlier v3 publication, **not the playable game**. The full 6.2.1 game and its modularized GitHub Pages source are available as `Webspace_GitHub_migration.zip` in the ChatGPT project conversation. That ZIP must be extracted and its **contents** committed to this repository root before the live Garden will work.

## New canonical entry
- `index.html` redirects to `garden-of-chuzhoy.html` in the prepared package.
- `garden-of-chuzhoy.html` starts in the Garden, not the Fortress.
- `engine/canon.js` establishes inherited contracts for portals, screens, graph travel, and actions.
- `fortress/` is an explicit alternate landing; `witchs_hole/` preserves an independent Witch's Hole v2 renderer.
- `WORLD_MANIFEST.json` documents the world relationships.

## Publish
1. Download `Webspace_GitHub_migration.zip` from the project conversation and extract it.
2. Upload **all extracted files and folders** to the root of this repository on `main`, replacing the placeholder `index.html` and this README.
3. Set **Settings → Pages → Build and deployment → Deploy from a branch → `main` → `/(root)`**.
4. Open `https://vitra-lumenhart.github.io/Webspace/` and verify that the Garden loads.

**Status:** The canonical engine scaffold and manifest have been committed. The multi-megabyte game source and art assets are packaged but **not yet uploaded to GitHub**. GitHub Pages is therefore not yet a playable deployment.

## Growth model
The Garden is the conservative onboarding canon, not a demand for uniform presentation. Descendant worlds may replace their HUD, physics, visual grammar, and renderer while preserving clear, explicit portal consent, visible action semantics, and separation between sandboxed screens and navigation. The current integrated renderer is a migration bridge; full scene-module inheritance remains a later refactor.
