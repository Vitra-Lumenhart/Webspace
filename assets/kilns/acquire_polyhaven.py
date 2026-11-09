#!/usr/bin/env python3
"""List/download exact upstream Poly Haven originals (optional, offline safe by default).
API access requires a Powered by Poly Haven acknowledgement in tools built on it.
Run: python acquire_polyhaven.py --list
     python acquire_polyhaven.py --download --ids H01,H02
Downloads only explicit GLB/GLTF file candidates if the API advertises them.
"""
import argparse, json, urllib.request, pathlib, os, urllib.parse
P=pathlib.Path(__file__).resolve().parent
parser=argparse.ArgumentParser();parser.add_argument('--list',action='store_true');parser.add_argument('--download',action='store_true');parser.add_argument('--ids',default='');a=parser.parse_args()
manifest=json.loads((P/'OBJECTS.json').read_text())['objects']
want=set(x.strip().upper() for x in a.ids.split(',') if x.strip())
for row in manifest:
 if want and row['id'] not in want:continue
 asset=row['polyhaven_url'].split('/a/')[-1]
 print(f"{row['id']}: {row['name']} — {row['polyhaven_url']}")
 if not a.download:continue
 req=urllib.request.Request(f'https://api.polyhaven.com/files/{asset}',headers={'User-Agent':'Webspace-KilnsAssetImporter/1.0'})
 try:
  with urllib.request.urlopen(req,timeout=25) as r:files=json.load(r)
  # File formats and download links are published by the upstream API; never guess.
  formats=[(k,v) for k,v in files.items() if k.lower() in ('gltf','glb') and isinstance(v,dict)]
  options=[]
  for fmt,variants in formats:
   for res,v in variants.items():
    if not isinstance(v,dict):continue
    for key,record in v.items():
     if isinstance(record,dict) and isinstance(record.get('url'),str):options.append((fmt,res,key,record['url']))
  if not options:
   print('  No direct GLB/GLTF in API response. Download manually in browser:',row['polyhaven_url']);continue
  fmt,res,key,url=sorted(options,key=lambda x:('1k' not in x[1].lower(),x[0]!='glb'))[0]
  dest=P/'imports'/row['id'];dest.mkdir(parents=True,exist_ok=True)
  name=pathlib.Path(urllib.parse.urlparse(url).path).name
  if not name or not name.lower().endswith(('.glb','.gltf')):print('  Unknown filename, inspect URL manually');continue
  with urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'Webspace-KilnsAssetImporter/1.0'}),timeout=120) as r:
   (dest/name).write_bytes(r.read())
  print('  Downloaded',dest/name)
 except Exception as e:print('  Needs manual review:',type(e).__name__,str(e)[:140])
