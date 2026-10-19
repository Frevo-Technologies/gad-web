// Public destination supplied by the company. Content feeds will be configured
// separately when Frevone exposes the approved blogs and success stories.
export const frevone={
  jobsUrl:'http://gad-hrms.frevo.co.in/open-positions',
  blogsFeedUrl:null,
  successStoriesFeedUrl:null
};
export function useFrevone(pages){
 const destination=frevone.jobsUrl;
 for(const page of pages){
  page.body=page.body.replace(/href="\/careers(?:\/jobs(?:\/[^"?#]*)?|\/apply)?(?:\?[^"#]*)?"/g,`href="${destination}"`);
  if(page.url==='/careers'||page.url==='/careers/jobs'||page.url.startsWith('/careers/jobs/')||page.url==='/careers/apply'){
   page.title='Jobs & Applications';
   page.description='Browse jobs and apply on Frevone, the recruitment product used by GA Digital Web Word.';
   page.noindex=true;page.redirectTo=destination;
   page.body=`<section class="wrap section prose"><span class="eyebrow">CAREERS</span><h1>Find your next job on Frevone.</h1><p>Job openings and applications are managed on Frevone. You will be taken there shortly.</p><a class="button" href="${destination}">Browse jobs and apply &nearr;</a></section>`;
  }
 }
}
