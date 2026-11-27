from playwright.sync_api import sync_playwright
from pathlib import Path
import json
p=Path(__file__).parent
html=(p/'index.html').read_text()
with sync_playwright() as pw:
 b=pw.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--enable-webgl','--ignore-gpu-blocklist'])
 page=b.new_page(viewport={'width':1100,'height':750});errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.set_content(html,timeout=30000);page.wait_for_function('window.__thousand?.state.frames > 1',timeout=30000);page.wait_for_function('window.__thousand.state.teeAtlasLoaded',timeout=30000);start=page.evaluate('window.__thousand.state');assert start['current']=='entry' and start['walkers']==84 and start['teeVertices']==98784
 page.keyboard.press('r');assert page.locator('#stage').count();page.close()
 # Test-only starting viewpoint; released HTML retains normal spawn. Uses exact shipped scene/UI.
 page=b.new_page(viewport={'width':1100,'height':750});page.on('pageerror',lambda e:errors.append(str(e)))
 marker='setView(current);refresh();requestAnimationFrame(anim);';assert html.count(marker)==1
 sample=html.replace(marker,"current='cross';eye=pos(current);setView(current);yaw=Math.atan2(-.3, -4.3);pitch=-.03;refresh();requestAnimationFrame(anim);")
 page.set_content(sample,timeout=30000);page.wait_for_function('window.__thousand?.state.frames > 1',timeout=30000)
 page.wait_for_function('window.__thousand.state.teeAtlasLoaded',timeout=30000);page.screenshot(path=str(p/'browser-market.png'));state=page.evaluate('window.__thousand.state')
 assert not errors and not page.locator('#err').text_content();assert state['current']=='cross';assert state['walkers']==84
 # Click the projected hero shop if visible; look toward it from the central exchange.
 button=page.get_by_role('button',name='Peach & Peril',exact=True)
 if not button.count(): raise AssertionError('hero offer not visible')
 button.click(timeout=10000);assert 'inert scenery' in page.locator('#offerText').text_content();page.screenshot(path=str(p/'browser-peach-inspection.png'))
 result={'status':'pass','renderer':start['renderer'],'normalSpawn':True,'actors':84,'tees':21,'teeVertices':98784,'centralView':'test-only cross anchor camera initialization','heroClick':True,'errors':errors,'limits':'No full route walk, audio, hosted or hardware GPU benchmark.'};(p/'evidence'/'market-browser.json').write_text(json.dumps(result,indent=2));print(result);b.close()
