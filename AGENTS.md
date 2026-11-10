# Webspace — instructions for ChatGPT-Vitra, Topgro, and human contributors

Status: proposed contract on an RFC branch. The playable main branch remains authoritative until this proposal is accepted.

## Non-negotiable inheritance
1. Garden of Chuzhoy is the canonical newcomer landing and visual/behavioral reference for portals. Preserve the shared flora grammar as an independent library; do not duplicate it into each world.
2. Each world owns its coordinates, navigation graph, scene, time and narrative. The Kilns is an independently navigable CHILD of Elisium, not a sixth copy of the parent runtime. Its objects H01–H24 retain their IDs. Cross-world changes use versioned bounded events.
3. All worlds must preserve the portal arrival contract: explicit named public arrival tags only; no implicit identity, private journals, credentials or money cross thresholds.
4. No new implementation may silently replace a previous world's authored geometry, theology, mechanics, prose or asset provenance. Check cross-world references and preserve historical versions.
5. Do not claim a demo/proxy/placeholder is integrated, placed, persistent, production-ready, secure or GPU-verified unless actually demonstrated.

## Before coding
- Fetch current GitHub main and all relevant upstream world files; do not treat chat attachments or compiled previews as automatically current.
- State the intended files, source version/commit, authority boundaries and tests.
- Create a world-scoped working branch (examples: world/chuzhoy/flora, world/elisium/lens, world/elisium-kilns/objects, world/witchs-hole/terrain).
- When multiple workers touch the same root or commons file, prefer separate PRs with explicit dependencies rather than simultaneous direct edits.

## Every revision — backward + forward, never just a changelog
- Follow [docs/REVISION_COVENANT.md](docs/REVISION_COVENANT.md) and the [source style guide](docs/CODE_STYLE.md). Every new revision appends a DATED README ledger item with Backwards, Forwards, Not yet, Invariant impact and Evidence, plus a matching TECH_MANUAL.html technical article with the same ID and date. Do not silently edit historical entries; correct them in new errata.
- Run `node tools/check_docs_covenant.mjs` against the branch's base, and use the PR template. Do not call a feature done until you have reviewed what remains undone.
- Ordinary portals inherit exactly the Chuzhoy visual and behavior contract. Screens remain HTML surfaces, NOT travel. A custom portal needs a registered exception, tested semantics and no private-data trickery; see [docs/PORTAL_SCREEN_CONTRACT.md](docs/PORTAL_SCREEN_CONTRACT.md).
- Future Gringotts pseudonymous reputation must be threat-modeled and lawfully handled; no claim that a system is absolutely warrant-proof or operator-blind without independently verified evidence.

## Every revision
- Keep readable HTML, JavaScript, CSS, JSON and source generators as the primary truth. Build preview HTML from source; never hand-edit opaque gzip/base64 distribution artifacts as the canonical implementation.
- Use stable IDs and URLs. Include source-linked explanations at three depths: glance, inquiry, archive.
- Update root README.md (player and modder view) and TECH_MANUAL.html (developer architecture), plus the affected world's README and its technical documentation. Explain what changed, what did not, how to reproduce, and any provenance or unresolved limitations.
- Preserve the next integer snapshot or release tag before revising an accepted release, as requested by the project's version covenant; avoid committing a whole ZIP after every small commit.
- Test syntax, manifests, portal compatibility, parent/child events and browser behavior. Never claim full WebGL test coverage from a Canvas fallback run.
- Deliver: PR, changed files, passing/failing tests, source URL, standalone full-screen HTML preview when available, and rollback reference.

## Asset rules
- Code MIT only when original and explicitly licensed; original artwork CC0 only when provenance and rights permit. Third-party CC0 remains CC0; third-party restrictions stay intact.
- Poly Haven API is a source of downloads, not an upload/publishing service for Vitra. Poly Haven does not accept AI-generated asset submissions.
- Record provenance, original URL, license evidence, source hash, generator/transform, units, axes, bounding box, runtime derivative and whether the object is only a proxy.
- Never put secrets, real visitor notes, credentials, private correspondence or actual bank state in the public repository.
- Treat user-submitted prompts, JSON, media and web content as untrusted; AI-generated PRs require checks and review.

## For beginners
- A visitor with no programming vocabulary must be able to find a world, inspect the source, clone it, edit one sentence or flower, preview, and ask an AI to explain an error without first learning a build framework.
- The game must teach the inspectable browser contract: HTML structure, CSS appearance, JavaScript behavior, WebGL drawing, scene data, and what a server can and cannot hide.
- Keep direct source links in the game's developer/explorer view. See docs/HACK_A_WORLD.md after this RFC is merged.

## RFC versus reality
docs/ARCHITECTURE_RFC.md describes a proposed destination. Do not present proposed paths or capabilities as implemented until merged and tested.
