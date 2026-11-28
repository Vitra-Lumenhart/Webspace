// Run node worlds/gringotts/anatomy-tests.mjs
const model=function model(){
const rooms=[
["01","Portico of the Seal"],["02","Grand Banking Atrium"],["03","Goblin Teller Row"],["04","Coin and Currency Exchange"],["05","Correspondence Gallery"],["06","Chronomancer’s Calendar"],["07","Underhall of Private Vaults"],["08","Silent Strongroom"]];
const methods={
"URL query":{clear:["owner","page","server","operator/logs","copied link"],meta:[],note:"Public route tags only. A private value may survive in logs, links and history."},
"URL fragment":{clear:["owner","page","copied link"],meta:[],note:"Not sent in the normal HTTP request; page scripts can read it."},
"HTML / JavaScript":{clear:["owner","page","any recipient of code"],meta:[],note:"Delivered code is inspectable."},
"Cookie (hypothetical)":{clear:["owner","server"],meta:["operator/logs"],note:"Visibility depends on attributes and content. No-cookie covenant remains; this is only a diagram."},
"sessionStorage":{clear:["owner","page","same-origin scripts in tab"],meta:[],note:"Tab-scoped, not a secret from scripts in that context."},
"localStorage":{clear:["owner","page","same-origin scripts"],meta:[],note:"Persistent but not authenticated or confidential."},
"IndexedDB":{clear:["owner","page","same-origin scripts"],meta:[],note:"Plaintext example; structured storage alone is not encryption."},
"HTTPS to server":{clear:["owner","page","server"],meta:["network metadata"],note:"Transport encryption does not hide content from recipient."},
"Server database":{clear:["owner","authorized server","privileged operator"],meta:["network metadata"],note:"Authorization and operator access must be explicit."},
"Server-side encryption":{clear:["owner","authorized server"],meta:["storage operator sees ciphertext","network metadata"],note:"Key-holding server can decrypt; privileged compromise remains a risk."},
"Client-side encryption":{clear:["owner","trusted client"],meta:["server sees ciphertext","network metadata"],note:"Assumes authentic isolated client and user-held keys; malicious client updates can defeat it."},
"Digital signature":{clear:["owner","verifier"],meta:[],note:"Authenticity is not confidentiality; signed plaintext is readable."},
"Scoped capability":{clear:["authorized holder","verifier"],meta:[],note:"A limited permission; not a place to put a private balance."},
"Limited proof":{clear:["owner","trusted prover"],meta:["merchant sees eligibility only"],note:"A proof or trusted attestation can reveal a predicate rather than the amount; no actual proof here."}
};
const portal=(k)=>k==="public-arrival"?"Allowed: public arrival tag":"Rejected: no private value in navigation";
const atrium=(k)=>k==="aggregate"?{total:100,transactions:2}:null;
const disclose=(k)=>k==="none"?{}:k==="eligibility"?{eligible:true}:k==="exact"?{balance:840}:null;
const initLedger=()=>({reserve:100,escrow:0,recipient:0,phase:"ready"});
function ledger(s,a){const t={...s};if(a==="commit"&&s.phase==="ready"){t.reserve-=40;t.escrow+=40;t.phase="held";}else if(a==="settle"&&s.phase==="held"){t.escrow-=40;t.recipient+=40;t.phase="settled";}else if(a==="refund"&&s.phase==="held"){t.escrow-=40;t.reserve+=40;t.phase="refunded";}else return null;if(t.reserve+t.escrow+t.recipient!==100||[t.reserve,t.escrow,t.recipient].some(x=>x<0))throw Error("conservation");return t}
const initClock=()=>({now:0,expiry:null,used:false,revoked:false});
function clock(s,a){const t={...s};if(a==="tick")t.now++;else if(a==="issue"&&t.expiry===null)t.expiry=t.now+3;else if(a==="revoke"&&t.expiry!==null&&!t.revoked)t.revoked=true;else if(a==="consume"&&t.expiry!==null&&!t.used&&!t.revoked&&t.now<t.expiry)t.used=true;else return null;return t}
const vaults={personal:"Private content: client key required; server stores ciphertext in intended design. Recovery must be explicit.",estate:"Authoritative ownership and obligations: not a private journal; closed estate settlements follow succession.",public:"Intentionally published records and rules: visible to all; no personal details."};
const rules={banker:["settle","issue"],world:["request","report"],witness:["observe"],player:["consent","revoke","request"]};
const allowed=(r,a)=>Object.prototype.hasOwnProperty.call(rules,r)&&rules[r].includes(a);
return {rooms,methods,portal,atrium,disclose,initLedger,ledger,initClock,clock,vaults,rules,allowed};
};
const tests=function tests(m){const checks=[];function ok(n,v){if(!v)throw Error(n);checks.push(n)}let l=m.initLedger(),h=m.ledger(l,"commit"),s=m.ledger(h,"settle"),r=m.ledger(h,"refund");ok("eight rooms",m.rooms.length===8);ok("public arrival",m.portal("public-arrival").startsWith("Allowed"));ok("private arrival denied",m.portal("private-balance").startsWith("Rejected"));ok("unknown arrival denied",m.portal("other").startsWith("Rejected"));ok("aggregate only",m.atrium("aggregate").total===100);ok("private view denied",m.atrium("private")===null);ok("no disclosure",Object.keys(m.disclose("none")).length===0);ok("limited claim",m.disclose("eligibility").eligible&&!Object.hasOwn(m.disclose("eligibility"),"balance"));ok("exact explicit",m.disclose("exact").balance===840);ok("unknown disclosure denied",m.disclose("other")===null);ok("commit conservation",h.reserve===60&&h.escrow===40&&h.recipient===0);ok("original unchanged",l.reserve===100);ok("duplicate commit denied",m.ledger(h,"commit")===null);ok("settlement",s.recipient===40&&s.escrow===0);ok("duplicate settlement denied",m.ledger(s,"settle")===null);ok("refund",r.reserve===100&&r.escrow===0);ok("refund after settlement denied",m.ledger(s,"refund")===null);ok("settle before commit denied",m.ledger(l,"settle")===null);ok("14 mechanisms",Object.keys(m.methods).length===14);ok("limited proof hides balance from merchant",!m.methods["Limited proof"].clear.includes("merchant"));ok("client vault no clear server",!m.methods["Client-side encryption"].clear.includes("server"));let c=m.initClock();ok("unissued denied",m.clock(c,"consume")===null);c=m.clock(c,"issue");ok("valid consume",m.clock(c,"consume").used);ok("replay denied",m.clock(m.clock(c,"consume"),"consume")===null);ok("revocation denied",m.clock(m.clock(c,"revoke"),"consume")===null);let e=c;for(let i=0;i<3;i++)e=m.clock(e,"tick");ok("expiry boundary denied",m.clock(e,"consume")===null);ok("three vaults",Object.keys(m.vaults).length===3);ok("banker settles",m.allowed("banker","settle"));ok("world cannot issue",!m.allowed("world","issue"));ok("witness cannot settle",!m.allowed("witness","settle"));ok("player can revoke consent",m.allowed("player","revoke"));ok("unknown roles denied",!m.allowed("constructor","issue"));return checks;};
const results=tests(model()); console.log(JSON.stringify({passed:results.length,results},null,2));
