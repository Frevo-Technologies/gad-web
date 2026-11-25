import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('supplied workforce image remains whole at desktop and mobile sizes',async({page})=>{
 await page.addInitScript(()=>sessionStorage.setItem('ga-intro-seen','1'));
 await page.emulateMedia({reducedMotion:'reduce'});
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:1000});
  for(const theme of ['fresh','classic','editorial']){
   await page.goto('/?theme='+theme);
   const image=page.locator('.hero-photo>img');
   await expect(image).toHaveAttribute('src','/assets/workforce-recruitment.jpeg');
   await expect(image).toHaveAttribute('width','1600');
   await expect(image).toHaveAttribute('height','800');
   await expect(image).toHaveCSS('object-fit','contain');
   expect(await image.evaluate(el=>el.naturalWidth/el.naturalHeight)).toBe(2);
   expect(await page.locator('.home-hero').evaluate(el=>getComputedStyle(el).backgroundImage)).not.toContain('hero-office-background.jpg');
   await expect(page.locator('.hero-copy h1')).toBeVisible();
   expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
   const result=await new AxeBuilder({page}).include('.home-hero').withTags(['wcag2a','wcag2aa']).analyze();
   expect(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
   if(theme==='fresh')await page.screenshot({path:`artifacts/workforce-photo-${width}.png`});
  }
 }
});

test('Services and Contract Staffing use the supplied uncropped image',async({page})=>{
 await page.addInitScript(()=>sessionStorage.setItem('ga-intro-seen','1'));
 await page.emulateMedia({reducedMotion:'reduce'});
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:1000});
  for(const route of ['/services','/services/contract-staffing']){
   await page.goto(route);
   const image=page.locator('.service-photo-section img[src$="workforce-recruitment.jpeg"]');
   await expect(image).toBeVisible();
   await expect(image).toHaveAttribute('width','1600');
   await expect(image).toHaveAttribute('height','800');
   await expect(image).toHaveCSS('object-fit','contain');
   await expect(image).toHaveAttribute('alt',/woman holding a laptop.*colleagues.*recruitment-network graphics/i);
   expect(await image.evaluate(el=>el.naturalWidth/el.naturalHeight)).toBe(2);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  }
 }
});

test('footer social links use accessible company icons and verified URLs',async({page})=>{
 await page.addInitScript(()=>sessionStorage.setItem('ga-intro-seen','1'));
 await page.goto('/');
 for(const [network,url] of [
  ['Instagram','https://www.instagram.com/ga_digital__/'],
  ['Facebook','https://www.facebook.com/GADigitalWebWord/'],
  ['X','https://x.com/Ga_Digital___']
 ]){
  const link=page.locator(`footer .social-link[aria-label*="${network}"]`);
  await expect(link).toHaveAttribute('href',url);
  await expect(link).toHaveAttribute('target','_blank');
  await expect(link).toHaveAttribute('rel','noopener noreferrer');
  await expect(link.locator('svg')).toBeVisible();
 }
 const pending=page.locator('footer .social-link-pending[aria-label*="LinkedIn"]');
 await expect(pending.locator('svg')).toBeVisible();
 await expect(page.locator('footer a.linkedin-link')).toHaveCount(0);
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:1000});
  await page.locator('footer').scrollIntoViewIfNeeded();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  await page.locator('footer').screenshot({path:`artifacts/social-footer-${width}.png`});
 }
});
