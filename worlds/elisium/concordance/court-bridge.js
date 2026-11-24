/* R0021 Court: same-origin retained native session, no parallel mutable world. */
(()=>{'use strict';
const frame=document.getElementById('elisiumGame'),bar=document.getElementById('atlasButtons');
const open=document.createElement('button');open.type='button';open.id='courtOpen';open.textContent='⚖ CONCORDANCE COURT';bar.append(open);
const sheet=document.createElement('div');sheet.id='courtPocket';sheet.hidden=true;sheet.setAttribute('role','dialog');sheet.setAttribute('aria-modal','true');sheet.setAttribute('aria-label','Concordance Court');
sheet.style.cssText='position:fixed;inset:0;z-index:120;background:#101b21';
const child=document.createElement('iframe');child.title='Concordance Court';child.style.cssText='width:100%;height:100%;border:0';sheet.append(child);document.body.append(sheet);
const target='concordance_court',game=()=>frame.contentWindow?.ELISIUM,clone=x=>JSON.parse(JSON.stringify(x));
function ready(g){return !!g?.concordance?.session&&g.getState().current===target&&!g.getState().transit&&!window.ELISIUM_ATLAS?.isHouseOpen()}
function requireLive(sender){const g=game();if(sheet.hidden||sender!==child.contentWindow||!ready(g))throw Error('Court is available only at the existing Court node, outside transit and the Kilns.');return g}
function snapshot(g){const c=g.concordance,s=c.session;return {mode:'live',minute:g.getState().clockMin,event:clone(s.event),witnesses:clone(s.witnesses),methods:clone(s.methods),state:clone(s.state),consequences:s.consequences(),factors:{shelter:c.factor(target,'concordance_shelter'),angles:c.factor(target,'concordance_parallax')},minutes:{shelter:g.edgeCost(target,'concordance_shelter'),angles:g.edgeCost(target,'concordance_parallax')}}}
const choices=new Set(['shelter','decree','wait']);
window.ELISIUM_COURT_PAGE=Object.freeze({
 read(sender){return snapshot(requireLive(sender))},
 act(sender,kind,value){const g=requireLive(sender),c=g.concordance,s=c.session;
  if(kind==='listen'&&typeof value==='string'&&Object.hasOwn(s.witnesses,value))s.listen(value);
  else if(kind==='choose'&&s.methods.some(m=>m.id===value))s.choose(value);
  else if(kind==='respond'&&choices.has(value)&&s.canRespond())c.respond(value);
  else if(kind==='note'&&typeof value==='string'&&value.trim()&&value.length<=160)s.annotate(value);
  else throw Error('Invalid or ineligible Court act.');
  return snapshot(g)
 },
 close(sender){requireLive(sender);sheet.hidden=true;child.removeAttribute('src');open.focus()}
});
function enter(){sheet.hidden=false;child.src='concordance/court.html?embedded=1';child.focus()}
open.onclick=()=>{const g=game();if(!g||!g.nodes[target]){open.textContent='COURT · WAIT FOR WORLD';return}if(window.ELISIUM_ATLAS?.isHouseOpen()||g.getState().transit)return;if(ready(g)){enter();return}
 const state=g.getState(),r=g.fastestRoute(state.current,target),next=r?.path?.[1];
 if(next&&g.nodes[state.current]?.links.includes(next)&&g.go(next)){open.textContent='COURT · WALKING';}else open.textContent='COURT · CLOSE OTHER DIALOGS';
};
setInterval(()=>{const g=game();if(!g)return;const s=g.getState();open.disabled=!!s.transit||!!window.ELISIUM_ATLAS?.isHouseOpen();open.textContent=ready(g)?'⚖ ENTER CONCORDANCE COURT':s.transit?'COURT · WALKING':'⚖ WALK TOWARD COURT';if(!sheet.hidden&&!ready(g)){sheet.hidden=true;child.removeAttribute('src')}},500);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!sheet.hidden){sheet.hidden=true;child.removeAttribute('src');open.focus()}});
})();