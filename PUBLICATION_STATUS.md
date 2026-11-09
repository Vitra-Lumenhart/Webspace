# Webspace v4 publication status

Publication date: 2026-11-09

## Repository state

The complete unified **editable source tree** for five separately built Webspaces is committed, including the individual Chuzhoy, Gerudo Fortress, Gringotts, Witch's Hole, and Elisium launch pages, renderer modules, curated asset manifests, cathedral Rev06 CAD and GLBs, and twenty-four generated Kilns GLB proxy models.

The public root `index.html` is the independently browser-tested one-file five-world federation preview, intentionally replacing the smaller root source entrypoint. The complete unbundled root entrypoint is retained as `source/root-index.html`. The original single-file preview also appears as `webspace_standalone_preview.html`.

The full predecessor source archive is under `history/version_0003.zip`. The full v4 source ZIP snapshot is also supplied as a numbered downloadable artifact in the ChatGPT Webspace project conversation. Git's immutable v4 commit records the source tree. The v4 ZIP itself was **not** added to this repository due the GitHub connector's large-binary transfer limit.

## Deliberate limitations

- The actual Poly Haven artist model binaries were not accessible or imported; the 24 `assets/kilns/proxy/H01.glb` ... `H24.glb` are newly generated low-poly original placeholders. Provenance and optional acquisition helper are in `assets/kilns/`.
- Elisium's v4.6 compact self-contained runnable engine is included as `worlds/elisium/elisium_native.html`; its separately indexed v4.6 8.3 MB *complete source ZIP* was not materializable and is not claimed to be present.
- Gringotts currency, credentials, Proton interfaces and storage are fictional front-end prototypes; real user data must never be entered in them.
- For a public GitHub Pages URL the repository administrator may need to enable Pages publishing from `main` and `/(root)`. Source publication and Pages activation are distinct.
- `FILE_CHECKSUMS.json` verifies the standalone release ZIP source snapshot; the published root `index.html` is intentionally the self-contained bundle variant.
