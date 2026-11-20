# CD-002 — The Kilns as a Sparse Semantic-Affordance Engine
**Additive design study · 20 November 2026 · status: PROPOSAL, not implemented**
**Source documents inspected:** Webspace assets/kilns/OBJECTS.json, assets/kilns/CURATOR_TABLE.md, worlds/elisium/kilns/SGM_OBJECT_LAB_v8.md, worlds/elisium/atlas-data.json, worlds/elisium/kilns/README.md, and CD-001 on the existing draft branch. None of the twenty-four original titles, physical actions, source candidates, existing twelve pairings, original mathematics, book references, prior propositions, independent sky, privacy limits or historical content is superseded by this RFC.

## First principle: Objects teach verbs, not unlock codes
Each H-object supports a **physical action**, an **interpretive learning method**, a **bounded observation or intervention** and potentially a **social consequence**. These are separate: a player may discover a method without acquiring a physical token, and may apply a learned method in a conversation without persuading any NPC. An NPC can observe the action without recognizing the philosophical significance; another can infer a consequence only through an authorized message or evidence source.

Player capabilities are organized into three clusters: **Inspiration** (new connections, hypotheses, analogies, proposed experiments), **Insight** (evidence provenance, framing, uncertainty, histories, and counterexamples), and **Intrepidity** (informed, voluntary action despite uncertainty, with right of refusal). These are technique families, not a single XP meter or fixed numeric moral attributes. Repeated interaction should develop understanding through practice, not increase scores by repetitive clicks.

Player state is four ledgers, not one bottomless inventory: (a) physical objects under authorized possession; (b) evidence and provenance, including read/seen/heard/claimed distinctions and permissions; (c) learned methods and demonstrated competencies, including inspiration, insight, intrepidity and contextual suitability; (d) social history, actions and commitments, including whom the player informed and what the witness actually observed. Avoid carrying away unique H-objects that constitute fixed architecture.

## Affiliation policy for sixty-four NPCs
Each NPC begins with **two or three individually authored signature H-affinities** (one personally consonant, one provocative/frictional, optional one transformative), plus **three to six weaker contextual thematic resonances** when supported. With 64 NPCs this yields approximately 128–192 signature relationships and about 192–384 initially secondary affinities, not a mandate to spread attachments uniformly across all objects. The remaining NPC/object combinations remain meaningful through general method affordances and momentary context, but should not pretend to be 1,536 hand-authored bespoke reactions. Existing original 4.6 commentary must be separately imported and preserved if it is present; the complete source roster has not been individually audited here. Avoid inventing historical NPC quotes or permanent religious/faction labels.

There are three orthogonal object capability tiers: **universal procedure** (e.g. H05 source comparison, H12 revision chain, H16 protected refusal), **selective biographical resonance** (e.g. H06 letter, H08 dragon scale, H15 chapel), and **environmental/network intervention** (e.g. H02 hospitality signal, H11 delivery, H18 print dissemination, H24 physical repair). Any H-object can overlap tiers. Universal procedure means the rules of access are the same for all NPCs, NOT that everyone changes belief in the same direction.

## Sparse compositional formalism
Author several sparse matrices rather than one dense 64×24×7×context tensor:
- Object-to-affordance O[24,K] specifies a small set of available techniques, events and provenance types per H-object.
- NPC-to-theme N[64,K] specifies interests, resistances, relevant competencies, and biographically grounded interpretive sensitivities.
- Station-to-topic S[7,K] specifies context for the established seven interpretive tips; all other existing route nodes may have local contextual tags. Station positions are NOT moral classifications or identities of NPCs.
- Signature override H[64,24] stores only actually sourced/authorized strong personal connections, refusals, taboos and special stakes.
- Object pair synergy P[24,24] retains the twelve existing named complementary pairs, with order, prerequisities and action-specific higher-order interactions rather than blindly multiplying buffs.
- Social coupling C[q,t] is a sparse directed network among current interlocutors (and later memory relationships), not a permanent 64×64 religion-based allegiance chart.
- Event/provenance E links observations and speech acts to who can actually know or use them; the Mailroom controls visibility and replay.

For NPC i, object j, station v, topic q, context t, use a candidate relevance score:
score(i,j,v,q,t) = N_i^T W(q,v,t) O_j + signature(i,j) + admissible-evidence(i,j,q,t) + memory(i,q,t) - access/travel/social costs.
Only candidate ranking uses a scalar. The EFFECT is a separate typed vector of attention, comprehension, confidence, exposure, practical access, willingness to act, offer/decline, relationship change, itinerary and rumor diffusion; never reduce it to a goodness or persuasion number. Stable causal-gates and hysteresis prevent repeated chatter generating fake Big Deals. Seeded randomness can suggest a new topic or encounter, not force beliefs or erase commitments.

The mathematical combinations are deliberately sparse but **nonlinear**: H05+H12 may support public correction; H06+H11 may enable a consented message with delay; H19+H23 may make a pause/turn-taking strategy available; H18+H24 may reveal the difficulty of repairing a public rumor. A completed object pair yields a method, question or possible event, not an automatic favorable verdict.

## Review of the complete H01–H24 inventory
The first clause in each entry reflects the existing physical action/inquiry; subsequent clauses are new proposed gameplay affordances.

| ID | Retained identity and original behavior | Additive proposed player ability and social effect | Tier / caution |
| --- | --- | --- | --- |
| H01 | Threshold with Two Names; flip brass labels | Reframe categorical claims while tracking referents; challenge equivocation in debate | Universal method, selective source stakes; no forced theological equivalence |
| H02 | Hospitality Hearth; tend fire | Invitation/social temperature; make rest, candid meetings or shelter more attractive | Environmental; welcome does not buy consent |
| H03 | Twelve-Pane Window; slide channels | Translation/change-of-basis: compare what is lost when language changes | Universal method; not a claim traditions are interchangeable |
| H04 | Stair of Previous Readers; read note | Reconstruct predecessor routes and detect chronologically missing testimony | Selective; uncertainty remains |
| H05 | Book of Many Witnesses; turn leaf/Bayes | Source-weighting, testimony independence, provenance challenge | Universal procedure; cannot measure souls or doctrinal truth |
| H06 | Unsent Letter; send/amend/keep | Make time-sensitive, recipient-specific moral commitments and consent decisions | Signature stakes; no uninvited disclosure |
| H07 | Two Inherited Cups; offer either | Unconditional hospitality and social gesture with recipient choice | Broad relational; refusal remains possible |
| H08 | Story-Repaired Dragon Scale; rotate label | Mythopoetic hypothesis and source/legend boundary | Selective literary affinities; preserve canon |
| H09 | Portrait of Absent Reader; tilt grid | Recognition of projection and unobserved perspective | Broad method; no mind-reading profiling |
| H10 | Annotated Map; shift route cost | Simulate itineraries and predict possible encounters from graph and schedule | Universal; test routes don't mutate actual world unless authorized |
| H11 | Correspondence Window; stamp/chime | Invitations and letters with delivery delays, receipts, failed delivery and rumor versions | Network procedure; no universal knowledge |
| H12 | Editorial Desk; edit with previous text | Correction, reframing and mediated drafting, preservation of version provenance | Universal procedure; revision != retroactive erasure |
| H13 | Wardrobe of Possible Worlds; open miniature | Bounded alternate-world/counterfactual hypothesis experiment | Selective; explicitly mark simulation versus canon |
| H14 | Fireplace Reflection; tilt mirror | Frame-sensitive empathy and invariant checks; identify audience effects | Universal method; perspective != moral relativism |
| H15 | Book's Tiny Chapel; argument tree | Branching interpretive traditions with source-aware noncommutative comparisons | Selective; do not force one doctrine from a matrix |
| H16 | Honest Exit; quiet door | Protected refusal, nonbelief, abstention and leaving, with no universal persuasion gate | UNIVERSAL procedural right, invariant no moral penalty |
| H17 | Astronomical Orrery; turn wheel | Predict independent observation windows and research trips, not sky control | Planning/selected astronomy affinity |
| H18 | Printing Press; phrase diffusion | Publish, attribute, amplify, retract, measure spread vs source verification | Network; rumor is not evidence |
| H19 | Metronome of Zeal; two simultaneous frequencies | Listening to multiple conversational tempos, deliberate pause and escalation detection | Broad timing skill; preserve musical core |
| H20 | Rain-Catching Instrument; sample uncertain rain | Polling laboratory: sampling frames, nonresponse, wording, coverage, intervals, cluster bias | Universal inquiry; sampled participants not all society |
| H21 | Vitra in the Glass; light without verdict | Model criticism, uncertainty, missing perspectives, competing forecast explanations | Universal transparency; no consciousness inference |
| H22 | Wren and the Crumb; optional return | Uncontrolled reciprocity and honest prediction residuals | Selective; animal response not deterministic reward |
| H23 | Debate in Two Chairs; help/exploit repeated game | Full microcosm of Acropolis turn-taking, concession, caucus, evidence and S1 patterns | Transformative; replace binary moral shortcut, retain repeated-game core |
| H24 | Quiet Repairer; repair damaged mullion | Physical repair with residual grievance, newly accessible gathering, visible evidence of prior harm | Environmental + selective; repair not pardon |

## Polling expert constraints
(1) Define the sampling frame: the 64 NPCs are a finite fictional society; those heard today are a self-selected sample, not a representative estimate even of those 64. (2) Keep separate expressed answer, privately held belief and action; do not assume equal validity or exact knowledge. (3) Detect response wording and order effects, context and audience effects, nonresponse and missing perspectives. (4) Differential item functioning: the same question may measure different constructs for different NPCs; don't force equal religious response scales without validated equivalence. (5) Treat similar opinions as possibly resulting from shared origins/homophily, not necessarily persuasion; record actual witnessed influences before claiming contagion. (6) H20 can be a training instrument for sample bias; H05 audits the independence of testimony, H18 audits rumor multiplication, H21 shows model uncertainty. Simulated polling is a pedagogical artifact, not survey evidence about real people.

## Diplomat and anthropologist constraints
Emic/etic differentiation: distinguish the NPC's self-understanding from game-designer classification; the source tradition's situated historical language from simplified structural features. Each seven-point perspective permits internal variation, and Aslan/Tash remain fictional Lewis referents. A node is a conversational setting, not a religion-coded NPC identity.

Include face-saving, separate private caucuses and voluntary third-party mediation as actual affordances. H11 can carry a consented private note; H12 can preserve revisions to a negotiated statement; H02 and H07 provide noncoercive hospitality; H16 protects refusal. A public agreement can coexist with private uncertainty; confidentiality is not magical knowledge suppression once a source has legitimately been published. No global "benevolence of NPC" moral parameter.

## Predictive and intervention interfaces
- **Prediction** is bounded by observations and source provenance. H10 predicts route accessibility and meeting likelihood; H17 predicts observation windows; H20 estimates sampled responses; H21 displays forecast uncertainty and blind spots. Forecasts are claims, not outcomes.
- **Intervention** is a recorded, authorized change: H02 light/invitation, H06 send/keep, H07 offer, H11 dispatch, H12 edit, H18 publication, H24 repair. The simulation reacts through actual NPC knowledge, constraints, and independent agency; not all effects are favorable.
- **Learning** creates possible player verbs: H05 evidence challenge, H14 alternative viewpoint, H19 pause, H23 caucus/rebuttal. Competency may need practice. A player action only earns social capital when another NPC actually observes, receives or verifies relevant conduct, and interprets it as meaningful.

## Event pipeline and world boundaries
1. In the Kilns, physical action resolves under child-world authority and its existing +3 room/+6 object time rules. Preserve local journal and private interpretation.
2. If an authorized, bounded public observation is produced, the Threshold Covenant emits only permitted IDs, source references and typed events to Elisium; no raw private notebook or soul-profile data crosses.
3. Parent Concordance Dynamics evaluates which actors could witness or receive the event, topic emergence, interventions and graph itineraries. Sky ownership remains external and independent, never modified by rhetorical success.
4. The Acropolis Protocol hosts at most one public discussion per node; multiple nodes can discuss the same topic concurrently with distinct claims. H23 teaches its rules; no Acropolis stone or new map geometry is created.
5. LLMs may propose metaphors, analogies, candidate claims and spoken wording, as explicitly requested in the subsequent dialogue-design iteration. The deterministic, validated social event engine alone commits knowledge, promises, public consequences and memory. This is a proposal updating CD-001's earlier no-LLM-authoring preference, not a silent rewrite of CD-001.
6. Mailroom persists witnessed effects, source labels, conversation histories, private beliefs, objective state and replay identities. Reconciling house fictional minutes with parent time remains a prerequisite for cross-threshold social scheduling.

## Worked emergent episode
Player studies H05/H12 and learns source-audit and source-preserving revision. At an existing Islam point, a public discussion concerns mercy and disclosure. Player can use one substantive interjection to separate firsthand evidence from a forwarded report. One NPC values the clarification but refuses to change the moral claim; another wants to investigate the letter at H06; a third privately requests a version history at H12. H11 carries a consented invitation, H10 suggests legitimate routes, and several NPCs independently choose to follow or decline. H18 may circulate a misleading excerpt and H24 might later repair the physically damaged meeting area without erasing the insult. S1 relationship patterns arise only from persistent, causally observed interaction; no branch or forced conversion event is authored as the result.

## Minimal validation / staged prototype
Prototype H05, H20, H23, H21 plus one genuine network intervention H11 or H18, with 6 NPCs across 3 existing nodes, two simultaneous conversations and one player interjection. Test: object learning changes available verbs but not NPC truth; the same event is interpreted differently by two NPCs; no unobserved rumor magically spreads; nonrespondents aren't counted as disagreeing; different discussion contexts yield different answers without inventing individual dishonesty; one character voluntarily refuses and leaves; the same seeded event ledger reproduces substantive events; no NPCs teleport between nodes; the Kilns time-debt limitation remains documented; no recorded data is silently published.

**Backward/forward covenant:** This RFC is strictly additive to CD-001, the current OBJECTS.json, source asset curator, twelve SGM pair IDs, native 4.6 commentary and canon, and paired root README/TECH_MANUAL. Later implementation must audit original identities, verify all 24 physical actions, and add formal object-affordance, NPC-interest and event-ledger schemas without removing previous ideas. No runtime or asset modifications were made by this proposal.

### External methodology consulted
- Pew Research Center: Writing Survey Questions; Questionnaire Design and Translation; influence of question wording and order.
- Measurement invariance and differential item functioning cross-cultural survey research (scientific literature; model inspiration only).
- Homophily and contagion are generically confounded in observational social network studies (the causal distinction).
- Anthropology of emic/etic categories and thick description.
- Harvard Program on Negotiation on shuttle diplomacy and mediation; meeting privately may offer face-saving but requires consent.
