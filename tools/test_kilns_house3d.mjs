/**
 * GPU/interaction acceptance test of the ACTUAL public Kilns entrypoint.
 * Runs under a GitHub Actions headless Chromium WebGL2 context.
 * Screenshots: 3D vestibule, real CC0 goblets placed in dining room,
 * physical staircase/attic, and a modified H-object.
 */
import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';

fs.mkdirSync('artifacts',{recursive:true});
const browser=await chromium.launch({
 headless:true,args:['--no-sandbox','--enable-unsafe-swiftshader','--use-angle=swiftshader']
});
const page=await browser.newPage({viewport:{width:1560,height:970},deviceScaleFactor:1});
const errors=[];
page.on('pageerror',e=>errors.push(String(e)));
page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
page.on('requestfailed',request=> {
 if(!request.url().includes('polyhaven.org'))errors.push('request '+request.url()+' '+request.failure()?.errorText);
});
try{
 await page.goto('http://127.0.0.1:8000/worlds/elisium/kilns/index.html',{waitUntil:'domcontentloaded',timeout:60000});
 await page.waitForFunction(()=>window.__KILNS_TEST__?.objectCount()===24,{timeout:40000});
 const initial=await page.evaluate(()=>({
   room:__KILNS_TEST__.room(),
   rooms:__KILNS_TEST__.physicalRoomCount(),
   objects:__KILNS_TEST__.objectCount(),
   meshes:__KILNS_TEST__.geometryCount(),
   stairs:__KILNS_TEST__.graph('Stair Landing')
 }));
 console.log('HOUSE_INITIAL:',JSON.stringify(initial));
 assert.equal(initial.room,'Vestibule');
 assert.equal(initial.rooms,10);
 assert.equal(initial.objects,24);
 assert(initial.meshes>260,'expected authored physical 3D geometry');
 assert(initial.stairs.includes('Attic'),'attic must be reachable by stairs');
 await page.screenshot({path:'artifacts/kilns-v7-vestibule.png'});

 // Real connected passage across a wall opening. From z10, W goes north
 // into Common Room at z<5 (not a room button or teleport).
 await page.keyboard.down('w');
 await page.waitForTimeout(2550);
 await page.keyboard.up('w');
 const afterWalk=await page.evaluate(()=>({room:__KILNS_TEST__.room(),p:__KILNS_TEST__.getPlayer()}));
 console.log('WALKED_THROUGH_DOOR:',JSON.stringify(afterWalk));
 assert.equal(afterWalk.room,'Common Room');
 assert(afterWalk.p.z<5,'walking must actually cross the door plane');

 // Original published historical source becomes real scene furniture, not
 // just an isolated model viewer. H07 is the curated dining-room goblets.
 await page.getByRole('button',{name:/Dining Room/}).first().click();
 await page.waitForFunction(()=>__KILNS_TEST__.sourceStatus('H07')==='original'||__KILNS_TEST__.sourceStatus('H07')==='proxy',{timeout:105000});
 const art=await page.evaluate(()=>({
  room:__KILNS_TEST__.room(),
  state:__KILNS_TEST__.sourceStatus('H07'),
  position:__KILNS_TEST__.place('H07'),
  count:__KILNS_TEST__.sourceCount()
 }));
 console.log('REAL_IN_ROOM:',JSON.stringify(art));
 assert.equal(art.room,'Dining Room');
 assert.equal(art.state,'original','expected actual current Poly Haven artist goblets physically in dining room');
 assert.equal(art.position.length,3);
 await page.screenshot({path:'artifacts/kilns-v7-artist-installed.png'});

 // The authored fantasy treatment has a persistent object ID and physical
 // interaction. Its journal must stay local, not become a browser query.
 await page.evaluate(()=>__KILNS_TEST__.testObserve('H07'));
 assert.equal(await page.locator('#count').innerText(),'1 / 24');
 assert((await page.locator('#notice').innerText()).includes('H07'));
 await page.screenshot({path:'artifacts/kilns-v7-h07-interaction.png'});

 await page.getByRole('button',{name:/Stair Landing/}).first().click();
 assert.equal(await page.evaluate(()=>__KILNS_TEST__.room()),'Stair Landing');
 await page.locator('#stair-button').click();
 await page.waitForFunction(()=>__KILNS_TEST__.room()==='Attic',{timeout:10000});
 assert.equal(await page.evaluate(()=>__KILNS_TEST__.getPlayer().level),1);
 await page.screenshot({path:'artifacts/kilns-v7-attic.png'});
 await page.locator('#stair-button').click();
 await page.waitForFunction(()=>__KILNS_TEST__.room()==='Stair Landing',{timeout:10000});
 assert.equal(await page.evaluate(()=>__KILNS_TEST__.getPlayer().level),0);

 // Test every H-object authored action, location and journal boundedness.
 const coverage=await page.evaluate(()=>{
  for(let i=1;i<=24;i++){
   const id='H'+String(i).padStart(2,'0');
   const pos=__KILNS_TEST__.place(id);
   if(!pos||pos.length!==3||pos.some(x=>!Number.isFinite(x)))throw Error('missing physical H '+id);
   __KILNS_TEST__.testObserve(id);
  }
  return {count:document.querySelector('#count').textContent,room:__KILNS_TEST__.room()};
 });
 console.log('ALL_OBJECTS:',JSON.stringify(coverage));
 assert.equal(coverage.count,'24 / 24');
 const saved=await page.evaluate(()=>sessionStorage.getItem('webspace.kilns.v7.session'));
 assert(saved?.includes('"H24"'),'session journaling should stay available');
 if(errors.length)console.log('BROWSER_DIAGNOSTICS:',JSON.stringify(errors.slice(0,12)));
 assert(!errors.some(s=>s.includes('Uncaught')||s.includes('TypeError')||s.includes('ReferenceError')),'Unexpected fatal browser error');
 console.log('PASS navigable real 3D house: 10 physical rooms, 24 H artifacts, connected door, original donor in-world, attic stairs, journal');
} finally {await browser.close()}
