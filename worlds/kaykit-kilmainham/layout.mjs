export const rise=4, speed=3.2, spawn={x:0,z:10,y:0,level:0};
export const stairs=[{x:-4,z0:-10,z1:0,base:0},{x:4,z0:0,z1:10,base:4}];
export function floorAt(x,z,previous){
 if(Math.abs(x)>9.65||Math.abs(z)>13.65)return null;
 const c=[{y:0,level:0}];
 for(let k=1;k<=2;k++){if(Math.abs(x)>=6.3||z<=-10||z>=10||(k===1&&Math.abs(z)<1.2))c.push({y:k*rise,level:k});}
 for(const [i,s] of stairs.entries())if(Math.abs(x-s.x)<=1&&z>=s.z0&&z<=s.z1)c.push({y:s.base+(z-s.z0)*.4,level:i+1,stair:i});
 // Prefer the stair on entering its footprint at the base. Prevent stepping off elevated platforms.
 const eligible=c.filter(f=>Math.abs(f.y-previous)<=.32);
 const ramp=eligible.find(f=>f.stair!==undefined&&f.y>=previous-.01);
 return ramp??eligible.sort((a,b)=>Math.abs(a.y-previous)-Math.abs(b.y-previous))[0]??null;
}
export function step(p,dx,dz){let q={...p};for(const [a,b] of [[dx,0],[0,dz]]){if(!a&&!b)continue;const x=q.x+a,z=q.z+b,f=floorAt(x,z,q.y);if(f)q={x,z,y:f.y,level:f.level};}return q;}
