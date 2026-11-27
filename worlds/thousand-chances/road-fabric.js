'use strict';
// Immutable centerline-based substrate; not a claim of full-width clearance.
function createRoadFabric(){
 const cells=[],roads=[],junctions=new Map(),links=[];const add=(a,b)=>{if(a!==b)links.push([a,b]);};
 for(const [a,b] of EDGES.filter(e=>roadOpen(...e))){const path=edgePath(a,b),length=pathLength(path),n=Math.ceil(length/2),kind=roadClass(a,b),start=cells.length;let road={id:a+':'+b,a,b,path,length,n,start,width:deckWidth(a,b),kind,material:({civic:'lime',residential:'timber',silk:'polished',house:'plaster',lost:'rock'})[kind]};roads.push(road);for(let i=0;i<n;i++){let p=pathPoint(path,(i+.5)/n);cells.push({id:cells.length,road:road.id,p,kind,s:(i+.5)*length/n});if(i)add(start+i-1,start+i);}for(const [key,id] of [[a,start],[b,start+n-1]]){if(!junctions.has(key))junctions.set(key,[]);junctions.get(key).push(id);}}
 for(const ids of junctions.values())for(let i=0;i<ids.length;i++)for(let j=i+1;j<ids.length;j++)add(ids[i],ids[j]);
 const adj=cells.map(()=>[]);for(const [a,b] of links){adj[a].push(b);adj[b].push(a);}const near=p=>{let best=0,d=Infinity;for(const c of cells){const v=(c.p[0]-p[0])**2+(c.p[1]-p[1])**2+(c.p[2]-p[2])**2;if(v<d){d=v;best=c.id;}}return {id:best,d:Math.sqrt(d)};};
 return {cells,roads,adj,near,links};
}
const ROAD_FABRIC=createRoadFabric();
