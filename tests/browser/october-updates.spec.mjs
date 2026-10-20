import {test,expect} from '@playwright/test';

test.beforeEach(async({page})=>{await page.addInitScript(()=>sessionStorage.setItem('ga-intro-seen','1'));});
test('approved service and FAQ copy, office selection, and legal navigation',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 for(const [route,headline] of [['contract-staffing','From work order to payroll, one partner.'],['recruitment-head-hunting','From your CV to your first day.'],['outsourcing-training','We handle the admin. We prepare the people.'],['competence-building','Practical skills, built for the workplace.']]){
  await page.goto('/services/'+route);await expect(page.getByRole('heading',{name:headline,exact:true})).toBeVisible();await expect(page.getByText('OUR APPROACH',{exact:true})).toBeVisible();
 }
 await page.goto('/faqs');await page.locator('summary').filter({hasText:'How quickly can you fill a position?'}).click();await expect(page.getByText(/within 7 days \(T\+7\)/)).toBeVisible();await page.locator('summary').filter({hasText:'Who do I contact about my salary or payslip?'}).click();await expect(page.locator('main a[href="mailto:accounts@gadigital.in"]')).toBeVisible();await expect(page.locator('main a[href="mailto:hrms@gadigital.in"]')).toBeVisible();
 for(const width of [390,1440]){
  await page.setViewportSize({width,height:900});await page.goto('/contact/office-locations');await expect(page.locator('[data-office-select]')).toHaveCount(10);await page.locator('[data-office-select="kolkata"]').click();await expect(page.locator('[data-street-address]')).toContainText('700031');await expect(page.locator('[data-street-directions]')).toHaveAttribute('href',/700031/);expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
 }
 await page.goto('/legal');await expect(page.locator('main .link-panels a')).toHaveCount(4);await expect(page.locator('footer a[href="https://www.instagram.com/ga_digital__/"]')).toBeVisible();await expect(page.locator('footer a[href="https://www.facebook.com/GADigitalWebWord/"]')).toBeVisible();
});
test('logo ribbon crosses its loop boundary and respects reduced motion',async({page})=>{
 await page.goto('/');const ribbon=page.locator('.client-ribbon:not(.award-ribbon) .client-ribbon-window');await ribbon.scrollIntoViewIfNeeded();await page.mouse.move(0,0);
 const cycle=await ribbon.evaluate(el=>{const track=el.querySelector('.client-grid');const first=track.children[0],copy=track.querySelector('[data-ribbon-copy]');return copy.offsetLeft-first.offsetLeft;});
 await page.locator('.client-ribbon:not(.award-ribbon) [data-ribbon-pause]').click();await ribbon.evaluate((el,cycle)=>el.scrollLeft=cycle-4,cycle);await page.waitForTimeout(80);await page.locator('.client-ribbon:not(.award-ribbon) [data-ribbon-pause]').click();await page.mouse.move(0,0);await page.locator('h1').evaluate(el=>{el.tabIndex=-1;el.focus({preventScroll:true});});
 await expect.poll(()=>ribbon.evaluate(el=>el.scrollLeft)).toBeLessThan(cycle-4);
 await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(80);const frozen=await ribbon.evaluate(el=>el.scrollLeft);await page.waitForTimeout(150);expect(await ribbon.evaluate(el=>el.scrollLeft)).toBe(frozen);
});

test('hero photograph ombre and readable teal hover styles',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');
 const heroBackground=await page.locator('.home-hero').evaluate(el=>getComputedStyle(el).backgroundImage);expect(heroBackground).toContain('linear-gradient');expect(heroBackground).toContain('hero-office-background.jpg');
 const service=page.locator('.service-row').first();await service.hover();await expect(service).toHaveCSS('background-color','rgb(8, 117, 119)');await expect(service.locator('h3')).toHaveCSS('color','rgb(255, 255, 255)');
 await page.goto('/services/contract-staffing');const sector=page.locator('.pill').first();await sector.focus();await expect(sector).toHaveCSS('background-color','rgb(19, 62, 68)');await expect(sector).toHaveCSS('color','rgb(255, 255, 255)');
});
