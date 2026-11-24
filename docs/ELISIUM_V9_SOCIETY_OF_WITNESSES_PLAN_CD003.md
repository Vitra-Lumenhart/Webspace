# CD-003 — Elisium v9 Implementation Plan: The Society of Witnesses

**Planning record:** 20 November 2026 · **Status:** Proposed, not implemented or released · **Source:** accepted Webspace v8 main and existing draft CD-001/CD-002.
**Scope constraint:** An Acropolis **Protocol**, not an Acropolis place or physical stone. One public discussion per eligible existing graph node; multiple different or identical topics may be active across different nodes. No requirement that every node always hosts a discussion.

## 0. Verified current implementation and debts

- Main \`VERSION.json\` declares integer 8; \`WORLD_MANIFEST.json\` identifies Elisium native 4.6 + accepted sky v8; its renderer is a compressed standalone \`worlds/elisium/elisium_native.html\`, with a wrapper \`worlds/elisium/index.html\` / \`sky-atlas.js\`. Do not hand-edit the compressed HTML payload.
- The parent adapter uses existing \`ELISIUM\` functions and state including \`nodes\`, \`edgeList\`, \`getState()\`, \`go()\`, \`fastestRoute()\`, \`houseLens\`, and \`sky\`. Integrate via stable, versioned adapter functions rather than monkey-patching internals indiscriminately.
- The child \`worlds/elisium/kilns/house3d.mjs\` keeps a local fictional clock (+3 minutes room changes, +6 minutes examining objects) and records public H01–H24 observations through \`threshold.js\` v1. \`sky-atlas.js\` consumes the handoff on return. Full elapsed-time reconciliation with native Elisium and durable reload persistence remain open.
- The original 64 reader proxies are referenced by the native engine and manifest but complete identities and authored reactions are not individually audited. The canon audit is a gate before selection of six actual prototype NPCs.
- Existing R0016/CD-001 and R0017/CD-002 remain draft documentation in review PR #13; neither is currently a shipped social runtime. Preserve older text, twenty-four physical object effects, twelve object pairings, six distinct world entrants, native independent sky and current right to exit.

## 1. Release thesis / target demonstrator

**Proposed release:** Webspace v9, Elisium social vertical slice.
Demonstrate six sourced NPCs on at least three existing nodes, at least two simultaneous public discussions, four closely integrated Kilns instruments (H05 Book of Many Witnesses, H20 Rain-Catching Instrument, H23 Debate in Two Chairs, H21 Vitra in the Glass), and one optional actual message/invitation mechanism (H11 Correspondence Window; use H18 Printing Press as a later extension if necessary). Existing H01–H24 remain visible and interactive with unchanged original effects. No new Acropolis asset or node.

A complete player test: arrive at one local discussion; observe multiple NPC turns and gestures; investigate H05 or H20 in Kilns and acquire a learned method; return with one substantive interjection; NPCs continue on their own; a participant voluntarily proposes reconvening at a separate legitimate node; others independently follow, decline, or depart; a related disagreement persists at the original node or a second node; the Mailroom proves how events reached each NPC. Replaying from the same snapshot and seed yields the same semantic event history.

## 2. Sequenced implementation work packages

### V9-A — Source audit and archival (blocking)
1. Preserve existing \`main\` v8 source, tags, manifests and tests; begin in an isolated feature branch after review of PR #13, without merging that PR prematurely. Do not retag existing releases.
2. Recover source data from native 4.6's compressed payload and older asset banks; inventory all 64 stable literary identities, voices, relationships, provenance flags and existing authored dialogue; record unknown data as UNKNOWN rather than inventing it.
3. Audit all twenty-four object IDs/actions and twelve named pairs against \`assets/kilns/OBJECTS.json\`, \`worlds/elisium/kilns/world.json\`, \`worlds/elisium/atlas-data.json\`; confirm exact topology and legal route times from the live native graph. Choose six sourced NPCs for a diversity-of-responses test only AFTER audit.
4. Prepare an explicit documentation-to-runtime crosswalk, schema version and reversible migration plan. If authored native source cannot be reconstructed faithfully, implement adapter against published runtime API without editing the compressed core and mark unsupported interactions deferred.

**Gate:** 64 IDs accounted for or a clearly documented missing-source exception; no unexpected NPC or object removals; v8 browser baseline passes.

### V9-B — Parent-world adapter and time contract (blocking)
Add \`worlds/elisium/concordance/native-adapter.mjs\` with read-only access to node IDs, legal edges, route/travel times, current parent fictional time, sky observations and bounded Kilns reports. Do not create duplicate authoritative map coordinates, redesign the seven tips, or override the sovereign sky.

Define monotonic **social fictional time** driven by parent travel and explicit child elapsed minutes. Record clock domain on every event. Reconcile the Kilns' +3/+6 clock with social schedules via a once-consumed, idempotent duration receipt, without calling sky mutators. Handle pause, re-entry, refresh, manual tab suspension, delayed NPC departures and expired invitations. If the parent native clock cannot advance safely, use a single documented social-time offset adapter instead.

**Gate:** returning from H05 examination advances social schedules exactly once, parent sky change is never falsely attributed to an object, and old v1 handoff remains compatible.

### V9-C — Mailroom 0.1: durable, witnessed, causal state
Design \`mailroom.worker.mjs\` and versioned SQLite/Wasm schema with tables for immutable canon refs, event log, observation/receipts, directed relationships, participant beliefs, local forum state, topic propositions, invitations/commitments, routes, player evidence and learned methods. Test browser-compatible Worker OPFS; provide a bounded, explicitly marked memory/session fallback if storage is unavailable. Browser records are local and exportable; never imply actual Matrix federation or private communication encryption.

Each event has unique ID, source and source version, social time, node, sender, participants, evidence refs, visibility, allowed observers, causal parents, seed, state changes, and player-involvement flag. NPCs know only events delivered, heard, witnessed or properly inferred. Distinguish testimony, hearsay, belief, spoken assent and actual commitment.

**Gate:** export/import restores same history; an undelivered private message does not leak knowledge; semantic replay is deterministic; legacy observations still load.

### V9-D — Acropolis Protocol 0.1: concurrent intranodal discourse
Implement one conversation slot per eligible node with states \`dormant\`, \`forming\`, \`active\`, \`adjourned\` and \`closed\`; a node can be silent without artificial ambient chatter. Each discussion records a topic, current question, propositions, floor owner, participants, listeners, prior contributions, speaker queue, urgency and fatigue.

An agent present at node may request to speak with a typed act: hypothesis, analogize, fantasize, ask, claim, demonstrate, rebut, concede, concur, evade/jive, promise, decline, invite to relocate, or withdraw. Speaker eligibility ranks relevance, local expertise, desire, novelty, recognized seniority and anti-monopoly penalty. The player gets **one substantive intervention per issue**, re-enabled by genuinely new evidence, proposition or question, never by repetitive clicks.

Run at discrete social beats, not per render frame. For offscreen nodes, resolve terse semantic acts rather than generating expensive full prose. When a node is already occupied, an arriving group can request to join, wait, divert or abandon; never run two public conversation slots at the same node simultaneously.

**Gate:** two distinct local conversations advance without player involvement, issue resets cannot be exploited, no global speaking podium exists.

### V9-E — Coupling, flocking and autonomy
Define sparse object→affordance, NPC→theme, station→topic, signed directed NPC→NPC influence, and small authored NPC→object signature overrides. Preserve all 24 objects' inherited actions and twelve pairs. Begin each NPC with 2–3 evidence-grounded signature object resonances and 3–6 potential secondary relationships; do not automatically fabricate 1,536 personalized biographies.

Independent movement decisions consider curiosity, direct invitation, social attraction/avoidance, topic relevance, sky observations, known gossip, fatigue, legitimate route time and existing obligations. Hysteresis/cooldowns prevent rapid ping-pong; no free teleport. Each person separately chooses to follow an adjourned debate, stay, approach an opponent, investigate or leave. Opposite camps arise from conflicts over propositions, not static religion-coded factions.

S1 First Singularity requires persistent reciprocal emergent pattern (rivalry, sparring or collaboration) evidenced through repeated witnessed events and later autonomous action. Coupling alone does not mathematically guarantee polarization, cycles, attraction or group formation.

**Gate:** independent travel decisions; two NPCs may disagree while increasing respect; an S1 relationship persists across later encounters but changes when its triggering history changes.

### V9-F — Kilns as player growth rather than key inventory
Maintain five distinct ledgers: physical inventory, evidence/provenance, learned techniques (Inspiration/Insight/Intrepidity), social history/commitments, world interventions. Add versioned H-object result payloads alongside the v1 ID/time receipt (never transmit private raw house journals). First deep labs:
- H05 produces a source-dependency/evidence challenge method.
- H20 teaches polling frame, nonresponse, wording effects, shared source and confidence limits; do not infer all NPC opinions from a node's self-selected crowd.
- H23 is a two-chair controlled practice of turn taking, concession, meaningful refusal and repeated-game consequences.
- H21 explains why a social prediction has uncertainty, missing observations or alternative causes; cannot read minds or pronounce religious verdicts.
- H11 optionally delivers permitted invitations between nodes with delays and receipts; this is neither real Matrix nor an unlimited broadcast.
All other H objects retain their current physical interactions and names, with data scaffolding for later enhanced affordances. Make v9 useful even if a player never visits the Kilns.

**Gate:** learned techniques cause a new eligible player action at a relevant node, not an automatic persuasion bonus, sky mutation or instant universal trust.

### V9-G — Expressive dialogue, UI and accessibility
Define separate \`dialogue-provider.mjs\` and a typed intent/utterance interface. The deterministic state engine authorizes knowledge, action and effects before any prose is committed. Start with local, curated or batch-LLM-generated lines and reusable gestures; optional real-time remote LLM discourse may come later only with a clear network-data disclosure and fallback, so gameplay does not require an untrusted API or paid inference to function. The LLM can propose hypotheses or metaphors but cannot fabricate privileged testimony, secrets, irreversible commitments or historical sources.

Keep graphics cheap: screen-space speech/subtitle panel, current floor, visible listeners/gestures, one highlighted topic, possible contribution affordances, and a quiet route to depart. Preserve existing WebGL/Canvas fallback and 2D portrait visual source of truth; avoid heavy new 3D character imports in v9.

**Gate:** browser and touch input usable; no dialogue overlaps/flickers; reduced-motion and text-only presentation work; network failure does not stop the social simulation.

### V9-H — Verification, publication and preservation
Add targeted tests for source audit, node discussion invariant, social beats, knowledge partition, invitation delivery, late arrival, save/load migration, child clock idempotency, no sky control, protected refusal, and source/fiction boundaries. Extend existing \`tests/test_elisium_atlas_v8.mjs\`, \`tools/test_elisium_v8_browser.mjs\`, Kilns tests and portal regressions; do not delete or soften existing v8 assertions. At release gate, update \`VERSION.json\`, \`WORLD_MANIFEST.json\`, root README, TECH_MANUAL and affected Kilns docs with matching R0018+ backward/forward records; deliver standalone HTML preview, editable source diff, validated QA screenshots and rollback.
Only after review should version_integer advance to 9 and any immutable \`webspace/v0009\` archive/tag be created; no claim of public Pages parity until verified against actual hosted routes.

## 3. Minimal source plan (proposed; paths do not exist yet)
\`\`\`
worlds/elisium/concordance/
  native-adapter.mjs
  social-core.mjs
  acropolis-protocol.mjs
  topic-engine.mjs
  npc-roster.json
  npc-affinities.json
  affordances.json
  itineraries.mjs
  dialogue-provider.mjs
  mailroom.worker.mjs
  mailroom-schema.sql
  concordance-ui.mjs
  concordance-ui.css
tests/test_elisium_social_v9.mjs
tools/test_elisium_social_v9_browser.mjs
\`\`\`
Avoid modifying \`elisium_native.html\` directly if it remains a compressed generated artifact. The v9 wrapper should attach the new component to the existing native \`ELISIUM\` surface through an explicit, constrained adapter.

## 4. Explicitly deferred beyond v9
Full 64 NPC concurrent simulations with comprehensive verified provenance and dense dialogue coverage; all 24 deep H-object minigames; automatic institutions S2; all seven node discussions continuously voiced; live Matrix/Synapse federation; shared account identity; automatic remote LLM speech; authoritative historical/theological arbitration; external analytics/personalized psychological scores; cross-world private journal transfers; full 3D NPC rigs. These remain possible v10+ follow-ups, not erased work.

## 5. Risks and mitigation
- **Native 4.6 is compressed:** build adapter plus immutable provenance manifest; preserve exact executable payload and tests.
- **Handoff version is v1 and shares sessionStorage:** add typed new event receipts in a versioned channel; validate origin/source/ID and deduplicate by event ID, do not broaden v1 silently.
- **Sky vs house fictional time:** separate social scheduling advance from celestial authority; verify replay and wrap-around behavior.
- **Hallucinated LLM claims:** state authorizes typed acts, limits factual assertions and tracks source; generated language cannot mutate ledgers without validation.
- **Network/privacy:** default local dialogue and persistence with offline fallbacks; do not transmit raw private H06 letters to external inference.
- **Emergence quality:** use behavior and diversity tests, not simply number of turns; ensure silence, refusal, new inquiry, and constructive disengagement are valid outcomes.

**No code, source asset, canonical main version, public deployment or gameplay was changed by this planning record.**


## CD-003 additive implementation addendum · 24 November 2026 — Labyrinth hidden machines
The 20 November plan above is preserved unchanged. Following the same-project Labyrinth discussion (“The Invisible Machines of Conversation”; Bellsmith's hidden multidimensional puzzle, durable subnetworks, time/geography/commitment conjunctions, stable resting viewpoints, one start/many coherent endings), the v9 architecture has been **extended**: nonlinear NPC-private state-machine logic becomes foundational; the Acropolis Protocol couples distinct individual machines locally; the Kilns teaches techniques that expose or alter available transition options without granting control over personalities; the Mailroom records causal history and visibility.
An executable **six-proxy candidate** has now been built in \`worlds/elisium/concordance/\`, integrated additively into the original Elisium wrapper, and documented in [CD-004](ELISIUM_HIDDEN_MACHINES_CD004.md). A network-free standalone mechanics [preview](../worlds/elisium/concordance/preview.html) and local Node test exist. This is not a finished 64-NPC release; original character provenance, physical on-screen NPC presence, exact canonical route times, world-clock reconciliation, SQLite mailroom, full emergent S1, optional validated LLM speech and complete release QA remain gates before acceptance.
