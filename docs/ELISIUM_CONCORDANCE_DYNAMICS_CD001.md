# Elisium — Concordance Dynamics and the Mailroom
## Living narrative textbook / architectural RFC CD-001
**Date:** 17 November 2026  
**Status:** Additive proposal; NOT implemented gameplay, not a statement about historical persons.  
**Source authority:** Webspace canonical \`TECH_MANUAL.html\` and \`README.md\`; \`worlds/elisium/kilns/SGM_OBJECT_LAB_v8.md\`; \`worlds/elisium/atlas-data.json\`; surviving Elisium 4.6 literary proxy notes.  
**Core covenant:** Preserve all prior text and interfaces. This RFC adds a new component, not a reinterpretation or deletion of earlier material.  

> The world remembers the player's actions; it does not decide what kind of person the player is. The player can affect a society without authoring its inhabitants.

### 1. Purpose and inherited identity
Elisium begins from the seven-point star, the concentric inner and outer walks, a direction-sensitive Aslan–Tash corridor, the House/Kilns child world, independently timed sky observations, the Concordance Lens, and 24 household objects H01–H24. The v8 Atlas aligns 12 object pairs with 12 schematic zodiac signs and 12 Iranian solar month dedications for pedagogical comparison, expressly NOT as a claim of historical calendrical equivalence. The SGM mathematical textbook remains a **proposed 90-chapter outline**. Its chapter numbers refer to existing pedagogical assignments, not a finished book.

Current source notes describe **64 literary reader-proxies** and a complete potential 64×24 object-reaction surface (1,536 relationships). Their underlying authored data and source distinctions must be migrated and audited before any invented character-level assignment is accepted. The 64 identities are not interchangeable representatives of religions or cultures. Names, provenance, commitments, and authored prior dialogue must survive import unchanged; we add contextual fields, not overwrite biographies. No new NPC roster is invented in this RFC.

The engine is two bounded subsystems: **Elisium Mailroom** (event provenance, state and simulated Matrix-like exchanges in browser SQLite/Wasm) and **Concordance Dynamics** (social practices, influence, reactions, dialogue-act selection, NPC commitments and emerging relationships). Neither is a real Synapse homeserver. A networked Matrix/Synapse bridge is strictly a possible later, separately authorized feature.

### 2. Narrative evolution taxonomy (retain the user's terminology)
| Stage | Capability | Testable distinction |
|---|---|---|
| 0 — map traversal | Diamond, loop, graph of lines | A changed route alone does **not** establish evolved social state |
| 1 — access/milestones | Eligibility, disclosures, gates, breakthroughs | A speaker grants or declines specific access |
| 2 — irreversible choice | Futures acquire or lose reachability | Retrospective history is never rewritten |
| 2a — uncertainty/skill/minigame | Deterministic seeded chance, proficiency, physical skill, evidence quality | Randomness modifies what occurs, not moral worth |
| 2b — countdown | Real-time or fictional-time deadline, with clearly declared clock domain | Missed windows produce alternative stories, not automatic failure |
| 3 — relational reputation | Directional trust, respect, love, cooperation, obligation, grievance | Different NPCs interpret the same action differently |
| 3a — Big Deal / Little Deal | Non-public significance threshold; surface expression can be deceptive | Little Deal: celebratory refusal or response without consequential changed intentions; Big Deal: threshold crosses, consequential commitment recorded |
| 3b — feedback valence | Constructive/destructive praise, criticism, praise under duress, manipulation, promises, lies | Benevolent/malevolent means current **goal alignment** only, not an enduring moral essence |
| 4 — live multi-agent discourse | Participants act on one another, not only on player | Conversation has a floor, audience, interruptions, and independent agency |
| 4a — concession / concurrence / jive / threat | Distinct speech acts with sincerity, credibility and consequences | Spoken agreement != private assent != fulfilled promise |
| 4b — topic/mood-dependent reactivity | Coupling can strengthen, attenuate, reverse or vanish | Mood and relevance may change willingness, not source identity |
| 5 — memory and continuity | Earlier utterances, commitments, word-keeping, evidential updates | Some claims revise, some values resist; no automatic universal persuasion |
| 5a — directed influence lineages and derivatives | Chronological provenance, asymmetrical authority, separation of disconnected branches | **S1 First Singularity:** two independently authored histories generate a persistent relationship pattern belonging to neither NPC alone |

Stage 0 must remain available as navigational infrastructure, but not be advertised as an advanced dialogue engine. Stages 1–2 are mechanics; stages 3–5 are world dynamics.

### 3. Constitutive separations
Keep seven independent layers:
1. **World fact:** an objectively recorded, authorized occurrence with fictional time and cause.
2. **Claim:** a speaker's asserted proposition, which may be mistaken or knowingly false.
3. **Evidence:** observation, document, hearsay, inference, simulated model or source note; provenance and reliability remain explicit.
4. **Private belief:** what an NPC currently considers likely or true, topic-specific and revisable by their own rules.
5. **Public speech:** what an NPC says, including silence, joke, refusal, lie or social performance.
6. **Commitment:** promise, threat, intended travel, obligation or refusal; distinguish declaration from fulfillment.
7. **Relationship:** a directed, topic- and event-sensitive history of trust, respect, care, grievance, familiarity and cooperation.

Never convert the player's single choice into a hidden global "virtue", "religious truth", "humility" or permanent alignment score. Never let the narrator treat a rumor repeated by several people as several independent witnesses.

### 4. Relational and mathematical contract
A contextual reaction is \`R(i,j,s) = F_i(object_j, evidence_i, memory_i, goals_i, world_time, audience)\`. Result includes \`interest\`, \`speech_act\`, \`expression_id\`, \`belief_proposal\`, \`relationship_delta\`, \`commitment_proposal\`, \`itinerary_proposal\`, \`event_proposals\`, and \`refusal_reason\`. Every output has a declared type, eligibility predicate and source/revision identifier.

The first alignment axis \`A_i(q,t) ∈ [-1,+1]\` measures support/obstruction **along the current player inquiry**; it is neither the NPC's goodness nor the truth of a claim. Orthogonal dimensions include trustworthiness *as believed by a particular observer*, evidence confidence, expertise, emotional proximity, social risk, coercion/duress, candor, capacity, attention and willingness to act. A friendly refusal and a strategic favor are both possible.

**Big Deal / Little Deal:** Let salience \`z_i(q,s)\` be a bounded context-dependent summary of novelty, stakes, credibility, commitments and remembered precedent; let \`theta_i(q,s)\` be an authored significance boundary. A Big Deal occurs only when eligible and a threshold is crossed; a Little Deal can have a vivid surface reaction while leaving future access, commitments and material dispositions unchanged. Keep the result unannounced to the player, but inferable from later reliable behavior. Apply hysteresis to prevent cheap immediate reversals, and never make repeated trivial clicks accumulate artificial importance. Individual events remain in episodic logs without magically acquiring causal weight.

**Coupling:** For topic \`q\`, the directed matrix \`C^(q)(t)\` has coefficient \`c_ij\`: influence *of j upon i*. Coefficients may be asymmetric, null or antagonistic. Reactivity depends on fatigue, mood, relevance, social exposure and personal history. A pedagogical sketch is \`Δx_i = η_i[E_i + Σ_j c_ij f_ij(x_j,x_i)] − κ_i(x_i−a_i)\`: evidence, influence and anchoring compete. Clamp all updates; do not extrapolate equations beyond their declared domain. Distinguish scientific model from authored literary analogy. The Friedkin–Johnsen notion of anchored opinions and bounded-confidence variants are useful inspirations, not proven universal behavioral laws.

**Derivatives:** \`dr_ij^(q)/dt\` estimates a directional change in a relationship; positive/negative refer to chosen coordinates, not ethical praise/blame. Second-order trends may support authored observations ("we have grown distant") but cannot alone prove why. Realistic discrete event differences are sufficient; no per-frame integration is required.

**Audience/Hawthorne-like context:** Visibility and observation may change an NPC's expressed conduct. This is a bounded artistic mechanism; empirical "Hawthorne effect" generalizations are debated. Never assume all people become more agreeable when watched.

### 5. S1: the First Concordance Singularity
Define **S1** operationally as the creation of a recurring, persistent *relationship-pattern object* through interactions between at least two independently grounded NPC histories. Neither NPC's solitary biography contains that pattern. It may be rivalry, ritual bickering, creative partnership, mutual correction, strategic alliance or dignity-preserving disagreement. It gains an ID, event history, topic domain, trigger conditions, decay/change rules and non-player consequences; NPC identity remains intact.

For two actors the pedagogical coupling block is \`[[0,c_AB],[c_BA,0]]\`; \`c_AB*c_BA\` indicates a reciprocal loop but does not guarantee oscillation, stability or polarization. S1 is **not** a literal mathematical divergence or consciousness claim: it is an emergent narrative milestone akin to a new attractor/bifurcation when a suitable dynamical system exhibits one. Test S1 by repeating the same seeded scenario and event order, verifying that the relationship recurs while altering a relevant history disrupts or changes it.

Suggested first case: H23 Debate in Two Chairs, with H05 competing evidence, H12 editing and H18 publication. A precision-minded witness and a confidentiality-minded advocate disagree about reporting a potentially identifying letter. They might bicker, cooperatively redact, mutually sharpen arguments, or defend one another against a third party. Don't forcibly make them converge; don't allow endless low-value dialogue loops.

**Reserved, not yet specified:** A future S2 could arise when several S1 relationships create a persistent social practice/institution that survives the original participants. Do not implement or pretend to have demonstrated S2 in this release.

### 6. Mailroom: precise local Matrix/Synapse-inspired emulation
**Architecture:** SQLite's supported WASM build in a dedicated browser Worker; one deterministic game-state writer; read-only snapshots for UI and NPC planners. OPFS is a candidate durable store subject to secure context and backend browser constraints; test OPFS VFS variants and cross-origin isolation on actual deployment. Use a local, versioned bundled database for immutable canon plus a separate player-owned mutable session database. Maintain import/export, migrations, schema-version ledger, and a recoverable last-good snapshot. Browser storage can be evicted and does not synchronize across devices.

**Emulated concepts, not claims of true Synapse:**
- \`room\`: courtyard, correspondence, editorial desk, private session or neighborhood discussion.
- \`membership\`: who may read, send, overhear, invite, leave; no implicit omniscience.
- \`event\`: unique ID; sender; room; logical game time; authoring/schema version; event kind; content payload; provenance; parent/related IDs; visibility.
- \`timeline\`: append-only message order plus causal-parent references, with deterministic conflict handling.
- \`receipt\`: sent, delivered, observed, interpreted and believed as distinct stages.
- \`state event\`: declared membership, room topic or permissions rather than ordinary chat message.
- \`notification\`: public/authorized event enters a character's perceptual queue only when eligible.
These are **simulation contracts**, not Matrix federation, real user accounts, Synapse authentication or cryptographic end-to-end encryption.

**Required conceptual relational schema:**
| Family | Key fields | Rule |
|---|---|---|
| \`canon_identity\` | npc_id, identity_source, provenance_hash, authored_voice_version, immutable_notes | 64 identities must audit successfully |
| \`npc_topic\` | npc_id, topic_id, expertise, curiosity, boundaries | heterogeneous, not one scalar |
| \`npc_claim\` | npc_id, proposition_id, stance, confidence, evidence_set, as_of | private position != spoken claim |
| \`npc_object_response\` | npc_id, H_id, authored_commentary_id, salience, response_modes | 64×24 explicit coverage expected |
| \`dialogue_act\` | act_id, speaker_id, topic, intent, expression_id, precondition_id, effects | authored lines only |
| \`event_log\` | event_id, time, origin_world, causality, visibility, payload_hash | immutable replay authority |
| \`mailroom\` / \`message\` | room_id, sender, recipient_set, reply_to, time, mode, text_ref | private communication bounded |
| \`observation\` | observer_id, event_id, encounter_mode, reliability, acquisition_time | no global knowledge leakage |
| \`belief_history\` | npc_id, proposition_id, before, after, reasoning_ref, cause_event | keep prior views |
| \`relationship\` | observer_id, subject_id, domain_id, trust, respect, care, grievance, obligation | directional and domain-scoped |
| \`commitment\` | promisor, beneficiary, event_id, subject, deadline, status | promise != fulfillment |
| \`itinerary\` | npc_id, node_ids, edge_costs, departure, arrival, valid_until | obey parent-world graph |
| \`storylet\` | stable_id, authored_text_refs, eligibility, exclusivity, consequences | no stochastic prose generation |
| \`relationship_pattern\` | pattern_id, participants, lineage, trigger, phase, status | S1 persistent output |
| \`player_judgment\` | question_id, event_id, selected action, time, revision_of | actions not moral essence |

Minimum versioned API intentions: \`observeEvent(observer, eventId)\`; \`openMailroom(roomId)\`; \`proposeDialogueAct(speaker, actId, audience)\`; \`resolveSocialBeat(beatId, seed)\`; \`getNpcKnowledge(npcId, topic)\`; \`rankEligibleEncounters(playerInquiry, node, clock)\`; \`scheduleNpcTravel(npcId, routeId)\`; \`exportPlayerLedger()\`; \`replayEvents(seed, until)\`; \`explainDelta(eventId)\`. These are API **design names**, not currently existing functions.

**Trust boundaries:** Do not expose local private dialogue/journal in public cross-world event messages. Each child world (Kilns) owns its internal state and publishes only bounded, consented observations under the established Threshold Covenant; the parent owns exterior routes, sky and public time. All historical literary character sources and user-generated content require explicit provenance and appropriate labeling. No external model, network endpoint or third-party GLB may issue privileged state mutations.

### 7. Dialogue-authoring contract
A dialogue unit is a **social act**, not merely a line. Author text in an ink/Yarn-like declarative storylet structure, but this RFC does not require adopting those libraries. Each act declares \`intent\`, \`speaker\`, \`recipients\`, \`audience\`, \`topic\`, \`preconditions\`, \`expressions\`, \`interruption_policy\`, \`state_proposals\`, \`refusal\`, \`fallback_nonverbal\` and \`source_tag\`. Engine chooses which prepared line to deliver; no LLM generates dialogue during play. If no line is legal, choose a genuinely authored silence, gesture, leave, postponement or refusal—not generic explanatory filler.

Distinguish concession (accepts a bounded point), concurrence (independently reaches comparable conclusion), jive (performative or evasive agreement) and threat (coercive speech act). Each may vary by sincerity, credibility and actual follow-through. A high-effort Big Deal and Little Deal can have overlapping visible performances; there is no instant "reputation +4" display. Concession is not conversion. A promise is not action. Public speech can conflict with private belief. Friendly arguments can increase respect despite decreasing agreement.

### 8. NPC autonomy, travel and spotlight
NPCs have authored commitments, topical knowledge, private/public preferences, relationships, obligations, and edge-constrained itineraries. The inner circle privileges private letters, care and unobserved grief; the outer circle privileges public claims, ceremony, institutions and reputations. The Aslan–Tash corridor remains direction-sensitive and narratively special; no arbitrary NPC teleportation or generic traffic through it. A relevant NPC can appear only when their own schedule, geography and choices permit it.

Encounter relevance is a ranking of **eligible** encounters, not a ranking of people: \`score = inquiry_match + knowledge_relevance + contrasting_view + temporal_urgency − travel_cost\`, with explicit author-adjustable weights, anti-repetition and diversity constraints. The player may ignore most or all 64 NPCs; no compulsory 64-person completion achievement. If a critical NPC is unavailable, a letter, missed appointment or alternative witness may still create a compelling narrative. Do not bend NPC dignity to offer every clue on demand.

**Time ownership:** v8 Kilns house minutes and parent fictional minutes are not fully reconciled. Define a shared default elapsed-time contract and optional declared threshold transformation before scheduling society-wide itineraries. Arrival order, countdown and late letters should create alternate histories. The astronomical sky retains its own clock and cannot be commanded by NPCs or household objects.

### 9. The existing twelve pairs: social encounter assignments
Retain these exact established pair IDs and headings, and add character-specific consequences without compulsory order:
| Pair | Existing name | Proposed NPC / world response |
|---|---|---|
| H01+H16 | A Name and a Right to Leave | names and departure debated; refusal remains lawful |
| H02+H22 | A Gift Without a Claim | an offer of hospitality cannot guarantee response or loyalty |
| H03+H17 | The Traveling Light | mathematically trained observer vs poetic witness interpret optical phase |
| H04+H11 | Inherited Messages | chronologists and couriers dispute an inherited time gap |
| H05+H12 | Evidence and Editorial Power | independent testimony survives public editorial framing |
| H06+H07 | The Unanswered Place | mother, messenger, soldier, guests and incomplete evidence remain separate |
| H08+H13 | Myth Beyond Ownership | lineage and adaptation become contested without counterfeit canon |
| H09+H21 | The Unjudging Reflection | learned portrait projection cannot equal personhood |
| H10+H14 | The Road and Its Reflection | route cost competes with viewpoint and testimony |
| H15+H20 | Preserving the Branches | winter shelter and flood narratives compared without false identity |
| H18+H24 | Print and Repair | retraction may repair public consequences but not erase circulation |
| H19+H23 | Zeal and a Second Chair | accelerating conviction counterbalanced by humane disagreement |

The associated schematic Iranian-month and zodiac atlas remains untouched. The 12 SGM analytical engines form a separate methodological layer, not a historically grounded identity between zodiac and Iranian calendar.

### 10. H01–H24 distinct sensitivity and consequence registry
Every H-object must have a **physical affordance**, a unique inquiry, at least one distinctive NPC response mode, a possible relation to another object, an SGM method and a declared limit:
| Object | SGM method and distinctive NPC scenario | Possible bounded consequence |
|---|---|---|
| H01 Threshold with Two Names | §44 topology: philologist challenges name/identity equivalence | optional permission to challenge public label |
| H02 Hospitality Hearth | §16 distributed agency: generous guest refuses debt | warmth, shelter, relational evidence |
| H03 Twelve-Pane Window | §32 basis transform: astronomer vs poet disagree over color | improved recognition, not sky control |
| H04 Stair of Previous Readers | §9 sequence: historian spots missing interval | chronology clue with uncertainty |
| H05 Book of Many Witnesses | §27 Bayesian/residual: witness sources weighted differently | evidence audit, no soul score |
| H06 Unsent Letter | §4 provenance: mother vs courier vs witness | contingent delivery and obligation |
| H07 Two Inherited Cups | §3 counterfactual: hospitality before certainty | reinterpretable absence |
| H08 Story-Repaired Dragon Scale | §54 reconstruction: storyteller contests critic | provenance-tagged myth, not false historical proof |
| H09 Portrait of Absent Reader | §35 inner products: recognition depends on viewpoint | spatially discoverable biography |
| H10 Annotated Map | §42 reachability: fastest vs richest witness route | itineraries/time-sensitive alternatives |
| H11 Correspondence Window | §26 prediction: sender, courier, recipient timestamps conflict | delayed message trajectory |
| H12 Editorial Desk | §37 noncommuting edits: editor vs dissenter | preserved publication versions |
| H13 Wardrobe of Possible Worlds | §48 coordinate atlas: author disputes ownership | child-world threshold with autonomous clock |
| H14 Fireplace Reflection | §33 lab frames: apparent reversal tests invariants | different clue without invented fact |
| H15 Book's Tiny Chapel | §13 outer products: differing hermeneutic branches | incompatible but legible arguments |
| H16 Honest Exit | §86 ethical boundaries: nonbelief and refusal are protected | genuine exit, no penalty |
| H17 Astronomical Orrery | §31 phase: observer predicts, patient visitor checks | learn observation window |
| H18 Printing Press | §28 diffusion: rumor faster than verification | distribution trail, later correction |
| H19 Metronome of Zeal | §24 time derivatives: acceleration vs restraint | hinge moment, delay has consequence |
| H20 Rain Instrument | §29 sampling: keeper distinguishes flood and winter | sourced preservation comparison |
| H21 Vitra in the Glass | §55 learning/uncertainty: model acknowledges missing voices | disclosure of coverage, not a verdict |
| H22 Wren and Crumb | §25 residuals: bird acts beyond player control | optional relationship, no guaranteed return |
| H23 Debate in Two Chairs | §18 agency graph: concession, concurrence, jive or threat | first S1 coupled social pattern |
| H24 Quiet Repairer | §27 residual repair: craftsperson and historian disagree | fix passage, retain damage history |

**Dependency semantics:** \`requires\` (hard physical constraint), \`enriches\` (new reading), \`contradicts\` (claims incompatible without deletion), \`precedes\` (time-sensitive causality), \`excludes\` (mutually impossible state), \`repairs\` (new future, retained damage history). Never model all relationships as a generic binary "unlocked" flag. Every new dependency requires a no-softlock route and authorable fallback.

### 11. First executable narrative laboratory: The Stranger's Second Cup
Initial conditions: H07 has two cups; H06 has a mother's unsent letter; independent military testimony exists elsewhere. Different people have disjoint evidence. The player may investigate H07 then H06, or reverse the order, or leave the house entirely. Fictional time advances with routes and correspondence. An NPC may publicly claim the soldier is safe without knowing it, another may prefer delayed verification, a third may correct the rumor. The mother retains independent mobility and needs. Endpoints should include several satisfying but non-forced outcomes; false certainty is not rewarded; faith is not numerically graded. The sky may be **observed** afterward but not forced to change to endorse a religious position.

An S1 companion experiment in H23 introduces two interlocutors whose independent prior relationships generate a pattern (recurring dispute, begrudging cooperative redaction, mutual defense, or honest disengagement). The pattern continues with or without the player after the event, unless later history changes it.

### 12. Testing and resource budget
- **Preservation test:** compare current canonical manual before and after append; every existing byte before closing \`</body>\` remains in order, and all original content/headings remain; add, never replace, any historical sections.
- **Roster audit:** 64 stable NPC IDs; 24 H-IDs; exactly 1,536 unique NPC/H relationships once imported; no loss of legacy commentary or identity provenance.
- **Conversation replay:** identical canon version, seed, event ordering and decisions produce identical logs and public encounters. Stable tie breaking; no ambient real-time random seed.
- **Observer partition:** a private message not delivered to an NPC cannot enter their beliefs; claimed vs witnessed vs inferred knowledge never silently merges.
- **Big/Little test:** visible enthusiasm may produce no future disposition change; quiet refusal may produce durable commitment. Player receives no immediate badge revealing threshold class.
- **Character dignity:** encounter recommender may rank only eligible meetings; cannot teleport NPCs, change commitments or reveal unknown evidence.
- **Travel clock:** all itineraries use graph weights and reconciled Kilns time; never silently advance sky control; missed appointments yield authored alternate effects.
- **Social test:** S1 persists through a meaningful later encounter, but disappears or transforms if its triggering history is removed in controlled seeded tests.
- **Safety / domain:** test explicit unbelief, contested doctrine, non-equivalence of Aslan/Tash and Islam, privacy of guest journals, and refusal to infer souls/psychological essence from message sampling.
- **Browser performance:** event-driven schedule; one Worker writer; bounded queue and database size; only render NPC interactions when visible or asked to inspect; do not run 64 per-frame social loops.
- **Release validation:** versioned local save migration, exported backups, phone-browser OPFS compatibility, iframe origins, 3D graphical regression, full README/manual update, standalone preview and provenance verification.

### 13. Milestones and known open work
- **CD-001a — Canonical migration:** extract and verify full 64 NPC roster and 1,536 authored object relationships from actual Elisium native 4.6/source notes. Create immutable reference tables with source provenance. No fabrication of unavailable biographies.
- **CD-001b — Local Mailroom:** choose browser-tested SQLite WASM/OPFS VFS; design schema/migrations/event receipts, replay, save/export and privacy.
- **CD-001c — Two Chairs:** two grounded NPCs + optional observer; test levels 0–5, Big/Little, speech acts, mood, audience and S1 persistence.
- **CD-001d — Object crosswalk:** implement truly differentiated H-object social actions and twelve pair dependencies, retaining present physical and educational behaviors.
- **CD-001e — Traveling society:** legitimate itineraries, inner/public distinction, Aslan–Tash restrictions, clock reconciliation and non-coercive narrative spotlight.
- **CD-001f — First nonlinear dramatic complete case:** Second Cup, multiple evidence/arrival orders, witness conflict, irreversible world consequences and several meaningful closure paths.
- **CD-001g — Publish and validate:** source/document diffs, user-facing standalone HTML, regression suites, and explicitly reviewed merge into canonical main.

**Not yet implemented:** this is an authored RFC, not an asserted runtime subsystem. Do not claim live NPC-to-NPC dialogue, OPFS persistence, 64-source migration or full 3D SGM interactions until executable tests prove them. A future real Matrix/Synapse service must be separately consented and deployed.

### 14. Source/provenance index
- Canonical Webspace developer record: \`TECH_MANUAL.html\`; player chronicle: \`README.md\`.
- Kilns pedagogical contract: \`worlds/elisium/kilns/SGM_OBJECT_LAB_v8.md\`.
- Historical twelvefold mappings: \`worlds/elisium/atlas-data.json\`.
- Game theory references for future source verification: StoryNexus / quality-based narrative; ink; Yarn Spinner; Comme il Faut / Prom Week; Versu; Friedkin–Johnsen and bounded-confidence opinion dynamics. These are influences, not integrated dependencies.
- Literary source hygiene: distinguish Lewis canon, source-authored historical prose, critical scholarship, original Elisium fiction and provisional model assumptions. No published work or historical person should be falsely quoted.

### 15. Additive maintenance covenant
Each update receives an immutable dated appendix and its own stable RFC/revision ID. Preserve earlier ideas even if temporarily inactive. Never overwrite original NPC commentary, object taxonomy, portal semantics, player-local privacy, or the independent sky. Distinguish player-facing change from developer implementation and tests. Update both Webspace \`README.md\` and \`TECH_MANUAL.html\` when code or official project records change; retain old entries verbatim. Keep the authoritative editable master in source control, while a Vitra Google Drive Google Doc provides accessible review and Google Docs' automatic edit history. Future edits are **only performed when explicitly requested in a new turn or authorized through a scheduled task**; a stored document does not automatically update itself.
