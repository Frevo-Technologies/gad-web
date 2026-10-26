import {test,expect} from '@playwright/test';
const jobs='https://gad-hrms.frevo.co.in/open-positions';
test('careers presents official jobs and existing-account sign in; legacy application routes stay connected',async({page})=>{
 await page.addInitScript(()=>sessionStorage.setItem('ga-intro-seen','1'));
 await page.route(jobs,route=>route.fulfill({contentType:'text/html',body:'<h1>FrevoOne destination test</h1>'}));
 await page.goto('/');await expect(page.locator('#main-nav').getByRole('link',{name:'Careers',exact:true})).toHaveAttribute('href','/careers');
 for(const path of ['/careers','/careers/jobs']){await page.goto(path);await expect(page.getByRole('link',{name:'View job openings'})).toHaveAttribute('href',jobs);await expect(page.getByRole('link',{name:'Admin sign in'})).toHaveAttribute('href','https://gad-hrms.frevo.co.in/');await expect(page.locator('main form')).toHaveCount(0);}
 for(const path of ['/careers/apply?job=example','/careers/jobs/mts-navi-mumbai']){await page.goto(path);await expect(page).toHaveURL(jobs);}
});
