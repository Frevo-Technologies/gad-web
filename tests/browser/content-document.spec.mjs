import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('approved PDF copy and suitable images without unapproved testimonials or credentials',async({page})=>{
 test.setTimeout(90000);await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/');await expect(page.locator('h1')).toHaveText('The right people, ready to work for you.');await expect(page.locator('.impact-strip')).toContainText('50,000+');await expect(page.locator('.sample-testimonial,.cert-slide')).toHaveCount(0);await expect(page.locator('.placement-notice')).toContainText('11,000');
 await page.goto('/faqs');await expect(page.locator('details')).toHaveCount(9);await expect(page.locator('main')).not.toContainText('GeM');await expect(page.locator('main a[href="/contact"]')).toHaveCount(1);
 await page.goto('/about');await expect(page.locator('h1')).toHaveText('Two decades of putting people first.');await expect(page.locator('main')).toContainText('fairness, transparency and full compliance');
 await page.goto('/about/certifications');await expect(page.locator('.credential-gallery img')).toHaveCount(0);await expect(page.locator('.award-card')).toBeVisible();
 for(const width of [1440,390]){await page.setViewportSize({width,height:900});for(const route of ['/services','/services/competence-building','/services/facility-management','/industries/healthcare']){await page.goto(route);await expect(page.locator('.service-photo-section img')).toHaveCount(1);await page.locator('.service-photo-section img').scrollIntoViewIfNeeded();await expect.poll(()=>page.locator('.service-photo-section img').evaluate(e=>e.complete&&e.naturalWidth>0)).toBe(true);expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);}
 const a11y=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa']).analyze();expect(a11y.violations.map(x=>({id:x.id,nodes:x.nodes.map(n=>n.target)}))).toEqual([]);await page.screenshot({path:`artifacts/content-healthcare-${width}.png`});}
});
