import {test,expect} from '@playwright/test';
const jobs='http://gad-hrms.frevo.co.in/open-positions';
test('careers links and legacy routes lead to Frevone without a local application form',async({page})=>{
 await page.addInitScript(()=>sessionStorage.setItem('ga-intro-seen','1'));
 await page.route(jobs,route=>route.fulfill({contentType:'text/html',body:'<h1>Frevone destination test</h1>'}));
 await page.goto('/');await expect(page.locator('#main-nav').getByRole('link',{name:'Careers',exact:true})).toHaveAttribute('href',jobs);
 for(const path of ['/careers','/careers/jobs','/careers/apply?job=example','/careers/jobs/mts-navi-mumbai']){await page.goto(path);await expect(page).toHaveURL(jobs);}
});
