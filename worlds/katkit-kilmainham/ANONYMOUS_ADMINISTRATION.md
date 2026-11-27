# Anonymous population and Administrative Magic — candidate contract

Canon extension to [Beatrice Finch](BEATRICE_FINCH_CANON.md), not a new level release. The NPCs retain all narrative and institutional power. Finch's twenty years of experience, ordinary voice, eleven affectionate titles and quality-of-life priority remain. Kindness is a character constant, not a conditional reward: no charms, XP, apologies, magical competence or successful request required for humane ordinary care. This is not a guarantee of personal attendance, friendship, approval or a solved problem. Residents may refuse help and retain control of personal disclosure. No departure imperative.

## Anonymous residents
Each resident has a stable opaque ID, independent schedule, witnessed receipts, custody and optional public name. A tendency is a situational repertoire, never a class, diagnosis or moral score. No generator may infer private thoughts or real-world traits from dialogue. Dialogue may occur without visitor presence; only local authorized observations should render. Off-ramps belong to NPCs; neither selection nor completion is a player-facing puzzle.
- comedian: ceremony; A clean shirt.
- old_hand: continuity; A draught.
- solitary: privacy; A letter.
- intellectual: inconsistency; Library access.
- meticulous: documentation; A copy of a request.
- disorganized: fragmentary; A lost form.
- proud: indirect; A blanket.
- suspicious: disclosure; A private request.
- restless: activity; Meaningful work.
- conciliator: companionship; Help asking.
- belligerent: challenge; A neglected request.
- exhausted: low speech; Rest.
- withdrawn: silence; A damaged shoe.
- returnee: familiarity; Belongings.
- craftsperson: material detail; A loose fitting.
- grateful: affection; A repair completed.

## Competence
- **Situated observation**: Record a visible condition with its location, time and limits; distinguish direct sight from report.
- **Witness listening**: Preserve an independently volunteered account without replacing the speaker's words.
- **Document collation**: Compare source and duplicate, match reference fields and retain discrepancies.
- **Chronological reasoning**: Reconstruct order from dated entries; do not treat filing date as occurrence date.
- **Indexing and filing**: Locate the correct register, section and stable object address.
- **Faithful transcription**: Carry names, addresses and quantities exactly, mark uncertainty rather than guess.
- **Material measurement**: Check actual size, quantity or fit using an appropriate object/tool.
- **Condition inspection**: Locate a physical defect and distinguish observed symptoms from presumed causes.
- **Jurisdiction reading**: Determine what an office or role is authorized to recognize; not permission to act.
- **Routing and logistics**: Match a permitted delivery route, custody transition and receiving office.
- **Reconciliation**: Preserve conflicting records and establish which claim needs review, without rewriting history.
- **Temporal coordination**: Identify a real service window with available resources and independent actors.
- **Selective disclosure**: Separate information necessary to an authorized service from private information; obtain actual consent when needed.
- **Material assembly**: Bring the right original, copy, envelope, form or physical item into a permitted working arrangement.
Skills denote actual validated operations on objects, not XP or buttons that mint evidence. Evidence must be produced by the world adapter, tied to a particular case, subject, provenance, custody, scope and object. Consent must be independently committed when required. No player-authored authority or fabricated receipt. For access, use permitted working copies and object stations rather than copying private data. Essential care is unaffected by puzzle status.

## Ritual composition
Every ritual requires its common skill set AND one complete alternative set. A player can contribute personally or NPCs may voluntarily contribute verified receipts. A missing piece is not an NPC failure or UI verdict. Correct work creates an opportunity, not a guaranteed response, service or outcome. Finch may review or defer independently; relevant service NPCs have their own authority. The words of any character are never magical switches.
### The Uncounted Lamp
Object: maintenance request; station: maintenance review tray.
Common: observe, inspect, index, scope. Alternative: collate + chronology OR listen + transcribe.
Consent required by candidate: no (individual privacy and permitted custody still apply).
Finch reviews and routes a request if she chooses; maintenance controls inspection and repair. A formerly unregistered fixture becomes a recognized service object; actual illumination requires an independently authorized repair.

### The Missing Pair
Object: laundry ledger; station: laundry allocation tray.
Common: measure, index, reconcile. Alternative: collate + transcribe OR observe + route.
Consent required by candidate: no (individual privacy and permitted custody still apply).
Finch may check allocation and request replacement; steward retains custody. The person's belongings become individually addressable in a previously aggregate inventory.

### The Undelivered Letter
Object: returned envelope; station: outgoing correspondence tray.
Common: privacy, transcribe, scope, route. Alternative: collate + chronology OR listen + index.
Consent required by candidate: yes.
Finch may arrange ordinary review; resident and recipient retain control. An interrupted correspondence route becomes available for an independently chosen delivery.

### The Unreturned Book
Object: library register; station: library returns tray.
Common: index, collate, reconcile. Alternative: listen + transcribe OR observe + chronology.
Consent required by candidate: no (individual privacy and permitted custody still apply).
Finch may route discrepancy to librarian; librarian decides loan or correction. A title previously absent from the active catalogue can be requested again.

### The Cold Cell
Object: maintenance request; station: maintenance review tray.
Common: observe, inspect, measure, scope. Alternative: index + collate OR listen + transcribe.
Consent required by candidate: no (individual privacy and permitted custody still apply).
Finch may request inspection or additional bedding; ordinary immediate assistance remains independent. A forgotten room enters the service map with addressable repair history.

### The Unoccupied Chair
Object: visitor register; station: visitation review tray.
Common: privacy, scope, reconcile, timing. Alternative: collate + chronology OR listen + transcribe + index.
Consent required by candidate: yes.
Finch may route a request; both parties and authorized visitation staff must independently agree. A previously closed scheduling possibility becomes legible without guaranteeing a visit.

### The Missing Place
Object: meal allocation; station: kitchen review tray.
Common: observe, measure, reconcile, privacy. Alternative: collate + index OR listen + transcribe.
Consent required by candidate: yes.
Finch may route an allocation discrepancy; kitchen or relevant professional retains decision authority. An overlooked individual becomes addressable in the meal ledger, without inferring medical need.

### The Appointment That Never Was
Object: appointment ledger; station: appointments review tray.
Common: chronology, scope, timing, material. Alternative: collate + reconcile OR listen + transcribe + index.
Consent required by candidate: yes.
Finch may arrange a new review; provider and resident decide independently. A canceled possibility can reenter the scheduling horizon; history remains unchanged.

### The Owner of the Empty Shelf
Object: property register; station: property review tray.
Common: privacy, index, reconcile, material. Alternative: observe + collate OR listen + transcribe + chronology.
Consent required by candidate: yes.
Finch may forward an ownership inquiry; authorized custodian must decide. An item acquires a reviewable association with its claimant, not automatic ownership.

### The Unsigned Departure
Object: discharge certificate; station: discharge review tray.
Common: scope, privacy, chronology, reconcile, route. Alternative: collate + index OR listen + transcribe + material.
Consent required by candidate: yes.
Finch can route a discrepancy but cannot grant discharge outside her authority. A valid review opportunity opens; confinement and release require independent lawful decision. No shortcut.

## Reference implementation and integration limits
- `anonymous-administration.json`: 16 resident repertoires, 48 branches, 95 lines, 14 skills, 10 ritual families.
- `anonymous-administration.mjs`: isolated reference contract for verified evidence, review opportunity, independently sourced NPC decisions, ordinary care, and NPC-chosen dialogue beats. Calls to the trusted adapter are not a security boundary. No UI access to internal debug eligibility; no runtime object manipulation implementation here.
- `test-anonymous-administration.mjs`: run `node test-anonymous-administration.mjs` from this world directory. 38 assertions ran directly in the connector JS isolate using the authored functions and catalogue; includes rejection of forged/mismatched/duplicate/stale evidence, unauthorized decisions, consent gate, NPC speech refusal, independent ordinary care and read-only queries. Node runner committed; not executed in Node or browser.
- Future adapter: implement persistent resident schedule/identity; actual object-operation validation and spatial custody; scope/consent; semantic record comparison; assembly stations; services; bridge append-only event IDs and causality to Choir without using its visitor testimony gate. Current local AF IDs must be mapped to global IDs at integration. Candidate module is in-memory; no save/reload, full deterministic scheduling, scene graph, service completion, or browser rendering demonstrated. Ordinary care events are independent from case eligibility. No experimental-engine modification.
- Preserve R012 architecture, all seven powers, unresolved Triangle and Sable's sealed gift. No live level, existing branch, published catalogue or Drive edits.
