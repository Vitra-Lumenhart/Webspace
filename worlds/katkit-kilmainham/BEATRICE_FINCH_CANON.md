# Miss Beatrice Finch — The Eleven Titles of Departures
Canon supplement, 26 November 2026. User accepted the character and every moniker; NPCs have all the power. Source: [R011 lore](LORE_R011.md), [R012 scope](R012_SCOPE.md). This supplement does not replace the seven powers, fix the Triangle, or alter historical epochs.

## Character
ID `human.beatrice_finch`; 58; case manager, former theatrical wardrobe mistress; twenty years at Kilmainham. Her real work is quality of life during confinement, not discharge. Plum jacket, silk scarf, tortoiseshell spectacles, a man's watch, immaculate shoes, overflowing desk. Resourceful, vain, socially perceptive, affectionate, impatient, intrusive. Her blind spot is imagining a future for someone which they do not want. She can apologize and be corrected; she is not omniscient. She remembers hopes rather than offenses. She is human, not an eighth power. Her connection to Administrative Magic is enacted through accumulated documents and unrealized futures, not magical dialogue. She does not explain, hint at or name the magic. Her own knowledge is not established. The mid-century appearance is an art stratum, not a silent rewrite of the 1879 epoch.

## Voice correction — twenty years in
The user established that most inmates are where they need to be at present, that her actual work is quality of life, and that repeated assaults (urine thrown at her roughly monthly) have changed her voice. This does not imply infallible institutional judgment, that every confinement is justified, or that any resident deserves neglect. Her clothes are preserved selfhood, not theatrical service to inmates. Her humour is dry, incidental and usually not a reply to a title. She has no obligation to be charming or to forgive an assault on demand. She may be short, tired, quietly affectionate or matter-of-fact. No caricature of hardened cruelty, no compulsory saintliness, no automatic retaliation. Boundaries can be direct: “Stand back. I'm not coming in while you're doing that.” When needed she leaves, washes, reports or arranges an authorized handoff; essential care continues without being conditional on an apology. The assault frequency is a background premise, not a scheduled gag or encounter quota. Use concise concrete language, not a punchline in every exchange. Her experience is particular: she remembers sizes, mattress issues, family addresses, food, library books, and unfinished repair requests. Release is one kind of improvement, not a measure of human worth. Quality-of-life objects and independently authorized service events should dominate the administrative system. Do not alter experimental gameplay, NPC sovereignty, or the seven powers.

## The inmate titles
Every title is affectionate on the inmates' side. Beatrice has heard these for twenty years; the novelty wore off in her first week. She normally ignores the title, addresses an underlying need, or keeps working. A rare smile is spontaneous, not a reward or standard comeback. The residents want her assistance intensely but preserve dignity through comic ceremony. No title is sarcastic by default, no title is a password, no title increases trust or unlocks magic. Respect individual variation: a quiet resident need not participate. No one is entitled to her affection or labor, and care creates no debt.
- **Her Royal Highness of Premature Departures** — unexpected encouraging news.
- **The Duchess of Departures and Unfortunate Returns** — returning resident.
- **The Grand Poobah of Departures** — communal arrival.
- **The Right Honourable Minister of Departures and Other Miracles** — improbable practical help.
- **The Supreme Goblin of Departures** — emerges from paperwork.
- **The Dowager Empress of Departures, Delays and Dirty Laundry** — domestic arrangements.
- **The Fairy Godmother of Questionable Departures** — younger resident receives help.
- **The High Priestess of Departures and Inappropriate Footwear** — shoe inspection.
- **The Almighty Dingbat of Departures** — affectionate eccentricity.
- **The Grand Duchess of Departures, Detours and Double Dungarees** — clothes or itinerary.
- **The Patron Saint of Departures and People Who Can't Dress Themselves** — interview preparation.

## NPC sovereignty
NPCs have all the narrative and institutional power. Player has agency over their own actions, not other agents: approach, offer, observe, sit, wait, leave, and manipulate accessible objects under world rules. NPCs initiate, allocate turns, choose topics, interrupt, decline to engage, invite company, leave, authorize or withhold institutional permissions, and pursue independent schedules. No player-facing persuasion options, dialogue quiz, success/failure label, completion flag, affection meter, guaranteed rewards or forced consent. Repeated approach never farms trust or forces a branch. Nothing said by Finch authorizes a case, even if reassuring. Ordinary care and legally necessary boundaries remain legible; urgent practical requests get appropriate ordinary attention, not whimsical dismissal as a puzzle. NPC silence is not punishment. Player can leave at any beat. Inmates also exercise independent power and can refuse Finch. Conversations happen while the visitor is absent and can be overheard only locally.

## Living conversation tree
At a material occasion, select an eligible NPC-owned scene. The speaker chooses to speak, pause, turn to another NPC, return to work, or leave. An independent actor may interrupt. NPCs may choose no branch. Branches are possibilities, not buttons or a sequence of correct moves. Every beat has an ordinary exit; no UI verdict. Use schedules, observable facts, witnessed receipts and independent RNG. Keep budget short (0–4 beats in one exchange; longer exchanges arise from new occasions), preserve consent and spatial audibility. Never narrate a real or fictional character's private thoughts as facts. Rendering reads committed public events only.

### arrival
Occasion: Finch notices an arrival; NPC veteran is present.
- resident.veteran: “Make way for the Grand Poobah of Departures.”
- finch: “Move your feet, please.”
**chair** — free chair; Finch elects hospitality; NPC-selected.
- finch: “Those shoes still rubbing?”
- resident.young: “High Priestess of Departures and Inappropriate Footwear.”
Exit: companionable.

**work** — task due; NPC-selected.
- finch: “Have you eaten? Ask the kitchen if there's anything left.”
Exit: diversion.

**letter** — letter visibly offered; Finch elects to look; NPC-selected.
- finch: “Is that the address your sister gave you?”
- finch: “Keep the envelope. You may need the address.”
Exit: object_attention.
Default: quiet continuation or resumption of work. Visitor may leave freely.

### waiting
Occasion: resident independently waits by office.
- resident.young: “I'm not waiting. I'm looking at the clock.”
- finch: “You're in the doorway again.”
**chair** — elder present and chooses to help; NPC-selected.
- finch: “Put that chair against the wall, would you?”
- resident.elder: “I'll move it.”
Exit: third_party.

**pencil** — Finch has lost pencil; NPC-selected.
- resident.veteran: “Her Royal Highness of Premature Departures.”
- finch: “Have you got my pencil?”
Exit: work_resume.

**silence** — no actor wants to speak; NPC-selected.
(silence)
Exit: silence.
Default: quiet continuation or resumption of work. Visitor may leave freely.

### returned
Occasion: resident returns after recorded departure.
- resident.returnee: “The Duchess of Departures and Unfortunate Returns!”
- finch: “Hello. Have you got your things?”
**bakery** — returnee chooses to elaborate; NPC-selected.
- resident.returnee: “They wanted someone who could get up at four.”
- finch: “Four in the morning. Right. Have you eaten today?”
Exit: association.

**envelope** — returnee voluntarily presents envelope; NPC-selected.
- finch: “Oh, you've kept that.”
- resident.returnee: “Kept it dry.”
Exit: object_attention.

**coat** — Finch notices torn coat; NPC-selected.
- finch: “Give me that coat when you've got something else to wear.”
Exit: practical_care.
Default: quiet continuation or resumption of work. Visitor may leave freely.

### pressure
Occasion: repeated approach or prolonged stationary attention.
- finch: “I know you're there. I'm doing something.”
**typewriter** — work due; NPC-selected.
- finch: “If you're waiting for the list, it hasn't come.”
Exit: work_resume.

**form** — offered form visible; NPC-selected.
- finch: “Put your name on the top. Not your number. Your name.”
Exit: object_attention.

**walk** — scheduled errand; NPC-selected.
- finch: “I've got the laundry to see to.”
Exit: walkaway.
Default: quiet continuation or resumption of work. Visitor may leave freely.

### gratitude
Occasion: resident independently receives assistance and approaches.
- resident.elder: “The Right Honourable Minister of Departures and Other Miracles.”
- finch: “Mm. Did they give you both blankets?”
**sleeve** — resident volunteers more gratitude; NPC-selected.
- resident.elder: “I mean it.”
- finch: “I know, love. Let me see that sleeve.”
Exit: practical_care.

**clock** — Finch notices clock; NPC-selected.
- finch: “It's nearly four. Have you got your library book?”
Exit: association.

**tea** — tea available; NPC-selected.
- finch: “If you're going that way, bring me a cup.”
Exit: companionable.
Default: quiet continuation or resumption of work. Visitor may leave freely.

### interruption
Occasion: clerk independently arrives with assigned work.
- staff.clerk: “Miss Finch, the afternoon list.”
- finch: “Leave it here, please. Is the laundry list with it?”
**tray** — clerk chooses placement; NPC-selected.
- staff.clerk: “Here?”
- finch: “That's fine. Thank you.”
Exit: third_party.

**paper** — Finch examines tray; NPC-selected.
- finch: “These are yesterday's. Where are today's?”
Exit: work_resume.

**chair** — chair available; NPC-selected.
- finch: “Sit down if you're staying. Keep the doorway clear.”
Exit: companionable.
Default: quiet continuation or resumption of work. Visitor may leave freely.

### quiet
Occasion: ordinary quiet office interval.
- finch: “They've cleaned the window, finally.”
**theatre** — Finch chooses recollection; NPC-selected.
- finch: “I had an actress once who wouldn't wear anything green. Didn't suit her, she said. She was right.”
Exit: reminiscence.

**cuff** — passing resident greets her; NPC-selected.
- resident.private: “Morning, Miss Finch.”
- finch: “Morning, love. Your cuff's turned under.”
Exit: third_party.

**drawer** — Finch sees loose handle; NPC-selected.
- finch: “The handle's loose again.”
Exit: object_attention.
Default: quiet continuation or resumption of work. Visitor may leave freely.

### interview
Occasion: resident preparing for real appointment.
- resident.veteran: “The Patron Saint of Departures and People Who Can't Dress Themselves.”
- finch: “Here. Turn your collar down.”
**tie** — resident consents to clothing assistance; NPC-selected.
- finch: “Leave the tie alone a minute. It's all right.”
Exit: practical_care.

**joke** — young resident chooses to tease affectionately; NPC-selected.
- resident.young: “The Grand Duchess of Departures, Detours and Double Dungarees.”
- finch: “Yes, yes. Has he got his other shirt?”
Exit: companionable.

**exit** — resident's appointment time arrives; NPC-selected.
- finch: “Off you go. Mind the step.”
Exit: walkaway.
Default: quiet continuation or resumption of work. Visitor may leave freely.

### paperwork
Occasion: Finch emerges from filing backlog.
- resident.veteran: “The Supreme Goblin of Departures!”
- finch: “Morning. Have you brought the laundry forms?”
**laundry** — domestic case is independently scheduled; NPC-selected.
- resident.elder: “The Dowager Empress of Departures, Delays and Dirty Laundry.”
- finch: “I need sizes, not just a number of pairs.”
Exit: association.

**queue** — Finch resumes task; NPC-selected.
- finch: “These aren't in order. Never mind.”
Exit: work_resume.

**silent** — Finch elects silence; NPC-selected.
(silence)
Exit: silence.
Default: quiet continuation or resumption of work. Visitor may leave freely.

### encouragement
Occasion: younger resident has documented good news.
- resident.young: “The Fairy Godmother of Questionable Departures.”
- finch: “Did you get it, then? Good.”
**train** — Finch notices timetable; NPC-selected.
- finch: “Have you actually been to Brighton? It's quite nice in the winter.”
Exit: association.

**dingbat** — resident responds warmly to eccentricity; NPC-selected.
- resident.veteran: “The Almighty Dingbat of Departures.”
- finch: “You can carry those if you've got nothing to do.”
Exit: companionable.

**schedule** — Finch's actual task becomes due; NPC-selected.
- finch: “Mind how you go, pet.”
Exit: walkaway.
Default: quiet continuation or resumption of work. Visitor may leave freely.

### disagreement
Occasion: resident challenges an ordinary practical suggestion.
- finch: “Well, they are your trousers.”
**repair** — Finch chooses to acknowledge mistake; NPC-selected.
- finch: “I had the wrong end of that. Here, let me put these back.”
Exit: practical_care.

**boundary** — resident wishes no further advice; NPC-selected.
- finch: “Quite all right. The tea's on the table if you want it.”
Exit: companionable.

**work** — Finch resumes work; NPC-selected.
- finch: “All right. I've got to finish this.”
Exit: work_resume.
Default: quiet continuation or resumption of work. Visitor may leave freely.

### urgent
Occasion: resident visibly requests urgent practical help.
- finch: “Sit down a moment. I'll see who's actually on duty.”
**contact** — authorized staff available and elects to respond; NPC-selected.
- staff.clerk: “I'm here. What do you need?”
- finch: “There's a chair here.”
Exit: third_party.

**unavailable** — staff unavailable; Finch chooses to stay; NPC-selected.
- finch: “I'm here for the moment.”
Exit: companionable.

**handoff** — authorized staff takes over with resident consent; NPC-selected.
- finch: “I'll leave you two to it.”
Exit: walkaway.
Default: quiet continuation or resumption of work. Visitor may leave freely.

### ordinary_conditions
Occasion: resident independently reports or Finch observes a practical living-condition issue.
- resident.private: “The window won't shut.”
- finch: “Which side?”
**inspect** — authorized inspection can be arranged; NPC-selected.
- finch: “Put the cell number on this. I'll find out who's on maintenance.”
Exit: object_attention.

**immediate** — cold resident and spare blanket available; NPC-selected.
- finch: “There's a spare blanket. Ask him for it.”
Exit: third_party.

**work** — other duties due; NPC-selected.
- finch: “Leave that here. I need to finish the list.”
Exit: work_resume.
Default: quiet continuation or resumption of work. Visitor may leave freely.

### not_leaving
Occasion: resident asks about leaving; actual case status or lack of authority is known.
- resident.young: “Any word about me getting out?”
- finch: “No word today.”
**tomorrow** — resident mentions tomorrow's conditions; NPC-selected.
- finch: “What about your mattress? Is it any better?”
Exit: practical_care.

**boundary** — resident presses for a promise; NPC-selected.
- finch: “I can't give you a date.”
Exit: work_resume.

**presence** — resident stays by choice; NPC-selected.
- finch: “You can sit there if you like.”
Exit: companionable.
Default: quiet continuation or resumption of work. Visitor may leave freely.

### after_assault
Occasion: an independently established incident just occurred; Finch is establishing safety, never automatically generated from a calendar.
- finch: “Stand back. I'm not coming in while you're doing that.”
**handoff** — another authorized staff member can attend; NPC-selected.
- finch: “He still needs his clean things. Would you see to that, please?”
Exit: third_party.

**leave** — Finch chooses to leave for washing, reporting or recovery; NPC-selected.
- finch: “I'm going to change.”
Exit: walkaway.

**quiet** — later safe occasion with same resident; independently chosen return; NPC-selected.
- finch: “Have you got a clean shirt? Right.”
Exit: work_resume.
Default: quiet continuation or resumption of work. Visitor may leave freely.

### small_good
Occasion: a resident independently reports a modest material improvement.
- resident.elder: “They fixed the light.”
- finch: “Oh, good.”
**check** — resident volunteers ongoing problem; NPC-selected.
- finch: “Does it stay on?”
Exit: object_attention.

**thanks** — resident offers affectionate title; NPC-selected.
- resident.elder: “The Right Honourable Minister of Departures and Other Miracles.”
- finch: “It was the electrician.”
Exit: companionable.

**resume** — other task due; NPC-selected.
(silence)
Exit: silence.
Default: quiet continuation or resumption of work. Visitor may leave freely.

## Administrative Magic: the office of unrealized futures
Everyday material conditions (bedding, food, laundry, library, contact and maintenance) are the main field of action; discharge is uncommon. Dialogue does not trigger it. Typewriter, stamps, carbon copies, registers, keys, requests, letters, appointment ledgers, filing cabinets and discharge certificates have stable IDs, custody, provenance, scope and history. Player may offer or rearrange permitted objects. The resulting claim is not true or approved merely because it is written. NPC-owned authority creates permissions and actual appointments via committed object events. Preserve duplicate records and superseded versions. A filing can produce a candidate opportunity, never a guaranteed outcome. The world changes through documented conditions and independently chosen authorized acts; no NPC speech as spell, password or direct state mutation. Finch never says that the visitor passed or failed. A returned resident's envelope, a canceled bakery interview and an authorized filing can create a renewed opportunity; the employer and resident retain the power to refuse. An unsigned certificate is not release. A numbered key is not a right to enter. Effects can occur offscreen or later, without notification. Scientific experiments remain independent, plausible and do not receive magical alterations or hidden outcomes.

## Relationship to the Choir
The existing R011 event ledger is authoritative; use new namespaced event kinds and causal parent IDs. Do not use the visitor's existing one-per-node testimony commit as a conversation gate. Public dialogue is a record of what was actually said, not approval. NPC scheduling, permissions and objects are independently evaluated; only witnessed events reach the powers. Keep the seven bipolarities intact, Sable's gift sealed, no changes to Triangle assignment. Finch may witness spiritual events but is not identified with a power. Dialogue actors and resident archetypes in this supplement are new casting roles, not replacements for named R011 humans. Separate integration required for spatial speech, offscreen scheduling, state persistence, consent and administrative objects. No existing runtime changes claimed.

## Acceptance criteria
1. All eleven exact titles exist, affectionate and mechanically inert.
2. NPCs may converse without visitor present; no player action selects an NPC line.
3. Every scene permits silence, interruption, NPC departure and visitor departure.
4. No failure/success UI, forced promise, automatic authority or hidden correct path.
5. Repeated approach alone never authorizes anything.
6. Object events require valid custody, scope and NPC authority for institutional effects; denied or pending requests remain revisable and legible through the world.
7. Same seeded inputs and schedule reproduce public event history; observer reads never advance state.
8. No overwrite of R011 powers, historical setting, experimental results or existing branches.
9. Actual urgent requests are handled as ordinary care, not blocked by conversational diversion.
10. No magical effects from titles, flattery or dialogue.
 
Machine-readable companion: `beatrice-finch-dialogue.json`. Authored design and candidate data only; not yet wired into live scene or tested in browser.
