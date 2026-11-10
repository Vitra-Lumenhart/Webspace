# The Kilns · child world

An independently navigable **illustrated indoor graph** of the fictional House of Inherited Light within Elisium. Twenty-four instruments (H01–H24) are selectable and record local session observations. This is not yet a 3D furnishing or the full v0.6 Kilns artist package.

`world.json` defines the threshold; object JSON in `objects/` is an editable projection of the asset bank. Runtime data is bundled in index.html for offline operation and must be regenerated or updated when object JSON changes.

Storage: sessionStorage only; optional local JSON export; no server persistence. Child emits `webspace:child-event` to a hosting parent, but the parent-sky game does not yet consume it.
