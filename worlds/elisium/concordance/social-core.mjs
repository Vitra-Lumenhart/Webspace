/* Elisium v9 candidate: hidden character transition networks. No theology or sky control. */
export const BUILD='hidden-machines-candidate-2026-11-24';
export const NODES=Object.freeze(['tip0','tip1','tip2','tip3','tip4','tip5','tip6']);
const questions=Object.freeze({
 testimony:{label:'Who may speak for an absent witness?',claim:'Testimony depends upon its route to the listener.'},
 mercy:{label:'Can mercy require a difficult truth?',claim:'Kindness and disclosure can demand different acts.'},
 myth:{label:'What survives when a story changes hands?',claim:'A changing story need not forget its source.'},
 refusal:{label:'When does silence become a deliberate answer?',claim:'One can withdraw without conceding.'},
 revision:{label:'Can a correction repair public harm?',claim:'A changed word does not erase its history.'}
});
export const TOPICS=questions;
/* Literary-proxy names and object specialisms occur in recovered DESIGN.md proposals.
   These are original Elisium fictional sketches; NOT historical persons' opinions.
   This is NOT an audited migration of the 64 native commentator records. */
export const PROTOTYPE_NPCS=Object.freeze([
 {id:'proto-lewis',name:'Lewis · fictional interlocutor',node:'tip5',special:['H15','H03','H23'],rest:'discernment',voice:'precise',threshold:2,disposition:{testimony:2,mercy:2,myth:3,refusal:1,revision:2}},
 {id:'proto-leguin',name:'Le Guin · fictional interlocutor',node:'tip5',special:['H01','H02','H16'],rest:'freedom',voice:'inquisitive',threshold:1,disposition:{testimony:3,mercy:2,myth:3,refusal:3,revision:2}},
 {id:'proto-dante',name:'Dante · fictional interlocutor',node:'tip5',special:['H10','H19','H21'],rest:'journey',voice:'reflective',threshold:3,disposition:{testimony:2,mercy:2,myth:2,refusal:2,revision:1}},
 {id:'proto-rumi',name:'Rumi · fictional interlocutor',node:'tip2',special:['H07','H03','H23'],rest:'longing',voice:'poetic',threshold:2,disposition:{testimony:1,mercy:3,myth:2,refusal:2,revision:1}},
 {id:'proto-chaucer',name:'Chaucer · fictional interlocutor',node:'tip2',special:['H23','H04','H11'],rest:'many-voices',voice:'wry',threshold:2,disposition:{testimony:3,mercy:1,myth:2,refusal:2,revision:3}},
 {id:'proto-tolkien',name:'Tolkien · fictional interlocutor',node:'tip4',special:['H13','H08','H24'],rest:'subcreation',voice:'measured',threshold:2,disposition:{testimony:2,mercy:1,myth:3,refusal:2,revision:2}}
]);
const ACTS=['hypothesis','rebuttal','concession','analogy','question','quiet','invitation'];
const clamp=(x,a,b)=>Math.min(b,Math.max(a,x));
const clone=x=>JSON.parse(JSON.stringify(x));
function hashSeed(seed){let v=(Number(seed)>>>0)||20112026;return v;}
function randStep(x){return (Math.imul(1664525,x)+1013904223)>>>0;}
function defaultRoute(from,to){const roads={tip5:['tip4','tip2'],tip2:['tip5','tip4'],tip4:['tip2','tip5']};if(from===to)return {path:[from],cost:0};return roads[from]?.includes(to)?{path:[from,to],cost:8}:null;}
export class SocialSimulation {
 constructor({seed=20112026,route=defaultRoute,save=null}={}){
  this.route=route;this.seed=hashSeed(seed);this.time=0;this.serial=0;this.playerNode='tip5';this.events=[];this.houseObjects=[];this.methods=[];this.clockReceipts=[];
  this.actors=PROTOTYPE_NPCS.map((p,i)=>({...clone(p),state:{conviction:2,trust:1,obligation:i%3,readiness:1,attention:1},unlocked:[],seen:[],turns:0,at:p.node,travel:null,relationship:{},restingView:p.rest}));
  this.forums={tip5:this.newForum('tip5','testimony'),tip2:this.newForum('tip2','mercy')};
  if(save)this.importState(save);
  else this.emit('simulation_started',{description:'Two independent node discussions; six provisional literary proxies; hidden machines active.'},['public']);
 }
 newForum(node,topic){return {node,topic,issue:1,owner:null,turns:0,playerSpoken:false,state:'active',history:[]};}
 emit(kind,data={},seenBy=['public']){const e={id:'ev'+String(++this.serial).padStart(5,'0'),minute:this.time,kind,data:clone(data),visibility:seenBy[0]||'public'};this.events.push(e);if(this.events.length>350)this.events.shift();return e;}
 r(){this.seed=randStep(this.seed);return this.seed/4294967296;}
 get actorLocations(){return Object.fromEntries(this.actors.map(a=>[a.id,a.at]));}
 forum(node){return this.forums[node]||null;}
 at(node){return this.actors.filter(a=>a.at===node&&!a.travel);}
 currentForum(){return this.forum(this.playerNode);}
 setPlayerNode(node){if(!NODES.includes(node))return false;this.playerNode=node;this.emit('player_location',{node},['public']);return true;}
 syncPlayerNode(node){if(NODES.includes(node)&&this.playerNode!==node){this.playerNode=node;this.emit('player_location',{node},['public']);}}
 observeHouse(ids,minutes=0,receipt='house-'+String(this.serial+1)){
  if(this.clockReceipts.includes(receipt))return false;
  if(!Array.isArray(ids)||ids.some(id=>!/^H(0[1-9]|1[0-9]|2[0-4])$/.test(id)))return false;
  if(!Number.isInteger(minutes)||minutes<0||minutes>2880)return false;
  this.clockReceipts.push(receipt);this.time+=minutes;
  for(const id of ids){if(!this.houseObjects.includes(id))this.houseObjects.push(id)}
  const unlocks={H05:'audit_testimony',H20:'sample_uncertainty',H23:'open_second_chair',H21:'question_prediction'};
  for(const id of ids){let u=unlocks[id];if(u&&!this.methods.includes(u)){this.methods.push(u);this.emit('learned_method',{object:id,method:u},['player'])}}
  this.emit('kilns_return',{ids:[...new Set(ids)],elapsed_minutes:minutes,receipt},['player']);return true;
 }
 topic(node,topic,origin='player'){
  if(!NODES.includes(node)||!Object.prototype.hasOwnProperty.call(questions,topic))return false;
  const forum=this.forums[node];
  if(forum){if(forum.topic===topic)return false;forum.topic=topic;forum.issue++;forum.playerSpoken=false;forum.owner=null;forum.turns=0;forum.history=[];this.emit('new_issue',{node,topic,origin});return true;}
  this.forums[node]=this.newForum(node,topic);this.emit('forum_created',{node,topic,origin});return true;
 }
 interject(kind){
  const f=this.currentForum();if(!f||f.playerSpoken)return false;
  const requirements={evidence:'audit_testimony',poll:'sample_uncertainty',two_chairs:'open_second_chair',prediction:'question_prediction'};
  if(requirements[kind]&&!this.methods.includes(requirements[kind]))return false;
  if(!['question','hypothesis','evidence','poll','two_chairs','prediction','invite'].includes(kind))return false;
  f.playerSpoken=true;
  const event=this.emit('player_interjection',{node:f.node,issue:f.issue,topic:f.topic,kind},['public']);
  f.history.push(event.id);
  for(const a of this.at(f.node)){
   if(!a.seen.includes(event.id))a.seen.push(event.id);
   this.applyHiddenTransition(a,event,f);
  }
  return true;
 }
 applyHiddenTransition(actor,event,forum){
  const kind=event.kind==='player_interjection'?event.data.kind:event.data.act;
  const old=clone(actor.state),recent=actor.seen.length;
  const hasEvidence=this.methods.includes('audit_testimony') && kind==='evidence';
  // Deliberately different transition guards; a small nonlinear puzzle, not a uniform weight update.
  if(actor.id==='proto-leguin'){
   if(kind==='evidence' && recent>=1 && this.houseObjects.includes('H05'))actor.state.trust=clamp(actor.state.trust+1,0,4);
   if(actor.state.trust>=2 && this.time>=9 && actor.seen.some(id=>this.events.some(e=>e.id===id&&e.kind==='npc_turn'&&e.minute<event.minute)) && hasEvidence && forum.node==='tip5'&&!actor.unlocked.includes('right_to_withhold')){
    actor.unlocked.push('right_to_withhold');this.emit('hidden_subnetwork_opened',{actor:actor.id,subnetwork:'right_to_withhold',cause:event.id,requirements:['H05','tip5','evidence','earned trust','one prior observed conversational turn','9 or more elapsed social minutes']},['developer']);
   }
  } else if(actor.id==='proto-lewis'){
   if(kind==='rebuttal')actor.state.conviction=clamp(actor.state.conviction+1,0,4);
   if(kind==='evidence')actor.state.attention=clamp(actor.state.attention+1,0,4);
   // Explicit resting attraction: conscientious debate does not imply conversion.
   actor.state.conviction=Math.max(2,actor.state.conviction);
  } else if(actor.id==='proto-dante'){
   if(kind==='evidence')actor.state.readiness=clamp(actor.state.readiness+1,0,4);
   if(this.time>=8 && actor.state.readiness>=2 && !actor.unlocked.includes('witness_road')){actor.unlocked.push('witness_road');this.emit('hidden_subnetwork_opened',{actor:actor.id,subnetwork:'witness_road',cause:event.id},['developer'])}
  } else if(actor.id==='proto-rumi'){
   if(kind==='analogy')actor.state.attention=clamp(actor.state.attention+1,0,4);
   if(actor.turns>=2 && actor.state.attention>=2&&!actor.unlocked.includes('two_notes')){actor.unlocked.push('two_notes');this.emit('hidden_subnetwork_opened',{actor:actor.id,subnetwork:'two_notes',cause:event.id},['developer'])}
  } else if(actor.id==='proto-chaucer'){
   if(kind==='question')actor.state.trust=clamp(actor.state.trust+1,0,4);
  } else if(actor.id==='proto-tolkien'){
   if(kind==='analogy'&&this.houseObjects.includes('H08'))actor.state.attention=clamp(actor.state.attention+1,0,4);
  }
  if(JSON.stringify(old)!==JSON.stringify(actor.state))this.emit('internal_transition',{actor:actor.id,cause:event.id,before:old,after:clone(actor.state)},['developer']);
 }
 voice(actor,act,topic){
  const stem={hypothesis:'I wonder whether',rebuttal:'A difficulty remains:',concession:'That is worth granting, but',analogy:'Suppose a story instead:',question:'What would change if',quiet:'I would rather listen before concluding:',invitation:'Perhaps we should examine this elsewhere:'}[act];
  return `${actor.name.split(' · ')[0]}: ${stem} ${questions[topic].claim}`;
 }
 canRoute(from,to){
  if(from===to)return {path:[from],cost:0};try{const r=this.route(from,to);if(!r||!Array.isArray(r.path)||r.path[0]!==from||r.path[r.path.length-1]!==to||r.path.length<2)return null;const cost=Number(r.cost??r.minutes??r.time);if(!Number.isFinite(cost)||cost<=0)return null;return {path:r.path,cost};}catch{return null}
 }
 proposeTravel(actor,dest,reason){if(actor.travel||actor.at===dest)return false;const route=this.canRoute(actor.at,dest);if(!route)return false;
  actor.travel={from:actor.at,to:dest,path:route.path,arrival:this.time+route.cost,reason};const e=this.emit('journey_departure',{actor:actor.id,from:actor.at,to:dest,path:route.path,arrival:actor.travel.arrival,reason});actor.seen.push(e.id);return true;
 }
 nextBeat(){
  this.time+=3;
  for(const a of this.actors){if(a.travel&&a.travel.arrival<=this.time){a.at=a.travel.to;this.emit('journey_arrival',{actor:a.id,node:a.at,path:a.travel.path});a.travel=null}}
  for(const [node,f] of Object.entries(this.forums)){
   if(f.state!=='active')continue;const eligible=this.at(node);
   if(eligible.length===0)continue;
   const a=eligible.sort((x,y)=>x.turns-y.turns||x.name.localeCompare(y.name))[f.turns%eligible.length];
   const n=f.turns;const act=ACTS[(n+Math.floor(this.r()*ACTS.length))%ACTS.length];
   const event=this.emit('npc_turn',{node,issue:f.issue,topic:f.topic,speaker:a.id,act,line:this.voice(a,act,f.topic),audience:eligible.filter(x=>x.id!==a.id).map(x=>x.id)});
   a.turns++;f.turns++;f.owner=a.id;f.history.push(event.id);
   for(const observer of eligible){if(!observer.seen.includes(event.id))observer.seen.push(event.id);this.applyHiddenTransition(observer,event,f)}
   // Repeated talk can change relationships without forcing doctrinal convergence.
   if(eligible.length>1){const other=eligible.find(x=>x.id!==a.id);a.relationship[other.id]=(a.relationship[other.id]||0)+(act==='concession'?1:act==='rebuttal'?-1:0);}
  }
  // Endogenous travel, not the player's summons. Selective response to witnessed discovery.
  const leguin=this.actors.find(a=>a.id==='proto-leguin');
  if(leguin?.unlocked.includes('right_to_withhold')&&!leguin.travel&&leguin.at==='tip5'&&this.time>=9)this.proposeTravel(leguin,'tip4','independent inquiry after evidence');
  const dante=this.actors.find(a=>a.id==='proto-dante');
  if(dante?.unlocked.includes('witness_road')&&!dante.travel&&dante.at==='tip5'&&this.time>=12){
   if(dante.state.obligation<2)this.proposeTravel(dante,'tip4','comparison of witnesses');
   else this.emit('invitation_declined',{actor:dante.id,reason:'prior obligation'});
  }
  // Free topic proposal when an isolated observer arrives at an unoccupied node.
  for(const node of NODES){if(!this.forums[node]&&this.at(node).length>=2&&this.r()<.08)this.topic(node,'myth','npc_inspiration')}
  return this.status();
 }
 status(){return {minute:this.time,playerNode:this.playerNode,forums:clone(this.forums),npcs:this.actors.map(a=>({id:a.id,name:a.name,node:a.at,travel:a.travel,turns:a.turns})),methods:this.methods.slice(),houseObjects:this.houseObjects.slice(),events:this.events.slice(-18)};}
 debug(){return this.actors.map(a=>({id:a.id,state:clone(a.state),unlocked:a.unlocked.slice(),restingView:a.restingView,seen:a.seen.length,relationship:clone(a.relationship)}));}
 exportState(){return JSON.stringify({version:1,seed:this.seed,time:this.time,serial:this.serial,playerNode:this.playerNode,actors:this.actors,forums:this.forums,events:this.events,houseObjects:this.houseObjects,methods:this.methods,clockReceipts:this.clockReceipts});}
 importState(text){try{const s=typeof text==='string'?JSON.parse(text):text;if(s.version!==1||!Array.isArray(s.actors)||s.actors.length!==6||!Array.isArray(s.events)||s.events.length>350||!s.forums||!Number.isInteger(s.time)||s.time<0)return false; if(s.actors.some((a,i)=>a.id!==PROTOTYPE_NPCS[i].id||!NODES.includes(a.at)||!Array.isArray(a.unlocked)||!Array.isArray(a.seen)))return false;
  this.seed=s.seed>>>0;this.time=s.time;this.serial=s.serial;this.playerNode=s.playerNode;this.actors=clone(s.actors);this.forums=clone(s.forums);this.events=clone(s.events);this.houseObjects=clone(s.houseObjects||[]);this.methods=clone(s.methods||[]);this.clockReceipts=clone(s.clockReceipts||[]);return true;
 }catch{return false}}
}
