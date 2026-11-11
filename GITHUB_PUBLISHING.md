# GitHub target — Vitra-Lumenhart/Webspace

Repository: https://github.com/Vitra-Lumenhart/Webspace
Public playable atlas (verified): https://vitra-lumenhart.github.io/Elisium/webspace/index.html
Canonical editable codebase: https://github.com/Vitra-Lumenhart/Webspace/tree/main
Direct Webspace Pages site: https://vitra-lumenhart.github.io/Webspace/ (not enabled; do NOT advertise as an active public game)

The historic separate Elisium repository currently provides the publishing mirror, not the authoritative Webspace source. Its static mirror is synchronized intentionally from reviewed Webspace main, with the copied source commit recorded in the mirror ORIGIN.json. The source repository remains the only place to edit worlds. GitHub's Projects tab shows planning boards and Releases shows archived ZIPs; use the Code tab for editable files. Do not delete the older Elisium repository while this public site depends on its active Pages service.

This is a public static game source; it must not contain credentials, real proton tokens or real bank ledger data.

1. Archive current `main` before replacing; preserve `history/version_0003.zip` and the new integer archive.
2. Upload the CONTENTS of the unified release ZIP, not the outer folder.
3. Commit the complete tree atomically to `main` (or review on a PR before merging).
4. Settings → Pages → Deploy from branch → main → /(root).
5. Open all five direct routes, confirm asset requests, both portal directions, 24 GLBs, and that all prototype finance actions are clearly labeled.
6. Re-check `README.md` and `TECH_MANUAL.html` every change.

Until a successful commit is verified, this file is a staging plan, not proof of a deployment.

## v6 source and asset publication

New version 6 retains the GitHub source/main and world entry URLs. The latest Kilns supports an opt-in Poly Haven source viewer: worlds/elisium/kilns/index.html. See assets/kilns/LIVE_ART_AND_BATCH.md. GitHub Actions downloads and verifies the single 20-source/24-role CC0 archive; after merging the integration, it publishes a versioned GitHub Release (no user upload required). The live inspector checks Poly Haven for newer files at click time, while the archive is deliberately a frozen version. The builder records checksum and original source provenance. This is optional 3D source inspection; the illustrated Kilns gameplay and independent sky are not changed.

Source version tags webspace/v0005 and webspace/v0006 are created by the release workflow only after a successful approved main workflow. Verify the tags and release rather than assuming they exist from this text alone. Keep README and TECH_MANUAL's matched dated ledger entries as mandatory part of each update.
