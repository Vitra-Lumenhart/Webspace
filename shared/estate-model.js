/* R0037: fictional same-origin crossing; no real money, identity or cryptographic custody. */
(function(root){"use strict";
const KEY="webspace.estate.r1",LIMIT=4096,W=["gringotts","thousand"],MARKET=["bazaar","cross","names","broken","fortunes","commons","quiet"],FOLLOW=["lantern","broken","court"];
const init=()=>({version:1,mode:"visitor",world:null,risk:false,issued:false,coins:{reserve:10000,circulation:1000,vault:0,purse:0,disputed:0,shops:0},compass:"shop",follower:null,visits:0,contestVisit:-1,claim:null,records:[]});
const copy=x=>JSON.parse(JSON.stringify(x)),fail=x=>{throw Error(x)};
function move(s,a,b,n){if(!Number.isSafeInteger(n)||n<=0||s.coins[a]<n)fail("Insufficient fictional chips");s.coins[a]-=n;s.coins[b]+=n;}
function apply(old,e){if(!e||!W.includes(e.world)||!Number.isSafeInteger(e.id)||e.id!==old.records.length+1||e.id>LIMIT)fail("Invalid or full journal");
const s=copy(old),g=e.world==="gringotts",at=()=>{if(s.world!==e.world||s.mode==="visitor")fail("No active estate here");},town=()=>{at();if(g)fail("Only in the Thousand");},node=e.node||"";
const loss=()=>{if(!s.risk||s.claim||s.coins.purse<6)fail("No eligible risk");move(s,"purse","disputed",6);const object=s.mode==="guest"&&s.compass==="carried";if(object)s.compass="disputed";s.claim={id:e.id,amount:6,object};};
switch(e.kind){
case "enroll":if(!g||s.issued||(s.world&&s.world!==e.world))fail("Enrollment only once at Gringotts");s.mode="banked";s.world=e.world;s.issued=true;move(s,"reserve","vault",100);break;
case "guest":if(g||s.mode!=="visitor")fail("Guest admission only once in the Thousand");s.mode="guest";s.world=e.world;move(s,"circulation","purse",24);break;
case "cross":at();s.world=g?"thousand":"gringotts";s.visits++;s.risk=false;break;
case "withdraw":at();if(!g||s.mode!=="banked")fail("Use the bank");move(s,"vault","purse",e.amount);break;
case "deposit":at();if(!g||s.mode!=="banked")fail("Use the bank");move(s,"purse","vault",e.amount);break;
case "risk-on":town();s.risk=true;break;
case "risk-off":town();s.risk=false;break;
case "buy":town();if(!MARKET.includes(node)||s.compass!=="shop")fail("Compass unavailable");move(s,"purse","shops",8);s.compass="carried";break;
case "sell":town();if(!MARKET.includes(node)||s.compass!=="carried")fail("Carry compass to market");move(s,"shops","purse",5);s.compass="shop";break;
case "seal":at();if(!g||s.mode!=="banked"||s.compass!=="carried")fail("Bring carried compass to bank");s.compass="vault";break;
case "unseal":at();if(!g||s.mode!=="banked"||s.compass!=="vault")fail("No sealed compass");s.compass="carried";break;
case "recruit":town();if(!FOLLOW.includes(node)||s.follower)fail("Companion unavailable");s.follower={id:"mara-apprentice",rapport:1,memory:"You invited me to travel."};break;
case "loss":town();loss();break;
case "recover":town();if(node!=="court"||!s.claim)fail("Bring claim to the Court");move(s,"disputed","purse",s.claim.amount);if(s.claim.object)s.compass="carried";s.claim=null;break;
case "rival":town();if(!MARKET.includes(node)||!s.risk||s.claim||s.contestVisit===s.visits||s.coins.purse<6)fail("Contest unavailable");s.contestVisit=s.visits;if((Math.imul(e.id,2654435761)>>>0)%3===0)loss();else move(s,"circulation","purse",3);break;
default:fail("Unknown action");}
if(Object.values(s.coins).some(x=>!Number.isSafeInteger(x)||x<0)||Object.values(s.coins).reduce((a,b)=>a+b,0)!==11000)fail("Conservation");
s.records.push({id:e.id,world:e.world,kind:e.kind,...(["deposit","withdraw"].includes(e.kind)?{amount:e.amount}:{}),...(["buy","sell","recruit","recover","rival"].includes(e.kind)?{node}:{} )});return s;}
function replay(r){if(!Array.isArray(r)||r.length>LIMIT)fail("Invalid journal");return r.reduce(apply,init());}
function read(){const v=root.localStorage.getItem(KEY);return v===null?init():replay(JSON.parse(v));}
async function act(world,kind,amount,node,expected){if(!root.navigator?.locks)fail("Shared storage lock unavailable");return root.navigator.locks.request(KEY,()=>{const s=read();if(s.records.length!==expected)fail("State changed; review and retry");const next=apply(s,{id:expected+1,world,kind,amount,node});root.localStorage.setItem(KEY,JSON.stringify(next.records));return next;});}
function witness(s){return {mode:s.mode,world:s.world,risk:s.risk,exposure:s.mode==="guest"?"open":"bounded",...(s.mode==="guest"?{carriedChips:s.coins.purse,carriedCompass:s.compass==="carried"}:{carriedBand:s.coins.purse>=6?"eligible":"small"}),companion:!!s.follower,publicClaim:!!s.claim};}
function riskMultiplier(s,nudge){return s.world==="thousand"&&s.risk&&!s.claim?Math.min(3,(s.mode==="guest"?2:1)*(1+Math.max(0,Math.min(1,Number(nudge)||0))*.5)):0;}
root.WSEstate={init,apply,replay,read,act,witness,riskMultiplier,KEY,MARKET,FOLLOW};
})(globalThis);
