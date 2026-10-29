import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {industries} from '../../site-data.mjs';
import {clientLogos} from '../../client-logos.mjs';
import {brochureClients} from '../../brochure-clients.mjs';

test.beforeEach(async({page})=>{await page.addInitScript(()=>sessionStorage.setItem('ga-intro-seen','1'));await page.emulateMedia({reducedMotion:'reduce'});});
test('nine local industry photographs load and existing sector controls work',async({page})=>{
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:1000});await page.goto('/industries');await expect(page.locator('.sector-photo')).toHaveCount(9);await expect(page.locator('.sector-front svg')).toHaveCount(0);
  for(const image of await page.locator('.sector-photo').all()){await image.scrollIntoViewIfNeeded();await expect.poll(()=>image.evaluate(el=>el.complete&&el.naturalWidth>0)).toBe(true);await expect(image).toHaveAttribute('src',/^\/assets\/industries\//);}
  const control=page.locator('[data-sector-toggle]').first();await control.focus();await page.keyboard.press('Enter');await expect(control).toHaveAttribute('aria-expanded','true');await page.keyboard.press('Escape');await expect(control).toHaveAttribute('aria-expanded','false');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);await page.mouse.move(0,0);await page.locator('h1').scrollIntoViewIfNeeded();await page.screenshot({path:`artifacts/industries-refreshed-${width}.png`,fullPage:true});
 }
 const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa']).analyze();expect(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
});
test('brochure client list and verified logos load; search and filters work',async({page})=>{
 await page.goto('/clients');await expect(page.locator('.client-grid .client-tile')).toHaveCount(88);await expect(page.locator('.client-grid .client-logo-stage img')).toHaveCount(Object.keys(clientLogos).length);
 for(const client of brochureClients)await expect(page.locator('.client-grid .client-card-caption>span').filter({hasText:client.name})).toHaveCount(1);
 await page.locator('.client-grid img').evaluateAll(images=>images.forEach(img=>img.loading='eager'));
 await expect.poll(()=>page.locator('.client-grid img').evaluateAll(images=>images.every(img=>img.complete&&img.naturalWidth>0))).toBe(true);
 for(const file of ['ignou.png','beml.png'])await expect(page.locator('.client-logo-stage').filter({has:page.locator(`img[src$="/${file}"]`)})).toHaveCSS('background-color','rgb(23, 59, 75)');
 const pfms=page.locator('.client-tile').filter({hasText:'Public Financial Management System, Punjab'});await expect(pfms.locator('img')).toHaveCount(0);
 await page.getByRole('searchbox',{name:'Search client organizations'}).fill('NITI Aayog');await expect(page.locator('.client-grid .client-tile:visible')).toHaveCount(1);await expect(page.locator('.client-grid .client-tile:visible')).toContainText('NITI Aayog');
 await page.getByRole('searchbox').fill('');await page.locator('[data-category-select]').selectOption('healthcare');await expect(page.locator('.client-grid .client-tile:visible')).toHaveCount(industries.find(i=>i.slug==='healthcare').clients.length);await page.locator('[data-category-select]').selectOption('all');await page.getByRole('searchbox').blur();await page.locator('[data-category-select]').blur();
 for(const width of [1440,390]){await page.setViewportSize({width,height:1000});expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);await page.locator('.client-grid').screenshot({path:`artifacts/clients-refreshed-${width}.png`});}
});

test('pending success stories are hidden and their previous URL returns to Clients',async({page})=>{
 for(const route of ['/','/clients','/resources','/clients/testimonials']){
  await page.goto(route);
  await expect(page.locator('body')).not.toContainText(/client success stories|content awaiting approval/i);
  await expect(page.locator('a[href="/clients/case-studies"],.client-success-section')).toHaveCount(0);
 }
 await page.goto('/clients/case-studies');await expect(page).toHaveURL(/\/clients$/);
});
