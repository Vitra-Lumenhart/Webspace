import {Lens} from '../worlds/elisium/concordance/lens-core.mjs';
function verify(L){
 const ok=(a,m)=>{if(!a)throw Error(m)};let checked=0;
 for(const n of [7,19]){const sets=[];for(const s of ['A','B']){const B=L.blocks(n,s);ok(B.length===n*(n-1)/6,'block count');const keys=new Set(B.map(t=>[...t].sort((a,b)=>a-b).join(',')));ok(keys.size===B.length,'distinct blocks');sets.push(keys);for(let a=0;a<n;a++)for(let b=a+1;b<n;b++){const hits=B.filter(t=>t.includes(a)&&t.includes(b));ok(hits.length===1,'pair uniqueness');ok(hits[0].includes(L.complete(n,s,a,b)),'completion');checked++}}ok([...sets[0]].every(k=>!sets[1].has(k)),'dual disjointness')}
 for(const topic of Object.keys(L.topics))for(let r=0;r<7;r++)for(const edo of [12,19])for(let tonic=0;tonic<edo;tonic++){const p=L.profile(topic,r,tonic,edo);ok(new Set(p.residues.map(x=>x.residue)).size===19,'19 unique coordinates');ok(new Set(p.points.map(x=>x.mode)).size===7,'all modes');ok(L.histogram(p.points.map(x=>x.pitch),edo).filter(Boolean).sort((a,b)=>a-b).join(',')==='1,2,3,4,5,6','deepness');checked++}
 for(let i=0;i<7;i++){const p=L.profile('myth',(7-i)%7);ok(p.points[i].mode==='Lydian','every perspective may be Lydian')}
 for(let i=0;i<18;i++){const a=L.phase(i),b=L.phase(i+18);ok(JSON.stringify(a)===JSON.stringify(b),'period 18');ok(a.product===L.phase(i+9).product,'period 9');ok(a.relative===L.phase(i+3).relative,'period 3');ok(a.aligned===(i%3===0),'align');checked++}
 ok(new Set(Array.from({length:18},(_,i)=>L.phase(i).a)).size===18,'order 2');ok(new Set(Array.from({length:18},(_,i)=>L.phase(i).b)).size===18,'order 3');
 for(let seed=0;seed<100;seed++)for(const p of [0,.1,.5,.9,1]){const g=L.network(seed,p);ok(g.triangles.length>0,'Ramsey');ok(g.components.flat().length===7,'partition');checked++}
 return checked;
}
console.log('R0020 assertions exercised:',verify(Lens));
