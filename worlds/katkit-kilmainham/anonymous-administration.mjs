// Reference contract; trusted adapter is a runtime boundary, not a security sandbox.
// No player-facing entry points, actual world geometry, object operations or Choir bridge included.
export function makeAdmin(catalog,adapter) {
 const rituals=new Map(catalog.rituals.map(x=>[x.id,x])), skills=new Set(catalog.skills.map(x=>x.id));
 const cases=new Map(), events=[], used=new Set();
 const copy=x=>JSON.parse(JSON.stringify(x));
 const append=(kind,body,parents=[])=>{const e={id:`AF${String(events.length+1).padStart(5,"0")}`,kind,body:copy(body),parents:[...parents]};events.push(e);return copy(e)};
 const get=id=>cases.get(id);
 function openCase({id,ritual,subject}) {
  if(!id||!subject||!rituals.has(ritual)||cases.has(id))return null;
  cases.set(id,{id,ritual,subject,receipts:new Map(),candidate:null,review:null,authorization:null});
  return append("admin.case.open",{id,ritual,subject});
 }
 // Internal adapter boundary: caller passes a reference, not a fabricated skill or a claimed result.
 function ingest(worldReceiptId) {
  if(used.has(worldReceiptId))return null;
  const r=adapter.verifiedReceipt(worldReceiptId);if(!r||r.id!==worldReceiptId||!skills.has(r.skill)||!r.sourceId||!r.actor||!r.objectId)return null;
  const c=get(r.caseId);if(!c||r.subject!==c.subject||!adapter.validEvidence(r,c,rituals.get(c.ritual)))return null;
  used.add(worldReceiptId);
  const e=append("admin.evidence.received",{caseId:c.id,source:r.id,skill:r.skill,actor:r.actor,objectId:r.objectId});
  c.receipts.set(r.id,{receipt:copy(r),eventId:e.id});return e;
 }
 function assess(id) {
  const c=get(id);if(!c)return null;const r=rituals.get(c.ritual);
  const valid=[...c.receipts.values()].filter(x=>adapter.validEvidence(x.receipt,c,r));
  const found=new Set(valid.map(x=>x.receipt.skill));
  return {eligible:r.required.every(x=>found.has(x))&&r.alternatives.some(a=>a.every(x=>found.has(x)))&&(!r.consent||adapter.hasConsent(c.subject,c.id,r.id))&&adapter.validAssembly(c,r,valid.map(x=>x.receipt)),parents:valid.map(x=>x.eventId)};
 }
 // Called by world scheduler when dossier is materially present at the correct station.
 function materialize(id) {
  const c=get(id),a=assess(id);if(!c||c.candidate||!a?.eligible||!adapter.atReviewStation(c,rituals.get(c.ritual)))return null;
  const e=append("admin.opportunity.materialize",{caseId:id,ritual:c.ritual,subject:c.subject,stage:"review opportunity"},a.parents);c.candidate=e.id;return e;
 }
 // Only an independently committed NPC scheduler event can be consumed here.
 function npcDecision(worldDecisionId) {
  if(used.has(worldDecisionId))return null;const d=adapter.npcDecision(worldDecisionId);
  if(!d||d.id!==worldDecisionId)return null;const c=get(d.caseId);
  if(!c||!c.candidate||!["review","authorize","defer","withdraw"].includes(d.action)||!adapter.npcAuthorized(d,c,rituals.get(c.ritual)))return null;
  if(d.action==="authorize"&&(!c.review||c.authorization||!assess(c.id)?.eligible))return null;
  if(d.action==="withdraw"&&!c.authorization)return null;
  if(d.action==="review"&&c.review)return null;
  used.add(worldDecisionId);
  const parents=[c.candidate,...(c.review?[c.review]:[]),...(c.authorization?[c.authorization]:[])];
  const e=append(`admin.npc.${d.action}`,{caseId:c.id,actor:d.actor,source:d.id,scope:d.scope},parents);
  if(d.action==="review")c.review=e.id;if(d.action==="authorize")c.authorization=e.id;if(d.action==="withdraw")c.authorization=null;
  return e;
 }
 // Ordinary care deliberately has no dossier, title, skill or approval prerequisite in this engine.
 function ordinaryCare(worldCareId) {
  if(used.has(worldCareId))return null;const x=adapter.careEvent(worldCareId);if(!x||x.id!==worldCareId||!x.actor||!x.subject||!adapter.validCare(x))return null;
  used.add(worldCareId);return append("human.ordinary_care",{actor:x.actor,subject:x.subject,service:x.service,source:x.id});
 }
 // Read-only snapshot for integration/debug; never expose eligibility/hidden inputs in player UI.
 return {openCase,ingest,materialize,npcDecision,ordinaryCare,debugAssess:assess,events:()=>copy(events)};
}
export function chooseResidentExchange(catalog,occasion,adapter) {
 // An independently committed NPC occasion is the only entry point, not player intent.
 const o=adapter.npcOccasion(occasion);if(!o||!o.residentId||!o.finchAvailable)return [];
 const profile=catalog.residents.find(r=>r.id===o.repertoire);if(!profile)return [];
 const beats=adapter.chooseBeats(o,profile);if(!Array.isArray(beats))return [];
 const candidates=[...profile.opening,...profile.branches.flatMap(b=>b.lines)];
 const out=[];
 for(const index of beats.slice(0,4)){
  const l=candidates[index];if(!l)continue;
  const actor=l.speaker==="resident"?o.residentId:"human.beatrice_finch";
  if(!adapter.actorElectsSpeech(o,actor,l.text))break;
  out.push({actor,text:l.text,occasion:o.id});
 }
 return out;
}
