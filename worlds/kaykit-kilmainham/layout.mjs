export const rise=4, speed=3.2, spawn={"x":0,"z":10,"y":0,"level":0};
export const stairs=[{"x":-4,"z0":-10,"z1":0,"base":0},{"x":4,"z0":0,"z1":10,"base":4}];
function flat(x,z,level){if(Math.abs(x)>9.65||Math.abs(z)>13.65)return false;return level===0||Math.abs(x)>=6.3||z<=-10+1e-8||z>=10-1e-8||(level===1&&Math.abs(z)<=1.2);}
function axis(p,dx,dz){if(!dx&&!dz)return p;const x=p.x+dx,z=p.z+dz;if(Math.abs(x)>9.65||Math.abs(z)>13.65)return p;
 if(p.stair!==undefined){const i=p.stair,s=stairs[i];const end=z<=s.z0+1e-8?0:z>=s.z1-1e-8?1:null;
  if(end!==null&&flat(x,z,i+end))return {x,z,y:(i+end)*rise,level:i+end};
  if(Math.abs(x-s.x)>1||z<s.z0||z>s.z1)return p;
  return {x,z,y:s.base+(z-s.z0)*rise/(s.z1-s.z0),level:i,stair:i};
 }
 for(let i=0;i<stairs.length;i++){const s=stairs[i];if(Math.abs(x-s.x)>1||!dz)continue;
  if(p.level===i&&dz>0&&p.z<=s.z0+.12&&z>=s.z0&&z<s.z1)return {x,z,y:s.base+(z-s.z0)*rise/(s.z1-s.z0),level:i,stair:i};
  if(p.level===i+1&&dz<0&&p.z>=s.z1-.12&&z<=s.z1&&z>s.z0)return {x,z,y:s.base+(z-s.z0)*rise/(s.z1-s.z0),level:i,stair:i};
 }
 return flat(x,z,p.level)?{x,z,y:p.level*rise,level:p.level}:p;
}
export function step(p,dx,dz){if(!Number.isFinite(dx)||!Number.isFinite(dz)||Math.hypot(dx,dz)>.35)return p;return axis(axis(p,dx,0),0,dz);}
