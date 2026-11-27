/* R007 isolated fictional narrative laboratory. No external dependencies. */
(function(root){'use strict';
const grammars={
 sable:{name:'Mr. Sable',tags:['claim','certainty','jurisdiction','contradiction'],join:'Set beside this claim',axis:'certainty',sign:-1,color:'#777D96'},
 ember:{name:'Canon Ember',tags:['disclosure','silence','testimony','claim'],join:'The disclosure has a further implication',axis:'expression',sign:1,color:'#C46E49'},
 vesper:{name:'Sister Vesper',tags:['witness','restraint','intervention','testimony'],join:'Seen from another position',axis:'attention',sign:1,color:'#8D81B1'},
 rook:{name:'Captain Rook',tags:['refusal','departure','obligation','choice'],join:'Distinguish the choice from its obligation',axis:'independence',sign:1,color:'#628F9B'},
 rowan:{name:'Brother Rowan',tags:['hospitality','belonging','exclusion','obligation'],join:'The place offered to one bears upon another',axis:'belonging',sign:1,color:'#CEA64E'},
 nacre:{name:'Widow Nacre',tags:['memory','identity','loss','reinterpretation'],join:'The present recalls the past differently',axis:'memory',sign:1,color:'#9DA9A1'},
 cairn:{name:'Sister Cairn',tags:['burden','sacrifice','relief','choice'],join:'The burdens must be considered together',axis:'endurance',sign:1,color:'#779160'}
};
const clone=x=>JSON.parse(JSON.stringify(x));
function spectralRadius(a,b,c){if(![a,b,c].every(Number.isFinite))throw Error('finite gain required');return Math.cbrt(Math.abs(a*b*c));}
function createRegister(){const events=[],byId=new Map();return {
 append(e){if(!e||typeof e.id!=='string'||!e.id||byId.has(e.id)||!Array.isArray(e.parents)||e.parents.some(p=>!byId.has(p))||!Array.isArray(e.tags)||!Array.isArray(e.participants)||typeof e.text!=='string'||!['public','authorized','private'].includes(e.visibility)||!['observation','report','interpretation'].includes(e.modality)||typeof e.actor!=='string'||!Array.isArray(e.objects))return false;const v=clone(e);byId.set(v.id,v);events.push(v);return true},
 get:id=>byId.has(id)?clone(byId.get(id)):null,
 list:()=>clone(events)
};}
function conduct(reg,originId,spirit,recipient,{limit=8,authorizedIds=[]}={}){
 const g=grammars[spirit],origin=reg.get(originId),allow=new Set(authorizedIds);if(!g||!origin||typeof recipient!=='string')return null;
 const visible=e=>e.visibility==='public'||(e.visibility==='authorized'&&allow.has(e.id));
 if(!visible(origin)||origin.modality==='interpretation')return null;
 const all=reg.list(),idx=all.findIndex(e=>e.id===originId),prior=all.slice(0,idx+1),related=e=>e.id===originId||e.participants.some(p=>origin.participants.includes(p))||e.objects.some(o=>origin.objects.includes(o));
 const chosen=prior.filter(e=>visible(e)&&e.modality!=='interpretation'&&related(e)&&e.tags.some(t=>g.tags.includes(t))).slice(-Math.max(1,Math.min(32,Math.floor(limit)||8)));
 if(!chosen.length)return null;
 const nodes=[],leaf=e=>({id:'leaf:'+e.id,kind:'leaf',sources:[e.id],text:`${e.modality==='report'?'Reported':'Observed'}: ${e.text}`,tags:e.tags.filter(t=>g.tags.includes(t)),weight:1});
 let level=chosen.map(leaf);nodes.push(...level);let k=0;
 while(level.length>1){const next=[];for(let i=0;i<level.length;i+=2){const a=level[i],b=level[i+1];if(!b){next.push(a);continue}const tags=[...new Set([...a.tags,...b.tags])];const relation=tags.length>1?g.join:'The same concern recurs';const n={id:'join:'+ ++k,kind:'articulation',parents:[a.id,b.id],sources:[...new Set([...a.sources,...b.sources])],tags,text:`${relation}: (${a.text}); (${b.text}).`,weight:a.weight+b.weight};nodes.push(n);next.push(n)}level=next;}
 const top=level[0],sources=top.sources;return {kind:'spirit.articulation',spirit,origin:originId,recipient,sources,nodes:clone(nodes),root:top.id,statement:top.text,impactProposal:{axis:g.axis,delta:Math.max(-.2,Math.min(.2,g.sign*.035*sources.length))},interpretation:true};
}
// The target state belongs to a fictional recipient; this function only perturbs an axis, never actions.
function impact(state,manifestation,applied=new Set()){if(!manifestation)return {state:clone(state),applied:false};const key=JSON.stringify([manifestation.spirit,manifestation.origin,manifestation.recipient,manifestation.sources]);if(applied.has(key)||state.id!==manifestation.recipient)return {state:clone(state),applied:false};const next=clone(state),{axis,delta}=manifestation.impactProposal;next.salience=next.salience||{};next.salience[axis]=Math.max(-1,Math.min(1,(Number(next.salience[axis])||0)+delta));applied.add(key);return {state:next,applied:true,key};}
function communal(reg,a,b){if(a===b)return [];return reg.list().filter(e=>e.visibility==='public'&&e.modality==='observation'&&e.participants.includes(a)&&e.participants.includes(b)).map(e=>({id:e.id,text:e.text,participants:[...e.participants],objects:[...e.objects]}));}
const fixture=[
 {id:'h1',actor:'13',participants:['13','14'],objects:['rag','bed'],tags:['choice','burden','hospitality','memory'],text:'Elijah chose the rag while Samuel occupied the bunk.'},
 {id:'h2',actor:'14',participants:['13','14'],objects:['rag'],tags:['testimony','witness','claim','certainty','memory'],text:'Samuel stated that the arrangement was agreed.' ,modality:'report'},
 {id:'h3',actor:'finch',participants:['13','14'],objects:['rag','blanket'],tags:['intervention','relief','obligation','hospitality'],text:'Finch offered an additional blanket.'},
 {id:'h4',actor:'11',participants:['11','13','14'],objects:['rag','bed'],tags:['choice','witness','silence','identity','belonging','sacrifice','refusal','jurisdiction','contradiction'],text:'The philosopher sat on the floor beside the bed.'},
 {id:'h5',actor:'14',participants:['11','13','14'],objects:['rag','bed'],tags:['disclosure','testimony','memory','reinterpretation','burden','relief','departure','exclusion','restraint','certainty'],text:'Samuel distinguished the empty bed from an invitation to occupy it.',modality:'report'},
 {id:'private',actor:'13',participants:['13','14'],objects:['rag'],tags:['memory','burden','claim'],text:'PRIVATE FIXTURE: not eligible.',visibility:'private'}
].map((e,i)=>({parents:i?[`h${Math.min(i,5)}`]:[],visibility:'public',modality:'observation',...e}));
root.SpiritualReference={grammars,createRegister,conduct,impact,communal,spectralRadius,fixture};
})(typeof globalThis!=='undefined'?globalThis:this);
