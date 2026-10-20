import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test.beforeEach(async({page})=>{await page.addInitScript(()=>sessionStorage.setItem('ga-intro-seen','1'));});
test('customer layouts, removals, ribbon and keyboard card controls',async({page})=>{
 await page.goto('/');await expect(page.locator('html')).toHaveAttribute('data-theme','fresh');
 const toggle=page.locator('[data-sector-toggle]').first();await toggle.focus();await page.keyboard.press('Enter');await expect(toggle).toHaveAttribute('aria-expanded','true');await page.keyboard.press('Escape');await expect(toggle).toHaveAttribute('aria-expanded','false');
 const ribbon=page.locator('.client-ribbon-window');await ribbon.scrollIntoViewIfNeeded();await page.mouse.move(0,0);await page.locator('h1').evaluate(e=>{e.tabIndex=-1;e.focus({preventScroll:true});});
 await expect.poll(()=>ribbon.evaluate(e=>e.scrollLeft)).toBeGreaterThan(0);
 await page.locator('[data-ribbon-pause]').click();const position=await ribbon.evaluate(e=>e.scrollLeft);await page.waitForTimeout(150);expect(await ribbon.evaluate(e=>e.scrollLeft)).toBe(position);
 await page.goto('/about/our-team');await expect(page.locator('.hr-directory .person-card')).toHaveCount(0);await expect(page.locator('.hr-directory img,.hr-directory .linkedin-link,#delivery,.team-grid')).toHaveCount(0);
 await page.goto('/about/leadership');await expect(page.locator('.leadership-compact .person-card')).toHaveCount(6);
 await page.goto('/services');await expect(page.locator('main')).not.toContainText('Payroll & workforce administration');await expect(page.locator('a[href*="hrm-consulting"],#delivery')).toHaveCount(0);
 await page.goto('/services/recruitment-head-hunting');await expect(page.locator('main')).toContainText('LOOKING FOR A JOB?');
 await page.goto('/about/certifications');await expect(page.locator('.credential-gallery article')).toHaveCount(0);await expect(page.locator('main')).not.toContainText('Credential verification');
});
test('updated pages fit desktop and mobile with accessible home controls',async({page})=>{
 test.setTimeout(90000);await page.emulateMedia({reducedMotion:'reduce'});
 for(const width of [1440,390]){await page.setViewportSize({width,height:900});for(const route of ['/','/industries','/about/our-team','/about/leadership','/about/certifications','/services']){await page.goto(route);expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);}
 await page.goto('/');const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa']).analyze();expect(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);await page.screenshot({path:`artifacts/customer-home-${width}.png`});await page.locator('.sector-cards').scrollIntoViewIfNeeded();await page.screenshot({path:`artifacts/customer-sectors-${width}.png`});}
});
