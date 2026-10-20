import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('photograph fills the hero behind both columns and keeps controls readable on all themes',async({page})=>{
 await page.addInitScript(()=>sessionStorage.setItem('ga-intro-seen','1'));await page.emulateMedia({reducedMotion:'reduce'});
 const response=await page.request.get('/assets/hero-office-background.jpg');expect(response.ok()).toBe(true);expect(response.headers()['content-type']).toContain('image/jpeg');
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:1000});
  for(const theme of ['fresh','classic','editorial']){
   await page.goto('/?theme='+theme);const hero=page.locator('.home-hero');await expect(hero).toHaveCSS('background-size','cover, cover');
   expect(await hero.evaluate(el=>getComputedStyle(el).backgroundImage)).toContain('hero-office-background.jpg');
   await expect(page.locator('.hero-copy h1')).toHaveCSS('color','rgb(255, 255, 255)');await expect(page.locator('.hero-photo>img')).toHaveAttribute('src','/assets/manpower-team.webp');
   await expect(page.locator('.hero-copy a[href="/services"]')).toBeVisible();await expect(page.locator('.hero-copy a[href="/contact"]')).toBeVisible();
   expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
   const result=await new AxeBuilder({page}).include('.home-hero').withTags(['wcag2a','wcag2aa']).analyze();expect(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
   if(theme==='fresh')await page.screenshot({path:`artifacts/hero-photograph-${width}.png`});
  }
 }
});
