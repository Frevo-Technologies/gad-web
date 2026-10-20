import {test,expect} from '@playwright/test';
test('credential link and confirmed leadership',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 for(const width of [390,1440]){
 await page.setViewportSize({width,height:900});await page.goto('/');const ribbon=page.locator('.credential-update');await ribbon.scrollIntoViewIfNeeded();expect((await ribbon.boundingBox()).height).toBeLessThan(180);await page.screenshot({path:`artifacts/compact-ribbon-${width}.png`});
 await page.goto('/about/leadership');await expect(page.locator('.leadership-compact .person-card')).toHaveCount(6);await expect(page.locator('a[href="mailto:gadmd1999@gmail.com"]')).toHaveCount(1);await expect(page.locator('.leadership-compact')).toContainText('S.K. Tandon');expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
 }
 await page.goto('/contact');await expect(page.locator('.department-grid a[href="mailto:compliance@gaidgital.in"]')).toHaveCount(1);
});
