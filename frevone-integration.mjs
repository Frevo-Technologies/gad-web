// Verified public portal and sign-in entry. A public vacancy-list feed has not
// been supplied; do not copy private administration data into the public site.
export const frevone={
 jobsUrl:'https://gad-hrms.frevo.co.in/open-positions',
 loginUrl:'https://gad-hrms.frevo.co.in/',
 blogsFeedUrl:null,
 successStoriesFeedUrl:null
};
export function useFrevone(pages){
 for(const page of pages){
  page.body=page.body.replaceAll('http://gad-hrms.frevo.co.in/open-positions',frevone.jobsUrl);
  if(page.url==='/careers'||page.url==='/careers/jobs'){
   page.title=page.url==='/careers'?'Careers':'Job Openings';
   page.description='Explore job openings and sign in to the official FrevoOne recruitment portal.';
   page.noindex=false;delete page.redirectTo;
   page.body=`<section class="inner-hero"><div class="wrap"><span class="eyebrow">CAREERS</span><h1>Find your next opportunity.</h1><p>Job openings and applications are managed through FrevoOne.</p></div></section><section class="wrap section"><div class="two-col"><article><h2>Explore job openings</h2><p>Open the official portal to check available roles, eligibility and application instructions.</p><a class="button" href="${frevone.jobsUrl}" target="_blank" rel="noopener noreferrer">View job openings &nearr;</a></article><article><h2>FrevoOne sign in</h2><p>Clients and authorised administrators can use their existing account to access the portal. Your account permissions determine the information and tools available.</p><div class="frevo-access"><a class="button outline" href="${frevone.loginUrl}" target="_blank" rel="noopener noreferrer">Client sign in &nearr;</a><a class="text-link" href="${frevone.loginUrl}" target="_blank" rel="noopener noreferrer">Admin sign in &nearr;</a></div></article></div></section><section class="wrap section"><h2>Need help with an application?</h2><p>Contact <a href="mailto:hr@gadigital.in">hr@gadigital.in</a> for recruitment enquiries.</p><a class="text-link" href="/careers/recruitment-fraud-alert">Recruitment information &nearr;</a></section>`;
  }else if(page.url.startsWith('/careers/jobs/')||page.url==='/careers/apply'){
   page.title='Jobs & Applications';page.description='Browse jobs and apply through the official FrevoOne portal.';page.noindex=true;page.redirectTo=frevone.jobsUrl;
   page.body=`<section class="wrap section prose"><span class="eyebrow">CAREERS</span><h1>Find your next job on FrevoOne.</h1><p>Open the official portal for current job openings and application instructions.</p><a class="button" href="${frevone.jobsUrl}">Browse jobs and apply &nearr;</a></section>`;
  }
 }
}
