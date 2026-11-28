const DATA={
  "cast": {
    "Hester": [
      "Hester Vale",
      "Guide; no banker key"
    ],
    "Willow": [
      "Willow Ufgood",
      "Independent sorcerer and customer"
    ],
    "Cadfael": [
      "Brother Cadfael",
      "Guest herbalist; testimony, not adjudication"
    ],
    "Data": [
      "Data",
      "Guest investigator; no privileged machine access"
    ],
    "Venn": [
      "Professor Venn",
      "Thousand mathematician; counterexamples"
    ],
    "Keeper": [
      "Keeper of Measures",
      "Accounting teacher"
    ],
    "Registrar": [
      "Registrar of Estates",
      "Custody and succession teacher"
    ],
    "Merchant": [
      "Returning Merchant",
      "Independent traveler"
    ]
  },
  "rooms": [
    "Portico of the Seal",
    "Grand Banking Atrium",
    "Goblin Teller Row",
    "Coin and Currency Exchange",
    "Correspondence Gallery",
    "Chronomancer’s Calendar",
    "Underhall of Private Vaults",
    "Silent Strongroom"
  ],
  "scenes": [
    [
      0,
      "door",
      "The right to arrive",
      "Hester",
      "opens her palm toward the passage",
      "Come in, or go. Neither requires a name.",
      "Willow",
      "I have come to collect a letter, if the post has had a better journey than I have.",
      "The Last Lantern also welcomes strangers without a purchase or identification.",
      [
        [
          "ask",
          "Can I enter without giving a name?",
          "visitor|enter|public portico|charter|public",
          "explain",
          "Yes. The door is not an application form."
        ],
        [
          "offer",
          "Put my fictional balance on the travel paper.",
          "visitor|publish|private balance|proposal|portal",
          "deny",
          "No. A destination does not require your balance."
        ],
        [
          "ask",
          "Does the Thousand need this bank's permission?",
          "Thousand|govern|local commerce|charter|local",
          "explain",
          "No. It may choose its own agreements."
        ]
      ]
    ],
    [
      0,
      "names",
      "Five kinds of name",
      "Willow",
      "sets a traveling case on the bench",
      "I am a person, a visitor and the owner of this case. Surely those are not all the same entry in a book.",
      "Hester",
      "Person, private account, world pseudonym, estate and session are distinct.",
      "The Avenue of Second Names allows appearances without requiring testimony about identity.",
      [
        [
          "ask",
          "Can my local alias remain local?",
          "world alias|identify|local visitor|charter|one world",
          "explain",
          "Yes. No automatic linking across worlds."
        ],
        [
          "offer",
          "Link all my aliases everywhere.",
          "visitor|link|all aliases|proposal|unbounded",
          "deny",
          "Not as a default. Specify a recipient and purpose first."
        ],
        [
          "ask",
          "Does a passkey prove my civil name?",
          "passkey|authenticate|account|design|account",
          "explain",
          "It verifies control of a registered credential under the protocol, not civil identity or anonymity."
        ]
      ]
    ],
    [
      1,
      "windows",
      "A window into the bank",
      "Willow",
      "studies the scales",
      "It is a fine thing to see work being done. I need not see whose work it is.",
      "Data",
      "The public counter and an individual record are different queries.",
      "The Wheel of Chances is a public institution, not a universal dossier.",
      [
        [
          "ask",
          "Show the invented aggregate.",
          "public counter|display|aggregate|synthetic|public",
          "explain",
          "The illustrative aggregate is 100 chips across two transactions; no individual record is shown."
        ],
        [
          "ask",
          "Show another customer's balance.",
          "visitor|read|other balance|proposal|private",
          "deny",
          "That record is outside your authority."
        ],
        [
          "ask",
          "Does an aggregate guarantee privacy?",
          "aggregate|protect|identity|hypothesis|public",
          "explain",
          "Not always. Small groups and repeated queries can reveal individual information."
        ]
      ]
    ],
    [
      1,
      "evidence",
      "The beautiful counterexample",
      "Venn",
      "sets a wire construction beside the counter",
      "If I already know one person's amount, perhaps the total tells me the other.",
      "Willow",
      "Then the number has said rather more than its maker intended.",
      "Venn exhibits at the Hall of Uncertain Arts, where failed conjectures can be valuable.",
      [
        [
          "offer",
          "Publish every narrow subtotal.",
          "bank|publish|narrow subtotal|proposal|public",
          "deny",
          "Not without disclosure review."
        ],
        [
          "ask",
          "What did Venn establish?",
          "Venn|infer|possible leakage|inference|example",
          "explain",
          "A counterexample to a guarantee, not evidence of an actual leak."
        ],
        [
          "ask",
          "May I disagree?",
          "visitor|challenge|claim|public discussion|public",
          "explain",
          "Of course. Evidence matters more than agreement."
        ]
      ]
    ],
    [
      2,
      "claim",
      "The price of a question",
      "Hester",
      "lays two blank forms on the counter",
      "A merchant asks whether you can meet a fictional price. You need not reveal your whole purse.",
      "Willow",
      "Ask the question that the bargain actually requires.",
      "A Thousand merchant may accept an independent agreement instead of a bank attestation.",
      [
        [
          "offer",
          "Share eligibility only with this demonstration merchant.",
          "visitor|disclose|eligible=true|synthetic|demo merchant",
          "eligibility",
          "The merchant receives eligibility, not balance."
        ],
        [
          "offer",
          "Share the exact fictional balance with this merchant.",
          "visitor|disclose|balance=840|synthetic|demo merchant",
          "exact",
          "The merchant receives 840 fictional chips as a balance figure, not a payment."
        ],
        [
          "refuse",
          "No disclosure; seek another arrangement.",
          "visitor|decline|disclosure|choice|none",
          "refuse",
          "You remain welcome. Negotiate locally or leave."
        ]
      ]
    ],
    [
      2,
      "privacy",
      "The unchosen face",
      "Cadfael",
      "turns a chair away from the counter",
      "A private conversation does not become dishonest merely because it is private.",
      "Hester",
      "Ask for privacy before deciding whether there is a bargain at all.",
      "The Merchant of Unchosen Faces protects commissions unless the patron invites disclosure.",
      [
        [
          "ask",
          "Is a private alcove proof of encryption?",
          "alcove|guarantee|confidentiality|hypothesis|physical",
          "explain",
          "No. Physical privacy, cryptographic privacy and recipient behavior differ."
        ],
        [
          "offer",
          "Authorize everyone to hear the conversation.",
          "visitor|disclose|conversation|proposal|unbounded",
          "deny",
          "An undefined audience is not a meaningful scope here."
        ],
        [
          "refuse",
          "I prefer to leave.",
          "visitor|decline|consultation|choice|none",
          "refuse",
          "Certainly. No debt or adverse reputation follows."
        ]
      ]
    ],
    [
      3,
      "escrow",
      "The capsule that came back",
      "Willow",
      "waits beside the Engine's glass chamber",
      "I paid once. I would like to know whether it arrived, not pay it again.",
      "Keeper",
      "A request, a commitment and a settlement are different states.",
      "Orren Blackwake's Blackwater cargo receipts may evidence local delivery; they are not themselves bank settlement.",
      [
        [
          "offer",
          "Commit 40 fictional chips to escrow.",
          "visitor|commit|40 chips|synthetic|demo ledger",
          "commit",
          "Move 40 from reserve to escrow if ready."
        ],
        [
          "offer",
          "Settle the existing escrow.",
          "visitor|settle|40 chips|synthetic|demo ledger",
          "settle",
          "Move held chips to the recipient once, if held."
        ],
        [
          "offer",
          "Refund the existing escrow.",
          "visitor|refund|40 chips|synthetic|demo ledger",
          "refund",
          "Return held chips to reserve once, if held."
        ]
      ]
    ],
    [
      3,
      "estate",
      "The absent merchant",
      "Registrar",
      "leaves an empty chair beside the book",
      "A merchant died before a refund arrived. The amount is not in dispute. The recipient is.",
      "Cadfael",
      "A receipt establishes a fact about payment. It may not establish the rightful heir.",
      "The Court of Many Promises has independent adjudicators; a bank receipt is not universal jurisdiction.",
      [
        [
          "offer",
          "Credit the deceased character directly.",
          "bank|credit|closed estate|proposal|estate",
          "deny",
          "GRG-R0002 routes late settlement to succession rather than a closed account."
        ],
        [
          "ask",
          "Does succession decide the beneficiary?",
          "succession|establish|beneficiary|hypothesis|estate",
          "explain",
          "No. Beneficiary authorization and adjudication remain separate."
        ],
        [
          "ask",
          "What can the Court decide?",
          "Court|adjudicate|local agreement|charter|local",
          "explain",
          "Applicable local agreements and evidence; it cannot rewrite the bank journal."
        ]
      ]
    ],
    [
      4,
      "letter",
      "The letter and its shadow",
      "Willow",
      "places a sealed envelope on a brass rail",
      "The message is sealed. The destination, I notice, is written rather large.",
      "Data",
      "Content protection does not imply protection of metadata.",
      "A Blackwater courier may know routes and custody without knowing sealed contents.",
      [
        [
          "ask",
          "Compare URL query and fragment.",
          "browser|expose|route fields|technical example|client and server",
          "explain",
          "Queries normally reach the server and may enter logs. Fragments normally stay client-side, but page scripts can read them."
        ],
        [
          "ask",
          "Compare HTTPS and client encryption.",
          "encryption|protect|content|technical example|transport versus client",
          "explain",
          "HTTPS protects transit; the receiving server can read plaintext. A trusted client with user-held keys can send ciphertext instead."
        ],
        [
          "ask",
          "Can local storage hide plaintext from same-origin scripts?",
          "browser storage|hide|plaintext|hypothesis|same origin",
          "explain",
          "No. Storage is not confidentiality. Cookies remain hypothetical; the no-cookie covenant stands."
        ]
      ]
    ],
    [
      4,
      "provenance",
      "The anonymous letter",
      "Cadfael",
      "examines the outside of a letter",
      "The writer alleges that a compass was stolen. I have seen the letter, not the theft.",
      "Hester",
      "An allegation is not a verdict.",
      "The Court hears contradictory testimony; the Quiet Market values discretion.",
      [
        [
          "offer",
          "Record the allegation as testimony.",
          "Cadfael|report|unverified theft claim|testimony|demo record",
          "testimony",
          "Record the unverified allegation; no ruling or penalty."
        ],
        [
          "offer",
          "Publish the allegation as proven guilt.",
          "visitor|assert|guilt|unverified|public",
          "deny",
          "A claim cannot become a ruling by changing its wording."
        ],
        [
          "ask",
          "Does a signature prove a claim is true?",
          "signature|verify|claim truth|hypothesis|message",
          "explain",
          "A signature may establish message integrity and authenticity under assumptions, not the truth of the claim."
        ]
      ]
    ],
    [
      5,
      "writ",
      "The writ that outlived its hour",
      "Hester",
      "unfolds a practice writ",
      "A temporary permission is a promise with edges. This one grants three demonstration ticks.",
      "Willow",
      "Then let us agree which clock we are using before agreeing what is late.",
      "The Thousand's local writ does not thereby become a bank grant.",
      [
        [
          "offer",
          "Issue a practice writ.",
          "visitor|request|three-tick grant|synthetic|demo clock",
          "issue",
          "Issue a single practice grant if none exists."
        ],
        [
          "offer",
          "Consume the practice writ.",
          "visitor|consume|grant|synthetic|demo clock",
          "consume",
          "Use only an issued, unspent, unexpired, unrevoked grant."
        ],
        [
          "offer",
          "Revoke future use.",
          "visitor|revoke|grant|synthetic|demo clock",
          "revoke",
          "Mark issued grant revoked; prior observations remain."
        ]
      ]
    ],
    [
      5,
      "time",
      "A clock without a kingdom",
      "Data",
      "compares two calendar rings",
      "The display indicates two times. Which one has authority over the grant?",
      "Willow",
      "A date and a promise are not quite the same thing.",
      "Independent world clocks can coexist with an agreed validity reference.",
      [
        [
          "offer",
          "Advance the demonstration clock one tick.",
          "visitor|advance|demo clock|synthetic|local demo",
          "tick",
          "Advance only the synthetic grant clock."
        ],
        [
          "offer",
          "Let my browser choose the bank expiry time.",
          "browser|set|trusted time|proposal|bank",
          "deny",
          "A production verifier must use a trusted validity reference."
        ],
        [
          "ask",
          "Can revocation erase what somebody already saw?",
          "revocation|erase|prior observation|hypothesis|recipient",
          "explain",
          "Not generally. Future authorization and prior knowledge differ."
        ]
      ]
    ],
    [
      6,
      "keys",
      "Three kinds of keeping",
      "Willow",
      "rests a hand on his traveling case",
      "I own the case, but ownership does not guarantee I can open it.",
      "Registrar",
      "Personal vaults, estate custody and public archives serve different purposes.",
      "Mara's principle: repair is not permission to own.",
      [
        [
          "ask",
          "What if I lose a personal vault key?",
          "owner|recover|encrypted content|design|personal",
          "explain",
          "Recovery depends on prearranged key recovery. Otherwise contents may be irrecoverable."
        ],
        [
          "ask",
          "Does borrowing a compass transfer title?",
          "borrower|acquire|title|hypothesis|estate",
          "explain",
          "No. Custody, title and access are separate."
        ],
        [
          "offer",
          "Give Vitra a universal vault key.",
          "visitor|delegate|master key|proposal|all vaults",
          "deny",
          "No universal key is requested. Use a limited authorized operation instead."
        ]
      ]
    ],
    [
      6,
      "memory",
      "The repair ticket",
      "Cadfael",
      "turns over a public repair ticket",
      "This mark tells me someone repaired it. It does not tell me who owns it now.",
      "Willow",
      "Nor does it tell us what they meant to do with it.",
      "Mara dates repairs with brass stitches; biographies do not erase custody or consent.",
      [
        [
          "ask",
          "What is directly observable?",
          "repair ticket|evidence|repair mark|observation|public demo",
          "explain",
          "The visible mark. Ownership and intent need other evidence."
        ],
        [
          "ask",
          "Recall my private conversation in another world.",
          "NPC|recall|private conversation|proposal|cross-world",
          "deny",
          "Not without a grounded record and explicit permission to carry it."
        ],
        [
          "ask",
          "Can I correct an inaccurate memory?",
          "visitor|correct|record|charter|authorized scope",
          "explain",
          "The intended system appends corrections with provenance; it does not silently rewrite history."
        ]
      ]
    ],
    [
      7,
      "powers",
      "The three assemblies",
      "Hester",
      "steps aside from the open book",
      "Banker, world authority and witness each have an office. I hold none of their master keys.",
      "Willow",
      "Then the bank has made a limit worth admiring.",
      "Vitra may witness opted-in fictional exposure in the Thousand, not access protected reserves or private accounts.",
      [
        [
          "offer",
          "Let the witness settle the bank ledger.",
          "witness|settle|ledger|proposal|bank",
          "deny",
          "Observation does not grant mutation authority."
        ],
        [
          "offer",
          "Let a world issue bank credit.",
          "world|issue|bank grant|proposal|bank",
          "deny",
          "Worlds may issue their own local assets, not mint bank credit."
        ],
        [
          "ask",
          "Can Hester or Willow make an exception?",
          "guide|override|bank rules|hypothesis|bank",
          "explain",
          "No. Personal trust is not delegated software authority."
        ]
      ]
    ],
    [
      7,
      "departure",
      "Two honest doors",
      "Willow",
      "collects his case and inclines his head",
      "I have my letter. I think I shall take tea at the Last Lantern.",
      "Hester",
      "You may bank here, trade there, do both, or neither. Understand the agreement you choose.",
      "Gringotts is designed order; the Thousand emergent order. Neither is sovereign over the other.",
      [
        [
          "ask",
          "Can I play unbanked and keep my privacy?",
          "guest|participate|local play|charter|world",
          "explain",
          "Yes. Greater fictional field exposure requires separately accepted rules, not real surveillance."
        ],
        [
          "ask",
          "Can an independent agreement be valid?",
          "Thousand|recognize|local writ|charter|local",
          "explain",
          "Yes, within its issuer and agreement scope; not automatically a bank capability."
        ],
        [
          "refuse",
          "Leave without enrolling.",
          "visitor|decline|bank enrollment|choice|none",
          "refuse",
          "The door remains open. No score, debt or loss of public instruction."
        ]
      ]
    ]
  ]
};
const makeEngine=function makeEngine(scenes){
 const effects=new Set(["eligibility","exact","commit","settle","refund","testimony","issue","consume","revoke","tick"]);
 const frame=s=>{const [subject,predicate,object,provenance,scope]=s.split("|");return {subject,predicate,object,provenance,scope}};
 const initial=()=>({scene:null,phase:"idle",choice:null,version:0,ledger:{reserve:100,escrow:0,recipient:0,phase:"ready"},clock:{now:0,expiry:null,used:false,revoked:false},disclosures:[],testimony:[],events:[],result:null});
 function step(state,event){
  const reject=reason=>({ok:false,state,reason});
  if(!event||event.version!==state.version)return reject("Stale or invalid control");
  let n=JSON.parse(JSON.stringify(state));const done=reason=>{n.version++;return {ok:true,state:n,reason}};
  if(event.type==="open"){if(!Number.isInteger(event.scene)||!scenes[event.scene]||state.phase==="terms")return reject("Invalid scene or pending terms");n.scene=event.scene;n.phase="invitation";n.choice=null;n.result=null;return done("Invitation")}
  if(event.type==="leave"&&state.scene!==null){n.phase="closed";n.choice=null;n.result="You may leave. Leaving makes no commitment.";return done("Departed")}
  if(state.scene===null)return reject("No encounter");
  const scene=scenes[state.scene],options=scene[9];
  if(event.type==="choose"&&state.phase==="invitation"&&Number.isInteger(event.choice)&&options[event.choice]){
   const o=options[event.choice];n.choice=event.choice;
   if(effects.has(o[3])){n.phase="terms";return done("Terms offered; no effect")}
   n.phase="outcome";n.result=o[4];n.events.push({scene:scene[1],intent:o[0],frame:frame(o[2]),status:o[3]==="deny"?"denied":o[3]==="refuse"?"declined":"explained"});return done("Conversation only")
  }
  if(event.type==="decline"&&state.phase==="terms"){n.phase="outcome";n.result="No action taken. You remain welcome.";n.events.push({scene:scene[1],status:"declined"});return done("Declined")}
  if(event.type==="confirm"&&state.phase==="terms"&&options[state.choice]){
   const o=options[state.choice],k=o[3];if(!effects.has(k))return reject("Not actionable");
   let ok=true,detail="",l=n.ledger,c=n.clock;
   switch(k){
   case "eligibility":n.disclosures.push({recipient:"demo merchant",fields:{eligible:true},purpose:"purchase eligibility"});detail="Disclosed eligibility only.";break;
   case "exact":n.disclosures.push({recipient:"demo merchant",fields:{balance:840},purpose:"purchase eligibility"});detail="Disclosed fictional balance 840.";break;
   case "testimony":n.testimony.push({kind:"testimony",claim:"unverified compass theft allegation",source:"demo letter",verified:false});detail="Testimony recorded; no ruling.";break;
   case "commit":if(l.phase!=="ready")ok=false;else{l.reserve-=40;l.escrow+=40;l.phase="held"}break;
   case "settle":if(l.phase!=="held")ok=false;else{l.escrow-=40;l.recipient+=40;l.phase="settled"}break;
   case "refund":if(l.phase!=="held")ok=false;else{l.escrow-=40;l.reserve+=40;l.phase="refunded"}break;
   case "issue":if(c.expiry!==null)ok=false;else c.expiry=c.now+3;break;
   case "consume":if(c.expiry===null||c.now>=c.expiry||c.used||c.revoked)ok=false;else c.used=true;break;
   case "revoke":if(c.expiry===null||c.revoked)ok=false;else c.revoked=true;break;
   case "tick":c.now++;break;
   default:ok=false;
   }
   if(l.reserve+l.escrow+l.recipient!==100||Math.min(l.reserve,l.escrow,l.recipient)<0)throw Error("conservation");
   n.phase="outcome";n.result=ok?"Confirmed demonstration: "+(detail||JSON.stringify(["commit","settle","refund"].includes(k)?l:c)):"Rejected by model; no state change.";
   n.events.push({scene:scene[1],intent:o[0],frame:frame(o[2]),status:ok?"confirmed-demo":"rejected-demo"});return done(ok?"Confirmed demonstration":"Rejected demonstration")
  }
  return reject("Invalid transition");
 }
 function terms(s){if(s.phase!=="terms")return null;const o=scenes[s.scene][9][s.choice],disclose=["eligibility","exact"].includes(o[3]);return {proposition:frame(o[2]),recipient:disclose?"demo merchant":"local demonstration model",purpose:disclose?"purchase eligibility":"instructional simulation",duration:"session memory; grant validity as stated",revocation:disclose?"Decline before confirmation; prior disclosure cannot be unlearned":"Decline before confirmation; later actions follow model rules",consequence:o[4],alternative:"Decline or leave without penalty",effect:o[3]}}
 return {initial,step,frame,effects,terms};
};

const runTests=function runTests(scenes,cast,makeEngine){
 const m=makeEngine(scenes),results=[];const check=(n,v)=>{if(!v)throw Error(n);results.push(n)};const go=(s,type,more={})=>m.step(s,{type,version:s.version,...more});const open=(s,i)=>go(s,"open",{scene:i}).state,choose=(s,i)=>go(s,"choose",{choice:i}).state,confirm=s=>go(s,"confirm").state;const model=s=>JSON.stringify([s.ledger,s.clock,s.disclosures,s.testimony]);
 check("eight rooms",new Set(scenes.map(s=>s[0])).size===8);check("16 unique scenes",new Set(scenes.map(s=>s[1])).size===16);
 for(let i=0;i<scenes.length;i++){let sc=scenes[i];check(sc[1]+" cast and choices",!!cast[sc[3]]&&!!cast[sc[6]]&&sc[9].length===3);for(let j=0;j<3;j++){let o=sc[9][j],s=open(m.initial(),i),p=choose(s,j);check(sc[1]+"/"+j+" complete frame",Object.values(m.frame(o[2])).every(Boolean));check(sc[1]+"/"+j+" no implicit mutation",model(p)===model(s));if(m.effects.has(o[3])){check(sc[1]+"/"+j+" terms",Object.values(m.terms(p)).every(Boolean));check(sc[1]+"/"+j+" decline preserves state",model(go(p,"decline").state)===model(s));check(sc[1]+"/"+j+" confirmation terminal",confirm(p).phase==="outcome")}else check(sc[1]+"/"+j+" conversational outcome",p.phase==="outcome")}}
 let s=open(m.initial(),6);check("unconfirmed action denied",!go(s,"confirm").ok);let p=choose(s,0);check("stale confirm denied",!m.step(p,{type:"confirm",version:s.version}).ok);check("pending departure preserves model",model(go(p,"leave").state)===model(s));check("pending scene switch denied",!go(p,"open",{scene:2}).ok);s=confirm(p);check("40 escrow",s.ledger.escrow===40&&s.ledger.reserve===60);s=confirm(choose(open(s,6),1));check("settlement",s.ledger.recipient===40);let dup=confirm(choose(open(s,6),1));check("duplicate settlement denied",dup.events.at(-1).status==="rejected-demo"&&model(dup)===model(s));
 let a=confirm(choose(open(m.initial(),10),0));a=confirm(choose(open(a,10),2));check("revoked grant denied",confirm(choose(open(a,10),1)).events.at(-1).status==="rejected-demo");a=confirm(choose(open(m.initial(),10),0));for(let k=0;k<3;k++)a=confirm(choose(open(a,11),0));check("expiry boundary denied",confirm(choose(open(a,10),1)).events.at(-1).status==="rejected-demo");a=confirm(choose(open(m.initial(),10),0));a=confirm(choose(open(a,10),1));check("grant replay denied",confirm(choose(open(a,10),1)).events.at(-1).status==="rejected-demo");a=confirm(choose(open(m.initial(),4),0));check("eligibility excludes balance",!Object.hasOwn(a.disclosures[0].fields,"balance"));a=confirm(choose(open(m.initial(),9),0));check("testimony stays unverified",a.testimony[0].verified===false);check("unknown scene denied",!go(m.initial(),"open",{scene:99}).ok);check("unknown event denied",!go(open(m.initial(),0),"override").ok);return results;
};
const assertions=runTests(DATA.scenes,DATA.cast,makeEngine);console.log(JSON.stringify({passed:assertions.length,assertions},null,2));
