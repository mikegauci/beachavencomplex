import re,pathlib,concurrent.futures,subprocess,json
urls=set()
for f in pathlib.Path('source-content').glob('*.html'):
 s=f.read_text().split('<body',1)[1]
 urls.update(u for u in re.findall(r'(?:src|data-videoposter|data-vc-parallax-image)=[\"\']([^\"\']+uploads/[^\"\']+)',s) if u.endswith(('.jpg','.png')) and 'demo.' not in u)
urls.add('https://www.beachavencomplex.com/wp-content/uploads/2017/03/bh-logo-white-medium.png')
urls.add('https://www.beachavencomplex.com/wp-content/uploads/2025/05/StarOfIndia_Food.pdf')
def fetch(u):
 p=pathlib.Path('public/menus' if u.endswith('.pdf') else 'public/images')/u.rsplit('/',1)[1]
 r=subprocess.run(['curl','-L','--fail','--max-time','50','-s',u,'-o',str(p)])
 return u, str(p),r.returncode
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as ex:
 results=list(ex.map(fetch,sorted(urls)))
pathlib.Path('source-content/assets.json').write_text(json.dumps(results,indent=2))
print('Downloaded',sum(r[2]==0 for r in results),'of',len(results),'assets')
print([r for r in results if r[2]])
