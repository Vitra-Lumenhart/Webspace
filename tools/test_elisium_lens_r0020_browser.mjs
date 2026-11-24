import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {resolve,extname,relative} from 'node:path';
import {readFile,mkdir} from 'node:fs/promises';
import {createServer} from 'node:http';
const root=resolve('.'), folder=resolve('qa/lens-r0020');
await mkdir(folder,{recursive:true});
const server=createServer(async(req,res)=>{try{const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const f=resolve(root,'.'+pathname);if(relative(root,f).startsWith('..'))throw Error('path');const mime={'.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.json':'application/json','.glb':'model/gltf-binary','.wasm':'application/wasm'};res.setHeader('Content-Type',mime[extname(f)]||'application/octet-stream');res.end(await readFile(f));}catch{res.writeHead(404);res.end('Not found')}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));const host='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({headless:true,args:['--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage({viewport:{width:1280,height:900}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(pathToFileURL(resolve('worlds/elisium/concordance/lens-preview.html')).href);
 await page.locator('#topic').selectOption('myth');
 assert.match(await page.locator('#pitches').innerText(),/Tash[^\n]*\tLydian/);
 await page.locator('#anchor').selectOption('0');assert.match(await page.locator('#pitches').innerText(),/Threshold[^\n]*\tLydian/);
 const first=await page.locator('#triad').innerText();await page.locator('#system').selectOption('B');assert.notEqual(await page.locator('#triad').innerText(),first);
 await page.locator('#edo').selectOption('12');assert.match(await page.locator('#deep').innerText(),/1, 2, 3, 4, 5, 6/);
 await page.locator('#edo').selectOption('19');assert.match(await page.locator('#deep').innerText(),/1, 2, 3, 4, 5, 6/);
 await page.locator('#step').fill('3');assert.match(await page.locator('#phase').innerText(),/aligned/);
 await page.locator('#first').selectOption('tip0');await page.locator('#second').selectOption('tip0');assert.match(await page.locator('#completion').innerText(),/distinct/);
 await page.locator('#second').selectOption('tip1');assert.match(await page.locator('#completion').innerText(),/hypothesis/);
 await page.locator('#hear').click();await page.waitForFunction(()=>/Playing|unavailable/.test(document.getElementById('audioStatus').textContent));const audio=await page.locator('#audioStatus').innerText();await page.locator('#stop').click();assert.equal(await page.locator('#audioStatus').innerText(),'Stopped.');
 await page.screenshot({path:folder+'/standalone.png',fullPage:true});assert.deepEqual(errors,[]);
 const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});await mobile.goto(pathToFileURL(resolve('worlds/elisium/concordance/lens-preview.html')).href);await mobile.locator('#topic').selectOption('refusal');assert.match(await mobile.locator('#deep').innerText(),/1, 2, 3, 4, 5, 6/);await mobile.screenshot({path:folder+'/mobile.png',fullPage:true});await mobile.close();
 // Actual wrapper and unchanged native game served from repository. No mock state injection.
 const world=await browser.newPage({viewport:{width:1280,height:900}});await world.goto(host+'/worlds/elisium/index.html',{waitUntil:'domcontentloaded'});await world.locator('#lensStudyOpen').waitFor({timeout:30000});await world.waitForFunction(()=>!!document.getElementById('elisiumGame')?.contentWindow?.ELISIUM?.getState,{timeout:45000});
 const original=await world.evaluate(()=>{const f=document.getElementById('elisiumGame');window.__r0020Native=f.contentWindow.ELISIUM;return f.getAttribute('src')});
 await world.locator('#lensStudyOpen').click();const lab=world.frameLocator('#lensStudy iframe');await lab.locator('#topic').waitFor();await lab.locator('#topic').selectOption('mercy');assert.match(await lab.locator('#deep').innerText(),/1, 2, 3, 4, 5, 6/);await world.screenshot({path:folder+'/wrapper.png'});
 await world.locator('#lensStudy button').first().click();assert.equal(await world.locator('#lensStudy').isVisible(),false);assert.equal(await world.locator('#elisiumGame').getAttribute('src'),original);assert.equal(await world.evaluate(()=>window.__r0020Native===document.getElementById('elisiumGame').contentWindow.ELISIUM),true);
 console.log('R0020 browser checks passed; Web Audio API: '+audio+'; audible hardware output not tested.');
} finally{await browser.close();await new Promise(r=>server.close(r))}
