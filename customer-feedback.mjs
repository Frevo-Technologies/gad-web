const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const drawings=[
'<path d="M35 85 100 45l65 40H35zm12 12v66m35-66v66m36-66v66m35-66v66M28 175h144"/>',
'<path d="m20 80 80-35 80 35-80 35zm30 15v50q50 35 100 0V95m30-15v65"/>',
'<rect x="45" y="40" width="110" height="135" rx="8"/><path d="M90 60h20v20h20v20h-20v20H90v-20H70V80h20zm-20 85h20m20 0h20"/>',
'<path d="m115 25-65 90h45l-10 70 65-100h-45z"/>',
'<path d="M25 170V90l50 25V75l50 30V55h45v115zM45 140h10m35 0h10m35 0h10"/>',
'<path d="m35 80 65-40 65 40H35zm15 15v60m35-60v60m30-60v60m30-60v60M30 170h140"/>',
'<path d="M75 35h50m-40 0v65l-45 65q-5 15 15 15h90q20 0 15-15l-45-65V35M65 135h70"/>',
'<path d="M100 80v100m-30 0h60M70 65q-30 30 0 60m60-60q30 30 0 60M45 40q-55 55 0 110m110-110q55 55 0 110"/><circle cx="100" cy="90" r="12"/>',
'<rect x="45" y="35" width="110" height="130" rx="20"/><path d="M55 95h90M75 45v45m50-45v45M65 165l-15 20m85-20 15 20"/><circle cx="70" cy="135" r="7"/><circle cx="130" cy="135" r="7"/>'
];
export function industryCards(items){return `<div class="sector-cards">${items.map((x,i)=>`<article class="sector-card"><div class="sector-flipper"><div class="sector-front"><svg viewBox="0 0 200 200" role="img" aria-label="${escape(x.name)} illustration">${drawings[i%drawings.length]}</svg><span class="eyebrow">SECTOR ${String(i+1).padStart(2,'0')}</span><h3>${x.name}</h3><p>${x.desc}</p></div><div class="sector-back"><h3>${x.name}</h3><p>${x.desc}</p><p class="small">Organizations in our portfolio</p><ul>${x.clients.slice(0,3).map(n=>`<li>${escape(n)}</li>`).join('')}</ul></div></div><div class="sector-actions"><button type="button" class="text-link" data-sector-toggle aria-expanded="false" aria-label="Show organizations for ${escape(x.name)}">View organizations</button><a class="text-link" href="/industries/${x.slug}">See more &nearr;</a></div></article>`).join('')}</div>`;}
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
   p.title='HR Team';p.body=p.body.replace(/<section class="soft-bg">[\s\S]*?<\/section>/,'');
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
