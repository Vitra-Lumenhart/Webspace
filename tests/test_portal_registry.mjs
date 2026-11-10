import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const manifest = JSON.parse(readFileSync(new URL('../WORLD_MANIFEST.json',import.meta.url),'utf8'));
const policy = JSON.parse(readFileSync(new URL('../contracts/portal_registry.json',import.meta.url),'utf8'));
assert.equal(policy.schema,'webspace/portal-policy/1');
assert.equal(policy.canonical_portal.id,'P-001/chuzhoy-portal');
assert.equal(policy.screen_policy.equivalent_to_portal,false);
const listed = Object.keys(policy.world_defaults).sort();
const worlds = manifest.worlds.map(w=>w.id).sort();
assert.deepEqual(listed,worlds,'every top-level world requires a declared portal default');
for(const w of manifest.worlds) {
 const mode = policy.world_defaults[w.id];
 if(w.status==='placeholder') assert.equal(mode,'reserved-nonplayable',w.id);
 else assert.equal(mode,policy.canonical_portal.id,w.id);
 assert(w.arrival_tag, 'missing published arrival tag for '+w.id);
}
const ids = new Set();
for(const exception of policy.custom_exceptions) {
 assert(!ids.has(exception.id),'duplicate custom portal '+exception.id);
 ids.add(exception.id);
 if(exception.status==='design-candidate-unverified') continue;
 for(const field of policy.required_for_active_custom) assert(exception[field],exception.id+': missing '+field);
 assert(policy.world_defaults[exception.world], 'custom portal world not found: '+exception.world);
}
console.log('PASS: every playable world declares the Chuzhoy portal default; custom candidates cannot silently become active exceptions; Screens remain separate.');
