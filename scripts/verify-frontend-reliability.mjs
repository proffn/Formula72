// Run with: node scripts/verify-frontend-reliability.mjs
// Uses a disposable local HTTP server and in-memory fixtures; never writes CMS data.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import http from 'node:http';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
const nodeRequire = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const snapshot = JSON.parse(fs.readFileSync(path.join(root, 'lib/mock/home.snapshot.json'), 'utf8'));
const routeKeys = {
  '/api/site-header': 'siteHeader', '/api/home-page': 'homePage', '/api/banners': 'banners',
  '/api/wholesale-contract-section': 'wholesaleContract', '/api/pros-cons-section': 'prosCons',
  '/api/formula72-scheme-section': 'formula72Scheme', '/api/mission-k72-section': 'missionK72',
  '/api/work-stages-section': 'workStages', '/api/who-suits-section': 'whoSuits',
  '/api/why-trust-us-section': 'whyTrustUs', '/api/what-we-can-make-section': 'whatWeCanMake',
  '/api/coverage-map-section': 'coverageMap', '/api/faq-section': 'faq', '/api/lead-cta-section': 'leadCta',
  '/api/final-brand-section': 'finalBrand', '/api/footer-section': 'footer', '/api/floating-contact-section': 'floatingContact',
};

function loadModule(entry, fetchImpl = fetch) {
  const cache = new Map();
  function load(filename) {
    if (filename.endsWith('.json')) return JSON.parse(fs.readFileSync(filename, 'utf8'));
    if (cache.has(filename)) return cache.get(filename).exports;
    const testModule = {exports:{}};
    cache.set(filename, testModule);
    const source = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,esModuleInterop:true},
    }).outputText;
    const context = {module:testModule,exports:testModule.exports,require:specifier=> {
      if (!specifier.startsWith('@/')) return nodeRequire(specifier);
      const resolved=path.join(root,specifier.slice(2));
      return load(resolved.endsWith('.json')?resolved:resolved+'.ts');
    },fetch:fetchImpl,process,URL,URLSearchParams,AbortController,Headers,console:{warn(){},info(){}},setTimeout,clearTimeout};
    vm.runInNewContext(source,context,{filename});
    return testModule.exports;
  }
  return load(path.join(root,entry));
}
const plain=value=>JSON.parse(JSON.stringify(value));

async function verifyQueries() {
  for (const mode of ['success', 'unavailable', 'empty']) {
    const calls=[];
    const queries=loadModule('lib/queries.ts',async url=>{
      const route=new URL(url).pathname;calls.push(route);
      if(mode==='unavailable') throw new Error('Fixture unavailable');
      return new Response(JSON.stringify(mode==='empty'?{data:route==='/api/banners'?[]:null}:snapshot.responses[routeKeys[route]]||{data:null}));
    });
    const home=await queries.getHomePageData();assert.equal(calls.length,17);
    calls.length=0;
    const layout=await queries.getSiteLayoutData();
    assert.deepEqual(plain(layout),plain({siteHeader:home.siteHeader,navigation:home.navigation,footer:home.footer}));
    assert.deepEqual(calls.sort(),['/api/footer-section','/api/site-header']);
    calls.length=0;
    assert.deepEqual(plain(await queries.getSiteFooterData()),plain(home.footer));
    assert.deepEqual(calls,['/api/footer-section']);
    console.log(`PASS: ${mode} header/footer data parity and 17 -> 2/1 requests`);
  }
}

async function verifyTimeout() {
  const server=http.createServer((req,res)=>{
    if(req.url==='/headers-hang') return;
    if(req.url==='/body-hang') {res.writeHead(200,{'Content-Type':'application/json'});res.write('{');return;}
    if(req.url==='/bad-status') {res.writeHead(503);res.end('unavailable');return;}
    res.end('{"ok":true}');
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const previousUrl=process.env.STRAPI_URL;
  process.env.STRAPI_URL=`http://127.0.0.1:${server.address().port}`;
  const {strapiFetch}=loadModule('lib/api.ts');
  try {
    assert.deepEqual(plain(await strapiFetch('/ok',{timeoutMs:1000})),{ok:true});
    for(const endpoint of ['/headers-hang','/body-hang']) {
      const start=performance.now();
      await assert.rejects(strapiFetch(endpoint,{timeoutMs:120}));
      assert.ok(performance.now()-start<1500, 'Request/body must finish within the deadline');
      console.log(`PASS: ${endpoint} aborted within deadline`);
    }
    const caller=new AbortController();
    const pending=strapiFetch('/headers-hang',{timeoutMs:2000,init:{signal:caller.signal}});
    caller.abort();await assert.rejects(pending);
    await assert.rejects(strapiFetch('/bad-status'),/503/);
    console.log('PASS: caller cancellation, successful JSON, HTTP error propagation');
  } finally {
    if(previousUrl===undefined) delete process.env.STRAPI_URL;else process.env.STRAPI_URL=previousUrl;
    server.closeAllConnections();await new Promise(resolve=>server.close(resolve));
  }
}

async function verifyResponsiveMedia() {
  for (const formats of [undefined, {}, {
    small: {url:'/uploads/small.jpg',width:500},
    large: {url:'/uploads/large.jpg',width:1000},
    oversized: {url:'/uploads/oversized.jpg',width:6000},
  }]) {
    const queries=loadModule('lib/queries.ts',async url=>{
      const response=structuredClone(snapshot.responses[routeKeys[new URL(url).pathname]]||{data:null});
      if(new URL(url).pathname==='/api/wholesale-contract-section') {
        response.data.OptMobileImage.url='/uploads/original.jpg';
        response.data.OptMobileImage.formats=formats;
      }
      return new Response(JSON.stringify(response));
    });
    const home=await queries.getHomePageData();
    assert.equal(home.wholesaleContract.left.MobileImage,formats?.large?'/uploads/large.jpg':'/uploads/original.jpg');
  }
  const queries=loadModule('lib/queries.ts');
  const video='https://res.cloudinary.com/demo/video/upload/v123/clip.mp4';
  assert.equal(queries.mapProductionVideoPage({videoFile:{url:video}}).posterImage,
    'https://res.cloudinary.com/demo/video/upload/so_0,w_1280,q_90,f_jpg/v123/clip.jpg');
  assert.equal(queries.mapProductionVideoPage({videoFile:{url:video},posterImage:{url:'/uploads/custom.jpg'}}).posterImage,'/uploads/custom.jpg');
  for(const url of ['/videos/local.mp4','https://example.com/clip.mp4','https://res.cloudinary.com/demo/video/upload/s--signed--/clip.mp4']) {
    assert.equal(queries.mapProductionVideoPage({videoFile:{url}}).posterImage,undefined);
  }
  console.log('PASS: bounded responsive rendition, missing-format fallback, original/custom/signed video poster handling');
}
(async()=>{await verifyQueries();await verifyResponsiveMedia();await verifyTimeout();})().catch(error=>{console.error(error);process.exitCode=1;});
