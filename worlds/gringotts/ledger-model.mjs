// GRG-R0001: synthetic, deterministic reference model. No real auth, signatures, persistence or network.
function createBank(){
 const worlds=["darkweb","bayt-al-qamar"], accounts=new Map([["reserve",1000000n]]), used=new Set(), events=[], escrows=new Map(), dead=new Set();
 const valid=s=>typeof s==="string"&&/^[a-z0-9-]{1,50}$/.test(s);
 function amount(n){if(typeof n!=="string"||!/^[1-9][0-9]{0,17}$/.test(n))throw Error("positive integer decimal required");return BigInt(n)}
 const bal=k=>accounts.get(k)||0n;
 function commit(id,from,to,n,kind,world){if(!valid(id)||used.has(id))throw Error("duplicate or invalid transaction");if(from===to||n<=0n||bal(from)<n)throw Error("insufficient funds or invalid transfer");accounts.set(from,bal(from)-n);accounts.set(to,bal(to)+n);used.add(id);events.push(Object.freeze({id,kind,world,amount:n.toString()}));return Object.freeze({id,kind,amount:n.toString()})}
 function estate(w,p){if(!valid(p))throw Error("invalid synthetic alias");return w+":estate:"+p}
 function checkAlive(w,p){if(dead.has(estate(w,p)))throw Error("estate closed")}
 const grants=new Map();
 const bank=Object.freeze({
   authorize(id,world,n,expires,now){if(!valid(id)||grants.has(id)||!worlds.includes(world)||!Number.isSafeInteger(expires)||!Number.isSafeInteger(now)||expires<=now)throw Error("invalid grant");const value=amount(n);commit("grant-"+id,"reserve","held:"+id,value,"authorize",world);grants.set(id,{world,value,expires,status:"held"});return Object.freeze({id,world,amount:n,expires})},
   cancel(id,now){const g=grants.get(id);if(!g||g.status!=="held"||!Number.isSafeInteger(now)||now<g.expires)throw Error("not expired");commit("cancel-"+id,"held:"+id,"reserve",g.value,"cancel",g.world);g.status="cancelled"},
   audit(){return Object.freeze({reserve:bal("reserve").toString(),total:[...accounts.values()].reduce((a,b)=>a+b,0n).toString(),accounts:accounts.size,transactions:events.length})}
 });
 function client(w){return Object.freeze({
   redeem(id,now){const g=grants.get(id);if(!g||g.world!==w||g.status!=="held"||!Number.isSafeInteger(now)||now>=g.expires)throw Error("grant invalid");const r=commit("redeem-"+id,"held:"+id,w+":budget",g.value,"redeem",w);g.status="redeemed";return r},
   award(id,p,n){checkAlive(w,p);return commit(id,w+":budget",estate(w,p),amount(n),"award",w)},
   transfer(id,p,q,n){checkAlive(w,p);checkAlive(w,q);return commit(id,estate(w,p),estate(w,q),amount(n),"transfer",w)},
   escrow(id,p,q,n){checkAlive(w,p);checkAlive(w,q);const value=amount(n);const r=commit(id,estate(w,p),w+":escrow:"+id,value,"escrow",w);escrows.set(w+":"+id,{p,q,value,status:"held"});return r},
   settle(id,ref,decision){const e=escrows.get(w+":"+ref);if(!e||e.status!=="held"||!["release","refund"].includes(decision))throw Error("escrow unavailable");const pay=decision==="release"?e.q:e.p;const r=commit(id,w+":escrow:"+ref,estate(w,pay),e.value,decision,w);e.status=decision;return r},
   closeEstate(id,p){const k=estate(w,p);checkAlive(w,p);const n=bal(k);if(n===0n)throw Error("no committed property");const r=commit(id,k,w+":succession:"+p,n,"succession",w);dead.add(k);return r},
   view(p){return Object.freeze({world:w,alias:p,budget:bal(w+":budget").toString(),balance:bal(estate(w,p)).toString(),closed:dead.has(estate(w,p))})}
 })}
 return Object.freeze({bank,worlds:Object.freeze(Object.fromEntries(worlds.map(w=>[w,client(w)]))),witness:Object.freeze({read:()=>events.map(e=>({...e}))})})
}

function practiceYard(){
 let owner="miner", purse=12, floor=false, log=[];
 return Object.freeze({
  leave(){if(owner!=="miner")throw Error("not owner");floor=true;log.push("Miner leaves a fictional purse unattended.")},
  take(){if(!floor||owner!=="miner")throw Error("no unattended purse");owner="rogue";floor=false;log.push("Rogue takes the fictional purse.")},
  restitution(){if(owner!=="rogue")throw Error("nothing to restore");owner="miner";log.push("Purse returned after a local dispute.")},
  view(){return {owner,purse,unattended:floor,chronicle:[...log]}}
 })
}

function runTests(){
 const passed=[]; const assert=(name,condition)=>{if(!condition)throw Error(name);passed.push(name)};
 const deny=(name,fn)=>{let denied=false;try{fn()}catch{denied=true}assert(name,denied)};
 let b=createBank(),d=b.worlds.darkweb,q=b.worlds["bayt-al-qamar"];
 const unchanged=(name,fn)=>{const before=JSON.stringify(b.bank.audit());deny(name,fn);assert(name+" leaves journal unchanged",before===JSON.stringify(b.bank.audit()))};
 b.bank.authorize("a","darkweb","100",20,0);
 unchanged("duplicate grant",()=>b.bank.authorize("a","darkweb","100",20,0));
 unchanged("wrong audience",()=>q.redeem("a",1));
 d.redeem("a",1);unchanged("replay redemption",()=>d.redeem("a",2));
 unchanged("negative award",()=>d.award("bad","miner","-1"));
 unchanged("fractional award",()=>d.award("bad","miner","0.5"));
 unchanged("numeric rather than decimal string",()=>d.award("bad","miner",1));
 unchanged("over-budget award",()=>d.award("bad","miner","101"));
 d.award("award","miner","70"); unchanged("duplicate journal id",()=>d.award("award","miner","1"));
 d.transfer("t","miner","rogue","40");unchanged("conflicting second spend",()=>d.transfer("t2","miner","rogue","40"));
 unchanged("cross-world balance spend",()=>q.transfer("q1","miner","rogue","1"));
 d.escrow("esc","miner","rogue","20");unchanged("cross-world escrow settlement",()=>q.settle("q2","esc","release"));
 d.settle("refund","esc","refund");unchanged("double settlement",()=>d.settle("refund2","esc","release"));
 d.escrow("esc2","miner","rogue","10");d.settle("release","esc2","release");
 assert("correct escrow settlement",d.view("rogue").balance==="50"&&d.view("miner").balance==="20");
 b.bank.authorize("late","darkweb","25",4,0);unchanged("expired grant",()=>d.redeem("late",4));b.bank.cancel("late",4);
 d.closeEstate("death","miner");assert("closed estate only",d.view("miner").closed&&d.view("miner").balance==="0"&&d.view("rogue").balance==="50");
 unchanged("closed estate award",()=>d.award("dead","miner","1"));
 assert("world has no issuer method",typeof d.authorize==="undefined");assert("witness has no mutation method",Object.keys(b.witness).join()==="read");
 let ev=b.witness.read();ev[0].amount="999999";assert("witness copy cannot mutate journal",b.witness.read()[0].amount==="100");
 assert("conservation",b.bank.audit().total==="1000000");
 const y=practiceYard();deny("no purse before opportunity",()=>y.take());y.leave();y.take();assert("synthetic theft occurs",y.view().owner==="rogue");deny("purse not duplicated",()=>y.take());y.restitution();assert("restitution restores owner",y.view().owner==="miner");assert("yard cannot affect bank",b.bank.audit().total==="1000000");
 return passed;
}
export {createBank,practiceYard,runTests};
