import {clientTestimonials} from './testimonial-data.mjs';
import {testimonialSection} from './testimonial-components.mjs';
import {company,articles} from './site-data.mjs';
import {feeText,facilityGroups} from './confirmed-feedback.mjs';
export const itService={slug:'it-technical-manpower',title:'IT & Technical Manpower',short:'IT & Technical Manpower',description:'Specialist people for software, infrastructure, data and technology leadership.',icon:'layers',source:'',capabilities:facilityGroups[10][2],challenge:'Build a team for your digital and IT operations.',approach:'Share the roles, qualifications, headcount and project requirements with our team.',faq:[]};
const recruitment='/services/recruitment-head-hunting';
const feeLink=`See <a href="${recruitment}#placement-service-fee">Placement Service Fee details on the Recruitment page</a>, or contact <a href="mailto:hr@gadigital.in">hr@gadigital.in</a> for clarification.`;
const testimonials=testimonialSection(clientTestimonials,{limit:3});
const suppliedRoles=`<section class="wrap section supplied-designations"><span class="eyebrow">CLIENTS &amp; DESIGNATIONS</span><h2>Discuss a relevant workforce requirement.</h2><p>Contact our team for client references and the designations relevant to your requirement.</p><a class="text-link" href="mailto:tender@gadigital.in">Ask about client references &nearr;</a></section>`;
// Normalize copy and accessible labels, while leaving paths and original archived records intact.
export function normalizeCompanyHtml(html){
 const archive=[];html=html.replace(/<article class="md-copy">[\s\S]*?<\/article>|<div class="notice-verbatim">[\s\S]*?<\/div>|<blockquote\b[^>]*>[\s\S]*?<\/blockquote>/g,m=>{archive.push(m);return `<!--original-archive-${archive.length-1}-->`;});
 const legal=text=>text.replace(/\bGA Digital(?: Web (?:Word|World))?(?: Pvt\.? Ltd\.?)?(?:’s|'s)?/g,m=>company.name+(/(?:’s|'s)$/.test(m)?'’s':''));
 html=html.split(/(<[^>]*>)/g).map(part=>part.startsWith('<')?part.replace(/\b(alt|title|aria-label|content)="([^"]*)"/g,(_,a,v)=>`${a}="${legal(v)}"`):legal(part)).join('');
 return html.replace(/<!--original-archive-(\d+)-->/g,(_,i)=>archive[Number(i)]);
}
export function applyOctoberRequest(pages,{innerHero,articleCards,engagementCards}){
 const archivePage=pages.find(p=>p.url==='/public-notices');
 const originalArchive=archivePage.body.match(/<div class="notice-verbatim">[\s\S]*?<\/div>/)?.[0]||'';
 for(const p of pages){
  // Decorative sequence numbers only: retain dates, statistics, legal clauses and addresses.
  p.body=p.body.replace(/<span class="(?:row-number|step|industry-number|department-index)">[^<]*<\/span>/g,'').replace(/<span(?: class="eyebrow")?>0?[1-9]<\/span>/g,'').replace(/SECTOR \d\d/g,'SECTOR');
  p.body=p.body.replace(/<section class="wrap section placement-notice"[\s\S]*?<\/section>/g,'');
  if(p.url!==recruitment){
   p.body=p.body.replace(/<p>[^<]*(?:one-time service fee|refundable joining|no job.placement fee)[\s\S]*?<\/p>/gi,`<p>${feeLink}</p>`);
   // Approved FAQs previously repeated fee particulars; keep one authoritative destination.
   p.body=p.body.replace(/(<summary>[^<]*(?:fee|charge)[\s\S]*?<\/summary>)<p>[\s\S]*?<\/p>/gi,`$1<p>${feeLink}</p>`);
  }
  if(p.url==='/'){
   p.body=p.body.replace(/<section class="soft-bg"><div class="wrap section"><div class="section-heading"><div><span class="eyebrow">LATEST INSIGHTS<\/span>[\s\S]*?<\/section>/,`<section class="soft-bg latest-insights"><div class="wrap section"><span class="eyebrow">LATEST INSIGHTS</span><h2>A practical perspective on people.</h2><div class="insights-groups">${['HR Insights','Candidate Insights'].map(category=>`<section aria-label="${category}"><h3>${category}</h3>${articleCards(articles.filter(a=>a.category===category))}</section>`).join('')}</div><a class="text-link" href="/insights">Explore all insights &nearr;</a></div></section>`);
   p.body+=testimonials;
  }
  if(p.url.startsWith('/insights/')){
   const article=articles.find(a=>p.url==='/insights/'+a.slug);
   if(article&&!p.body.includes('class="insight-photo"')){const end=p.body.indexOf('</section>')+10;p.body=p.body.slice(0,end)+`<figure class="wrap insight-photo"><img src="/assets/${article.image}" alt="${article.imageAlt}" width="1536" height="1024"><figcaption>Image for illustration.</figcaption></figure>`+p.body.slice(end);}
  }
  // The client retained these two sections only on Contract Staffing.
  if(p.url==='/services/contract-staffing'){
   p.body+=suppliedRoles;
   p.body+=`<section class="wrap section related-facility"><span class="eyebrow">FACILITY SUPPORT</span><h2>People for your premises.</h2><a class="button outline" href="/services/facility-management">Explore Facility Management &nearr;</a></section>`;
  }
  if(p.url===recruitment)p.body+=`<section class="wrap section placement-notice" id="placement-service-fee" aria-label="Placement service fee"><span class="eyebrow">FOR CANDIDATES</span><h2>Placement Service Fee</h2><p>${feeText}</p><a class="text-link" href="mailto:hr@gadigital.in">Confirm details with HR &nearr;</a></section>`;
  if(p.url==='/services/outsourcing-training'||p.url==='/services/competence-building')p.body+=`<section class="wrap section training-provided"><span class="eyebrow">TRAINING PROVIDED</span><h2>Preparation for interviews and everyday work.</h2><div class="two-col"><article><h3>Interview preparation</h3><p>We prepare candidates for interviews so they arrive confident and ready for selection.</p></article><article><h3>Workplace soft skills</h3><p>Focused sessions cover communication, teamwork, professional conduct, workplace behaviour and confidence.</p></article></div><a class="text-link" href="mailto:hr@gadigital.in">Discuss training requirements &nearr;</a></section>`;
  if(p.url==='/clients'){
   p.title='Clients';
   p.description='Explore the company client portfolio.';
   p.body=p.body.replace('CLIENTS &amp; SUCCESS STORIES','CLIENTS').replace('CLIENTS & SUCCESS STORIES','CLIENTS');
   p.body=p.body.replace(/<section class="wrap section">(?:(?!<\/section>)[\s\S])*Content awaiting approval(?:(?!<\/section>)[\s\S])*<\/section>/g,'');
   p.body+=testimonials;
  }
  if(p.url==='/clients/case-studies'){p.title='Clients';p.description='Explore the company client portfolio.';p.redirectTo='/clients';p.noindex=true;p.body='<section class="wrap section prose"><h1>Clients</h1><p><a href="/clients">View our clients</a></p></section>';}
  if(p.url==='/clients/testimonials')p.body=innerHero('Client experiences','Feedback from the organisations we support.','TESTIMONIALS')+testimonialSection(clientTestimonials);
  if(p.url==='/public-notices'){p.description='Recruitment information and the Legal Notice.';p.body=innerHero('Public notices','Recruitment information and earlier notices.','RESOURCES')+`<section class="wrap section prose"><h2>Recruitment information</h2><p>Verify offers and payment instructions through official company contacts.</p><p>${feeLink}</p><a class="text-link" href="/resources/archived-notices">Read Legal Notice &nearr;</a></section>`;}
  if(p.url==='/legal')p.body+=`<section class="wrap section prose"><h2>Recruitment public notice</h2><p class="article-meta">14 June 2025</p>${originalArchive}</section>`;
  if(p.url==='/legal')p.body+='<section class="wrap section"><a class="text-link" href="/disclaimer">Website Disclaimer &nearr;</a></section>';
 }
 const it=pages.find(p=>p.url==='/services/it-technical-manpower');
 it.body=innerHero('IT &amp; Technical Manpower','Skilled professionals for digital and IT operations.','SPECIALIST STAFFING')+`<section class="wrap section two-col"><div><h2>What you need</h2><p>People for software development, IT infrastructure, data operations and technology leadership.</p></div><div><h2>Our approach</h2><p>Share the qualifications, experience, headcount, location and project requirements with our team to discuss suitable staffing.</p></div></section><section class="wrap section"><h2>Roles we can help you source.</h2><ul class="check-list">${[...itService.capabilities,'CTO and CXO roles'].map(role=>`<li>${role}</li>`).join('')}</ul></section><section class="wrap section"><h2>Relevant client context</h2><h3>C-DAC</h3><p>Contact our team about IT manpower requirements for institutions such as C-DAC, including relevant engagement and supplied-designation details.</p><a class="text-link" href="mailto:tender@gadigital.in">Discuss your IT staffing requirement &nearr;</a></section>`;
 pages.push({url:'/resources',title:'Resources',description:'Insights, client experiences, recruitment guidance and the Legal Notice.',body:innerHero('Useful resources','Guidance and information for organisations and candidates.','RESOURCES')+'<section class="wrap section"><div class="link-panels">'+[['/insights','HR &amp; Candidate Insights'],['/clients','Clients'],['/clients/testimonials','Testimonials'],['/public-notices','Public Notices'],['/resources/archived-notices','Legal Notice']].map(([url,title])=>`<a href="${url}"><h2>${title}</h2><span class="text-link">Explore &nearr;</span></a>`).join('')+'</div></section>'});
 pages.push({url:'/resources/archived-notices',title:'Legal Notice',description:'Company recruitment legal notice dated 14 June 2025.',body:innerHero('Legal Notice','Company recruitment notice dated 14 June 2025.','RESOURCES')+`<section class="wrap section prose"><h2>Recruitment notice — 14 June 2025</h2><p class="note">For recruitment guidance, visit the <a href="${recruitment}">Recruitment page</a> and contact HR.</p>${originalArchive}</section>`});
 pages.push({url:'/disclaimer',title:'Website Disclaimer',description:'Website and recruitment information, official contacts and related legal documents.',noindex:true,body:innerHero('Website Disclaimer','Information and official points of contact.','LEGAL INFORMATION')+`<section class="wrap section prose"><h2>Website information</h2><p>This website provides information about GA Digital Web Word Pvt. Ltd. and its workforce services. Contact our team to confirm the details relevant to your enquiry.</p><h2>Recruitment enquiries</h2><p>Confirm vacancy availability and application instructions through the official FrevoOne portal or HR. ${feeLink}</p><h2>Related documents</h2><ul><li><a href="/privacy-policy">Privacy Policy</a></li><li><a href="/terms-conditions">Terms &amp; Conditions</a></li><li><a href="/cookie-policy">Cookie Policy</a></li><li><a href="/recruitment-disclaimer">Recruitment information</a></li></ul><p>For clarification, email <a href="mailto:${company.email}">${company.email}</a>.</p></section>`});
 // Keep the existing closing call to action after the added page content.
 for(const page of pages){const closing=page.body.match(/<section class="final-cta">[\s\S]*?<\/section>/g)||[];if(closing.length)page.body=page.body.replace(/<section class="final-cta">[\s\S]*?<\/section>/g,'')+closing.join('');}

}
