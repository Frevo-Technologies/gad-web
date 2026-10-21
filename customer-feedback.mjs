import {industryImages} from './industry-images.mjs';
const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
export function industryCards(items){return `<div class="sector-cards">${items.map((x,i)=>`<article class="sector-card"><div class="sector-flipper"><div class="sector-front"><img class="sector-photo" src="/assets/industries/${industryImages[x.slug].file}" alt="${escape(industryImages[x.slug].alt)}" loading="lazy" decoding="async" width="960" height="640"><span class="eyebrow">SECTOR ${String(i+1).padStart(2,'0')}</span><h3>${x.name}</h3><p>${x.desc}</p></div><div class="sector-back"><h3>${x.name}</h3><p>${x.desc}</p><p class="small">Organizations in our portfolio</p><ul>${x.clients.slice(0,3).map(n=>`<li>${escape(n)}</li>`).join('')}</ul></div></div><div class="sector-actions"><button type="button" class="text-link" data-sector-toggle aria-expanded="false" aria-label="Show organizations for ${escape(x.name)}">View organizations</button><a class="text-link" href="/industries/${x.slug}">See more &nearr;</a></div></article>`).join('')}</div>`;}
export function applyFeedback(pages,{process,cta,certs,innerHero}){
 for(const p of pages){
  if(p.url!=='/')p.body=p.body.replaceAll(process(),'');
  if(/^\/(insights|clients|faqs|public-notices)(\/|$)/.test(p.url)||p.url==='/contact/office-locations'){
   p.body=p.body.replaceAll(cta(),'').replace(/<a class="[^"]*" href="\/contact">[^<]*(?:<span[^>]*>.*?<\/span>)?<\/a>/g,'').replace('<p>Have a more specific requirement?</p>','');
  }
  if(p.url==='/about'){
   p.body=p.body.replace(/<section class="wrap section leader-section">[\s\S]*?<\/section>/,'').replace(/<a href="\/about\/presence">[\s\S]*?<\/a>/,'').replace(/<section class="cert-section">[\s\S]*?<\/section>/,'');
  }
  if(p.url==='/services/employment-verification')p.body=innerHero('Employment Verification','Contact our team about an employment verification request.','EMPLOYMENT VERIFICATION')+'<section class="wrap section two-col"><div><h2>Speak to the verification team.</h2><p>For verification enquiries, contact GA Digital Web Word to confirm the process and information required.</p><a class="button" href="mailto:info@gadigital.in?subject=Employment%20verification%20enquiry">Email an enquiry</a></div><div class="pending"><span class="eyebrow">ONLINE REQUESTS</span><h2>Request form coming soon.</h2><p>The online form and follow-up process are being finalized. This page does not collect documents or submit verification requests.</p></div></section>';
  if(p.url==='/services')p.body=p.body.replace(/<section class="soft-bg"><div class="wrap section two-col">[\s\S]*?<\/section>/,'');
  if(p.url==='/services/outsourcing-training')p.body=p.body.replace(/<section class="wrap section compact-top">[\s\S]*?<\/section>/,'');
  if(p.url==='/services/recruitment-head-hunting')p.body=p.body.replace(/<section class="wrap section compact-top">[\s\S]*?<\/section>/,'<section class="wrap section"><span class="eyebrow">LOOKING FOR A JOB?</span><h2>Find your next opportunity.</h2><p>Browse published roles and review the requirements for your next career move.</p><a class="button" href="/careers">Explore opportunities</a></section>');
  if(p.url==='/about/our-team'){
   p.title='Our Team';p.body=p.body.replace(/<section class="soft-bg">[\s\S]*?<\/section>/,'');
  }
  if(p.url==='/about/certifications'){
   p.title='Certifications & Awards';p.body=innerHero('Certifications & Awards','Our certifications and awards, in one place.','CERTIFICATIONS & AWARDS')+`<section class="wrap section"><div class="credential-gallery">${certs.map(([im,name])=>`<article><img src="/assets/${im}" alt="${name} credential badge"><h2>${name}</h2></article>`).join('')}</div><p class="small muted">Displayed credential badges; current certificates, scope and validity details await confirmation.</p></section><section class="wrap section compact-top"><span class="eyebrow">AWARDS</span><h2>Recognition, documented.</h2><p>Award details and supporting images will be added once supplied and approved.</p></section>`;
  }
  if(p.url==='/careers')p.body=p.body.replace(/<a class="button" href="\/careers\/jobs">[\s\S]*?<\/a>/,'').replace(/<section class="soft-bg">[\s\S]*?<\/section>/,'');
  if(p.url.startsWith('/careers/jobs/'))p.body=p.body.replace("Application guidance<span", "Apply now<span");
  if(p.url==='/clients')p.body=p.body.replace(/<section class="soft-bg"><div class="wrap section">[\s\S]*?<\/section>/,'').replace('Detailed case studies','Client success stories').replace('Client-approved challenges, delivery scale, governance and measured outcomes have not been supplied. Detailed case studies will be published after review.','Approved success stories, achievements and the relevant department names will be added here once supplied.');
  if(p.url==='/insights')p.body+='<section class="wrap section compact-top"><span class="eyebrow">IN THE NEWS</span><h2>GA Digital Web Word in the media.</h2><p>Approved newspaper coverage and media references will appear here.</p></section>';
  if(p.url==='/'){
   p.body=p.body.replace('<div class="client-grid client-logo-showcase">','<div class="client-ribbon" data-client-ribbon><button type="button" class="text-link" data-ribbon-pause aria-pressed="false">Pause logos</button><div class="client-ribbon-window" tabindex="0" role="region" aria-label="Client logos"><div class="client-grid client-logo-showcase">').replace('<p class="small muted">Client names','</div></div><p class="small muted">Client names');
  }
 }
}
