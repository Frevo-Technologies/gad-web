import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const routes=JSON.parse(fs.readFileSync('routes.json','utf8'));
const known=new Set(routes.map(r=>r.url));let links=0,images=0;
for(const route of routes){const file=route.url==='/'?'dist/index.html':`dist${route.url}/index.html`;const html=fs.readFileSync(file,'utf8');
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${route.url}: exactly one h1`);
  assert(html.includes('<meta name="description"'),`${route.url}: description`);
  assert(html.includes('<link rel="canonical"'),`${route.url}: canonical`);
  assert(html.includes('<main id="main">'),`${route.url}: main landmark`);
  for(const match of html.matchAll(/href="(\/[^"]*)"/g)){const target=match[1].split(/[?#]/)[0];if(target.endsWith('.css')||target.startsWith('/assets/'))assert(fs.existsSync(path.join('dist',target)),target);else assert(known.has(target),`${route.url}: broken route ${target}`);links++;}
  for(const match of html.matchAll(/<img\b[^>]*>/g)){assert(/alt="[^"]+"/.test(match[0]),`${route.url}: image needs meaningful alt`);const src=match[0].match(/src="([^"]+)"/)[1];assert(fs.existsSync(path.join('dist',src)),`${route.url}: missing ${src}`);images++;}
  for(const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g))assert.doesNotThrow(()=>JSON.parse(match[1]));
  assert(!html.includes('Lorem ipsum'),`${route.url}: filler text`);
  assert(!html.includes('"@type":"JobPosting"'),`${route.url}: unverified jobs must not use live job schema`);
}
assert(fs.readFileSync('dist/careers/jobs/mts-navi-mumbai/index.html','utf8').includes('Closed · 29 July 2026'));
assert(fs.readFileSync('dist/careers/jobs/technical-architect-bengaluru/index.html','utf8').includes('Closed · 15 May 2026'));
assert(fs.readFileSync('dist/public-notices/index.html','utf8').includes('₹10,000'));
assert(fs.readFileSync('dist/public-notices/index.html','utf8').includes('14/06/2025'));
console.log(`PASS: ${routes.length} routes; ${links} internal links; ${images} image references; metadata, schema, public notices and expired-job safeguards.`);
