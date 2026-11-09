import {readFileSync,existsSync,statSync} from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';
const root=path.resolve(import.meta.dirname,'..');const load=p=>readFileSync(path.join(root,p),'utf8');const m=JSON.parse(load('WORLD_MANIFEST.json'));
assert.equal(m.worlds.length,5);assert.equal(new Set(m.worlds.map(w=>w.id)).size,5);
for(const w of m.worlds){const rel=w.entry.split('?')[0];assert(existsSync(path.join(root,rel)),rel);const data=load(rel);assert(data.includes('<html'),rel)}
assert(load('index.html').includes('worlds/chuzhoy/index.html'));
assert(load('worlds/fortress/index.html').includes('../../shared/legacy/webspace.js'));
assert(load('worlds/gringotts/index.html').includes('data-start-world="gringotts"'));
assert(load('shared/legacy/webspace.js').includes('crossWorldPages'));
assert(load('worlds/witchs-hole/witchs-hole.js').includes("'../chuzhoy/index.html'"));
const assets=JSON.parse(load('assets/kilns/OBJECTS.json')).objects;assert.equal(assets.length,24);
for(let i=1;i<=24;i++){const id='H'+String(i).padStart(2,'0');const item=assets.find(x=>x.id===id);assert(item,id);const fn=path.join(root,'assets/kilns/proxy',id+'.glb');assert(existsSync(fn));const b=readFileSync(fn);assert.equal(b.subarray(0,4).toString(),'glTF');assert(item.polyhaven_url.startsWith('https://polyhaven.com/a/'));assert.equal(item.external_artist_model_included,false)}
assert(existsSync(path.join(root,'history/version_0003.zip')));
for(const fn of ['README.md','TECH_MANUAL.html','GITHUB_PUBLISHING.md']) assert(existsSync(path.join(root,fn)));
console.log('PASS: five independent webspaces, portal route rewrites, version history, 24 real proxy GLBs and documentation.');