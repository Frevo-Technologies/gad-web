// Content supplied in GA_Digital_Website_Content.pdf, 19 October 2026.
// The PDF's conflicting 10,000/11,000 fee amounts need confirmation; retain
// the previously confirmed 11,000 until the company resolves this.
const mission='To connect organisations with skilled, reliable people and to manage that workforce with fairness, transparency and full compliance.';
const story='GA Digital Web Word Pvt. Ltd. began in 2003 with one goal: to give organisations the right people, and to treat every employee we place with respect. Today we manage manpower for government departments, public sector undertakings, research institutes and private companies across India.';
const questions=[['For organisations',[
 ['What services do you offer?','Contract staffing, recruitment, HR and payroll outsourcing, training, facility management and employment verification.'],
 ['Do you take part in government tenders?','Yes. Most of our work comes through government and institutional tenders.'],
 ['How quickly can you deploy staff?','It depends on the role and numbers. Share your requirement and we will give you a clear timeline.'],
 ['Who handles PF, ESI and other compliance?','We do. Our compliance team manages all statutory filings for staff on our payroll.'],
 ['Do you work outside Delhi NCR?','Yes. We support clients across India through 11 zonal offices.']
]],['For candidates',[
 ['How do I apply?','Visit <a href="http://gad-hrms.frevo.co.in/open-positions">Frevone</a> through our Careers link and apply online for a current opening.'],
 ['Is there a fee?','A one-time, non-refundable placement service fee of &#8377;11,000 applies only after you are selected and receive a written offer. Never pay anyone before that.'],
 ['How do I know a call or email is genuine?','If unsure, call <a href="tel:+911204218525">0120-4218525</a> or email <a href="mailto:info@gadigital.in">info@gadigital.in</a> to verify it.'],
 ['Who do I contact about my salary or payslip?','Contact <a href="mailto:accounts@gadigital.in">accounts@gadigital.in</a> with your employee ID.']
]]];
function photo(src,alt,title,copy){return `<section class="wrap section service-photo-section"><figure><img loading="lazy" decoding="async" src="/assets/${src}.webp" width="1536" height="1024" alt="${alt}"><figcaption>Illustrative image; not actual company employees.</figcaption></figure><div><span class="eyebrow">PEOPLE AT WORK</span><h2>${title}</h2><p>${copy}</p></div></section>`;}
export function applyContentDocument(pages,{innerHero}){
 for(const p of pages){
  // No certificates have yet been supplied with confirmed current validity.
  p.body=p.body.replace(/<section class="cert-section compact-certifications"[\s\S]*?<\/section>/,'<section class="wrap credential-update"><a class="text-link" href="/about/certifications">Certifications &amp; Awards &nearr;</a></section>');
  if(p.url==='/about/certifications')p.body=p.body.replace(/<div class="credential-gallery">[\s\S]*?<\/div><p class="small muted">[\s\S]*?<\/p>/,'<div class="credential-update"><h2>Current certifications</h2><p>Certificate details will be displayed after their current validity and scope have been confirmed.</p></div>');
  if(p.url==='/clients/testimonials')p.body=innerHero('Client experiences','Approved client feedback will be shared here when available.','TESTIMONIALS');
  if(p.url==='/about'){
   p.body=p.body.replace(/<section class="inner-hero">[\s\S]*?<\/section>/,innerHero('Two decades of putting people first.','Our Story','OUR STORY'));
   p.body=p.body.replace(/<section class="wrap section two-col">[\s\S]*?<\/section>/,`<section class="wrap section two-col"><div><h2>Our story began in 2003.</h2><p>${story}</p></div><div><h2>Our mission</h2><p>${mission}</p></div></section>`);
  }
  if(p.url==='/about/vision-values')p.body=p.body.replace(/<div class="pending">[\s\S]*?<\/div>/,`<h2>Our mission</h2><p>${mission}</p>`);
  if(p.url==='/faqs')p.body=innerHero('Clear answers.<br>A confident next step.','Information for organisations and candidates.','FAQS')+questions.map(([heading,items])=>`<section class="wrap section faq-layout"><div><h2>${heading}</h2></div><div>${items.map(([q,a])=>`<details><summary>${q}<span aria-hidden="true">+</span></summary><p>${a}</p></details>`).join('')}</div></section>`).join('')+'<section class="wrap section faq-contact"><h2>Still have a question?</h2><p>Our team can help with business, candidate and employee enquiries.</p><a class="button" href="/contact">Let\u2019s talk</a></section>';
  const photos={
   '/services':['manpower-team','Illustrative team representing office and facility staffing','People for the work you do.','From office support to technical roles, we help you plan the team your organisation needs.'],
   '/services/contract-staffing':['manpower-team','Illustrative workforce team from several occupations','Ready for your next requirement.','Share the roles, locations and start date. We will work with you on staffing and joining arrangements.'],
   '/services/recruitment-head-hunting':['recruitment-onboarding','Illustrative recruiter meeting two candidates','A good start, for both sides.','We help employers find suitable people and keep candidates informed through the hiring process.'],
   '/services/outsourcing-training':['workforce-training','Illustrative employees learning together with a trainer','Support today. Skills for tomorrow.','Practical help with routine work, alongside training that relates to the job.'],
   '/services/competence-building':['workforce-training','Illustrative practical skills workshop for employees','Learning that helps at work.','Tell us what your team needs to learn. We will discuss a suitable training plan.'],
   '/services/facility-management':['facility-team','Illustrative housekeeping and maintenance staff collaborating','People who keep your site running.','Facility teams support the everyday work behind a clean, well-maintained workplace.'],
   '/industries/healthcare':['healthcare-support','Illustrative hospital facility support staff in a corridor','Support behind the care.','Housekeeping, ward support and facility staff help healthcare premises run smoothly.'],
   '/industries/education':['workforce-training','Illustrative staff participating in a training session','Supporting places of learning.','Administrative, technical and facility teams help institutions manage their everyday work.']
  };
  if(photos[p.url]){const end=p.body.indexOf('</section>')+10;p.body=p.body.slice(0,end)+photo(...photos[p.url])+p.body.slice(end);}
  // The document requests the legal name at first body mention, then the short name.
  let mentioned=false;
  p.body=p.body.split(/(<[^>]*>)/g).map(part=>part.startsWith('<')?part:part.replace(/GA Digital(?: Web Word)?(?: Pvt\. Ltd\.)?/g,()=>{if(!mentioned){mentioned=true;return 'GA Digital Web Word Pvt. Ltd.';}return 'GA Digital';})).join('');
  if(p.url==='/about/our-team')p.title='HR Team';
 }
}
