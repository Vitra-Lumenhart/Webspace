// R012 candidate spatial receipt adapter. No rendering or changes to Choir state.
// Actual geometry must supply the occlusion function; absence is not evidence.
export const EVENT_EPOCHS=Object.freeze([1120,1348,1582,1715,1879]);
const clone=x=>JSON.parse(JSON.stringify(x));
const validPos=p=>Array.isArray(p)&&p.length===3&&p.every(Number.isFinite);
const distance=(a,b)=>Math.hypot(...a.map((x,i)=>x-b[i]));
const freeze=x=>{if(x&&typeof x==='object'){Object.values(x).forEach(freeze);Object.freeze(x)}return x;};
export class OccurrenceLedger{
 #events=[];#byId=new Map();#receipts=[];#clocks=new Map(EVENT_EPOCHS.map(y=>[y,0]));#seq=0;
 now(epoch){if(!this.#clocks.has(epoch))throw Error('Unknown epoch');return this.#clocks.get(epoch);}
 advance(epoch,delta){if(!Number.isInteger(delta)||delta<0||delta>10000)throw Error('Invalid elapsed ticks');this.#clocks.set(epoch,this.now(epoch)+delta);}
 record({epoch,actor,kind,position,parents=[],audience=null,body={}}){
  if(!validPos(position)||!actor||!kind)throw Error('Invalid occurrence');
  if(!parents.every(id=>this.#byId.has(id)))throw Error('Unknown cause');
  const event=freeze({id:'O'+String(++this.#seq).padStart(6,'0'),epoch,tick:this.now(epoch),actor,kind,position:[...position],parents:[...parents],audience:audience===null?null:[...new Set(audience)],body:clone(body)});
  this.#events.push(event);this.#byId.set(event.id,event);return event;
 }
 observe(id,observer,{position,epoch,channel,occluded,range}={}){
  const e=this.#byId.get(id);if(!e||!observer||epoch!==e.epoch||this.now(epoch)!==e.tick||!validPos(position)||!['sight','hearing'].includes(channel)||!Number.isFinite(range)||range<0)return null;
  if(e.audience&&!e.audience.includes(observer))return null;
  // Explicit proof from scene visibility/acoustics adapter is mandatory.
  if(typeof occluded!=='function'||distance(position,e.position)>range||occluded(position,e.position,channel)!==false)return null;
  const existing=this.#receipts.find(r=>r.event===id&&r.observer===observer&&r.channel===channel);if(existing)return existing;
  // A receipt describes the modality, not the full body or private intent.
  const r=freeze({event:id,observer,channel,epoch,tick:e.tick,position:[...position]});this.#receipts.push(r);return r;
 }
 knows(observer,id){return this.#receipts.some(r=>r.observer===observer&&r.event===id);}
 correct(prior,author,body){const e=this.#byId.get(prior);if(!e||!this.knows(author,prior))throw Error('No receipt for correction');return this.record({epoch:e.epoch,actor:author,kind:'correction',position:e.position,parents:[prior],audience:e.audience,body});}
 // Actual transmission is a new event. It does not grant direct observation of the original.
 report(prior,author,position,body,audience=null){const e=this.#byId.get(prior);if(!e||!this.knows(author,prior))throw Error('No receipt for report');if(e.audience&&(audience===null||!audience.every(x=>e.audience.includes(x))))throw Error('Restricted source audience');return this.record({epoch:e.epoch,actor:author,kind:'report',position,parents:[prior],audience,body});}
 snapshot(){return clone({events:this.#events,receipts:this.#receipts,clocks:[...this.#clocks]});}
 // Visiting history is read-only. This is a projection, not a time travel mutation.
 memory(epoch,observer){return clone(this.#events.filter(e=>e.epoch===epoch&&this.knows(observer,e.id)).map(e=>({id:e.id,epoch:e.epoch,tick:e.tick,kind:e.kind,parents:[...e.parents]})));}
}
