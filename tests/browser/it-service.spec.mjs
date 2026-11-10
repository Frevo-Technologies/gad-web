import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async({page})=>{
 await page.addInitScript(()=>sessionStorage.setItem('ga-intro-seen','1'));
 await page.emulateMedia({reducedMotion:'reduce'});
});
test('IT service follows the existing service layout and retains its technical roles',async({page})=>{
 for(const width of [360,768,1440]){
  await page.setViewportSize({width,height:1000});await page.goto('/services/it-technical-manpower');
  await expect(page.locator('h1')).toHaveText('IT & Technical Manpower');
  await expect(page.locator('.inner-hero a.button')).toHaveAttribute('href','/contact?service=it-technical-manpower');
  await expect(page.locator('.service-photo-section')).toHaveCount(1);
  const image=page.locator('.service-photo-section img');await image.scrollIntoViewIfNeeded();await expect.poll(()=>image.evaluate(el=>el.complete&&el.naturalWidth>0)).toBe(true);
  await expect(page.locator('.capability-grid')).toContainText('AI engineers');await expect(page.locator('.capability-grid')).toContainText('CTO and CXO roles');
  await expect(page.getByText('WHAT YOU NEED',{exact:true})).toBeVisible();await expect(page.getByText('OUR APPROACH',{exact:true})).toBeVisible();
  await expect(page.locator('main>.why-section')).toHaveCount(1);await expect(page.locator('.faq-layout details')).toHaveCount(2);await expect(page.locator('main>.final-cta')).toHaveCount(1);
  await expect(page.locator('.it-client-references h3')).toHaveText(['C-DAC','UIDAI']);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
 }
 await page.locator('.faq-layout summary').first().focus();await page.keyboard.press('Enter');await expect(page.locator('.faq-layout details').first()).toHaveAttribute('open','');
 const a11y=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa']).analyze();expect(a11y.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
 await page.keyboard.press('Enter');await page.locator('h1').scrollIntoViewIfNeeded();await page.screenshot({path:'artifacts/it-service-desktop.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:'artifacts/it-service-mobile.png',fullPage:true});
});
test('C-DAC and UIDAI references resolve and the enquiry keeps the IT service selected',async({page})=>{
 await page.goto('/services/it-technical-manpower');await page.locator('.it-client-references a').first().click();await expect(page).toHaveURL(/\/clients\/testimonials#cdac-noida$/);await expect(page.locator('#cdac-noida')).toContainText('C-DAC');
 await page.goto('/services/it-technical-manpower');await page.locator('.it-client-references a').last().click();await expect(page).toHaveURL(/\/clients\/engagements\/uidai$/);await expect(page.locator('h1')).toContainText('UIDAI');
 await page.goto('/services/it-technical-manpower');await page.locator('.inner-hero a.button').click();await expect(page.locator('select[name="service"]')).toHaveValue('it-technical-manpower');
});
