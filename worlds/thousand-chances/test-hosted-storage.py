from playwright.sync_api import sync_playwright
from pathlib import Path
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from threading import Thread
from functools import partial
import json
p=Path(__file__).parent
server=ThreadingHTTPServer(('127.0.0.1',0),partial(SimpleHTTPRequestHandler,directory=str(p)))
Thread(target=server.serve_forever,daemon=True).start()
url=f'http://127.0.0.1:{server.server_port}/index.html'
with sync_playwright() as pw:
 b=pw.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-dev-shm-usage','--disable-webgl']);page=b.new_page(viewport={'width':800,'height':540});errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto(url,timeout=60000);page.wait_for_function("window.__thousand?.state.field.storage==='IndexedDB' && window.__thousand.state.field.tick>=2",timeout=30000)
 page.locator('#fieldToggle').click();page.locator('#fieldPersonal').check();page.wait_for_function("new Promise((resolve,reject)=>{let r=indexedDB.open('TC-field-local-v1',1);r.onsuccess=()=>{let db=r.result,q=db.transaction('save').objectStore('save').get('city');q.onsuccess=()=>{resolve(q.result?.personal===true);db.close()};q.onerror=reject};r.onerror=reject})",timeout=20000)
 before=page.evaluate('window.__thousand.state');page.reload(timeout=60000);page.wait_for_function("window.__thousand?.state.field.storage==='IndexedDB' && window.__thousand.state.field.tick>=2",timeout=30000);page.locator('#fieldToggle').click();assert page.locator('#fieldPersonal').is_checked();after=page.evaluate('window.__thousand.state');assert not errors,errors
 out={'status':'pass','origin':'localhost HTTP (not deployed Pages)','renderer':after['renderer'],'savedTickBeforeReload':before['field']['tick'],'restoredTick':after['field']['tick'],'personalSettingRetained':True,'errors':errors};(p/'evidence'/'hosted-storage.json').write_text(json.dumps(out,indent=2));print(out,flush=True);b.close()
server.shutdown()
