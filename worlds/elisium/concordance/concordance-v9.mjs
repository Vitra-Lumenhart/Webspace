/* Elisium v9 candidate: Acropolis Protocol is purely intranodal social logic.
   No new physical site; the original native 4.6, sky, routes and Kilns own their state. */
import {SocialSimulation,NODES,TOPICS,BUILD} from './social-core.mjs';
const $=id=>document.getElementById(id);
const LABEL={tip0:'Threshold',tip1:'Judaism',tip2:'Islam',tip3:'Tash · fictional',tip4:'Aslan · fictional',tip5:'Christianity',tip6:'Ahura Mazda'};
const STORAGE='elisium.concordance.v9.candidate.local.v1';
const safeRead=()=>{try{return sessionStorage.getItem(STORAGE)}catch{return null}};
const saved=safeRead();
let native=null,atlas=null,sim=null,selected='tip5',autoplay=false,interval=null,lastVisit=0;
function getNative(){return $('elisiumGame')?.contentWindow?.ELISIUM||null}
function fallbackRoute(from,to){if(!native)return null;try{const res=native.fastestRoute(from,to);if(!res||!Array.isArray(res.path))return null;
 const cost=res.cost??res.minutes??res.totalMinutes??res.time??Math.max(1,res.path.length-1)*8;
 return {path:res.path,cost};}catch{return null}}
function launch(){native=getNative();atlas=window.ELISIUM_ATLAS;if(!native||!atlas?.ready())return false;
 sim=new SocialSimulation({route:fallbackRoute});if(saved)sim.importState(saved);
 const actual=native.getState()?.current;if(NODES.includes(actual)){sim.syncPlayerNode(actual);selected=actual;}
 lastVisit=atlas.houseVisits();
 window.ELISIUM_CONCORDANCE=Object.freeze({ready:()=>true,status:()=>sim.status(),snapshot:()=>sim.exportState(),debug:()=>sim.debug(),nextBeat:()=>{sim.nextBeat();persist();paint()},interject:k=>{const ok=sim.interject(k);persist();paint();return ok},learning:()=>sim.methods.slice(),build:BUILD});
 renderShell();persist();return true;
}
function persist(){try{sessionStorage.setItem(STORAGE,sim.exportState())}catch{}}
function txt(tag,contents,cl){const n=document.createElement(tag);if(cl)n.className=cl;n.textContent=contents;return n}
function btn(label,fn){const x=txt('button',label);x.type='button';x.onclick=fn;return x}
function renderShell(){
 const opening=btn('◉ SOCIAL FIELD · v9',()=>{const actual=native?.getState()?.current;if(NODES.includes(actual))sim.syncPlayerNode(actual);$('socialPanel').hidden=false;paint()});opening.id='socialOpen';$('atlasButtons').append(opening);
 const panel=txt('div');panel.id='socialPanel';panel.hidden=true;panel.setAttribute('role','dialog');panel.setAttribute('aria-label','Elisium Social Field candidate');panel.setAttribute('aria-modal','true');
 const card=txt('div');card.className='social-card';const hd=txt('div');hd.className='social-header';
 const title=txt('div');title.append(txt('h2','The Invisible Machines of Conversation'),txt('div','SOCIAL FIELD · v9 candidate · no Acropolis location · six provisional literary proxies','social-muted'));
 hd.append(title,btn('Close · return to garden',()=>{panel.hidden=true}));card.append(hd);
 card.append(txt('p','One public discussion per node. Other nodes can hold simultaneous discussions about the same or different questions. Player intervention is once per issue, and characters may refuse or leave.','social-muted'));
 const lay=txt('div');lay.className='social-layout';const left=txt('div');const right=txt('div');
 left.append(txt('h3','Public discussion sites'));const nodes=txt('div');nodes.id='socialNodes';nodes.className='social-stations';left.append(nodes,txt('p','Selecting a remote node observes its public summary; you can interject only at your actual in-world position.','social-muted'));
 const nav=txt('div');nav.className='social-buttons';nav.append(btn('Advance one social beat',()=>{sim.nextBeat();persist();paint()}),btn('Autoplay on/off',()=>{autoplay=!autoplay;paint()}),btn('Export Mailroom ledger',downloadLedger));left.append(nav);
 right.append(txt('h3','Discussion in focus'));const inspect=txt('div');inspect.id='socialInspect';inspect.className='social-inspect';right.append(inspect);
 const acts=txt('div');acts.id='socialActions';acts.className='social-buttons';right.append(acts);
 const issue=txt('div');issue.className='social-buttons';const sel=document.createElement('select');sel.id='socialTopic';sel.setAttribute('aria-label','Choose new proposed topic');for(const [id,q] of Object.entries(TOPICS)){const o=document.createElement('option');o.value=id;o.textContent=q.label;sel.append(o)};
 issue.append(sel,btn('Propose this new issue',()=>{if(sim.playerNode!==selected){setStatus('Travel there in the actual world to initiate a topic.');return}sim.topic(selected,sel.value);persist();paint()}));right.append(issue);
 right.append(txt('h3','Recent public speech and activity'));const timeline=txt('div');timeline.id='socialTimeline';timeline.className='social-timeline';timeline.setAttribute('aria-live','polite');right.append(timeline);
 right.append(txt('p','The Mailroom here is a small sessionStorage event ledger, not SQLite/OPFS or networked Matrix. Prose is currently controlled sample dialogue; no external LLM or historical-person testimony is consulted.','social-muted'));
 const foot=txt('p');foot.id='socialStatus';foot.className='social-muted';right.append(foot);
 if(new URLSearchParams(location.search).has('ws_debug_concordance')){right.append(btn('Developer: show hidden states',()=>{setStatus(JSON.stringify(sim.debug(),null,2))}));}
 lay.append(left,right);card.append(lay);panel.append(card);document.body.append(panel);
 document.addEventListener('keydown',ev=>{if(ev.key==='Escape'&&!panel.hidden)panel.hidden=true});
}
function setStatus(message){$('socialStatus').textContent=message}
function paint(){if(!sim)return;
 const nativeNode=native?.getState()?.current;if(NODES.includes(nativeNode))sim.syncPlayerNode(nativeNode);
 const root=$('socialNodes');root.replaceChildren();for(const node of NODES){const f=sim.forum(node),present=sim.at(node).length;const b=btn(LABEL[node]+' · '+(f?`${present} speakers · ${TOPICS[f.topic].label}`:`${present} present · quiet`),()=>{selected=node;paint()});b.setAttribute('aria-pressed',String(node===selected));root.append(b)}
 const f=sim.forum(selected),local=sim.playerNode===selected,inspect=$('socialInspect');inspect.replaceChildren();
 inspect.append(txt('div',LABEL[selected]+(local?' · YOU ARE HERE':' · REMOTE PUBLIC SUMMARY'),'social-node'));
 inspect.append(txt('div',f?TOPICS[f.topic].label+' · issue '+f.issue+' · public discussion':'No active public discussion.'));
 const crowd=txt('div');crowd.className='social-actors';for(const a of sim.at(selected))crowd.append(txt('span',a.name.split(' · ')[0],'social-pill'));if(!sim.at(selected).length)crowd.append(txt('span','No settled participants','social-muted'));inspect.append(crowd);
 inspect.append(txt('div','Fictional social minute '+sim.time+' · player methods: '+(sim.methods.join(', ')||'none yet'),'social-muted'));
 const actions=$('socialActions');actions.replaceChildren();for(const [kind,label,method] of [['question','Ask a question',null],['hypothesis','Offer a hypothesis',null],['evidence','Challenge evidence','audit_testimony'],['poll','Challenge a sample','sample_uncertainty'],['two_chairs','Request a second chair','open_second_chair'],['prediction','Question the forecast','question_prediction']]){
  const b=btn(label,()=>{if(!sim.interject(kind)){setStatus('Interjection is not currently eligible. A new issue or appropriate Kilns method may be needed.');return}persist();paint();setStatus('You contributed once. NPCs retain the floor and decide their own responses.')});b.disabled=!f||!local||f.playerSpoken||(method&&!sim.methods.includes(method));actions.append(b)
 }
 const timeline=$('socialTimeline');timeline.replaceChildren();const rec=sim.events.filter(e=>e.visibility==='public'&&(!e.data?.node||e.data.node===selected)).slice(-12).reverse();for(const e of rec){const d=txt('div');d.className='social-line';d.append(txt('strong',e.kind.replace(/_/g,' ')+' · '+e.minute),txt('span',' '+(e.data?.line||e.data?.topic||e.data?.reason||e.data?.description||e.data?.actor||'')));timeline.append(d)}
 setStatus('Simulation running '+(autoplay?'automatically':'by manual beats')+'. Fictional people retain their private inner state; a developer diagnostic is opt-in via URL parameter.');persist();
}
function downloadLedger(){const blob=new Blob([sim.exportState()],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='elisium-social-v9-candidate-ledger.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
window.addEventListener('elisium:house-return',ev=>{if(!sim)return;const d=ev.detail||{};const ids=Array.isArray(d.ids)?d.ids:[];if(sim.observeHouse(ids,d.elapsed_minutes??0,d.receipt||'house:'+String(d.visit))){persist();paint()}});
const starter=setInterval(()=>{if(launch())clearInterval(starter)},250);let attempts=0;
const watchdog=setInterval(()=>{if(++attempts>160){clearInterval(starter);clearInterval(watchdog)}else if(sim){clearInterval(watchdog)}},250);
interval=setInterval(()=>{if(!sim)return;if(autoplay){sim.nextBeat();persist();if(!$('socialPanel').hidden)paint()}},3500);
