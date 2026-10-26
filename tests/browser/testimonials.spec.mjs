import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';
import {clientTestimonials} from '../../testimonial-data.mjs';
import {approvedTestimonials} from '../../testimonial-components.mjs';

test.beforeEach(async({page})=>{await page.addInitScript(()=>sessionStorage.setItem('ga-intro-seen','1'));await page.emulateMedia({reducedMotion:'reduce'});});
test('all client-supplied testimonials are enabled with recorded owner authorisation',async({page})=>{
 expect(clientTestimonials).toHaveLength(14);expect(approvedTestimonials(clientTestimonials)).toHaveLength(14);expect(new Set(clientTestimonials.map(t=>t.id)).size).toBe(14);
 const incomplete={...clientTestimonials[0],approvalReference:null};expect(approvedTestimonials([incomplete])).toHaveLength(0);
 expect(clientTestimonials.every(t=>t.publicationAuthorisation==='website-owner'&&t.authorisedOn==='2026-10-26')).toBe(true);
 expect(fs.existsSync('dist/review')).toBe(false);
 for(const [route,count] of [['/',3],['/clients',3],['/clients/testimonials',14]]){
  await page.goto(route);await expect(page.locator('.client-testimonial')).toHaveCount(count);await expect(page.locator('.testimonial-status')).toHaveCount(0);
  for(const entry of clientTestimonials.slice(0,count)){const card=page.locator('#'+entry.id);await expect(card.locator('h3')).toHaveText(entry.organisation);await expect(card.locator('blockquote p')).toHaveText('“'+entry.quote+'”');await expect(card.locator('.testimonial-attribution')).toHaveText(entry.approvedAttribution);}
  if(count<14)await expect(page.locator('.client-feedback-section a')).toHaveAttribute('href','/clients/testimonials');
 }
});
test('public testimonial cards fit desktop and mobile and the local review link stays useful',async({page})=>{
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.goto('/review/client-testimonials');await expect(page).toHaveURL(/\/clients\/testimonials$/);
 for(const width of [390,768,1440]){
  await page.setViewportSize({width,height:900});
  for(const route of ['/','/clients/testimonials']){await page.goto(route);expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);}
  await expect(page.locator('.client-testimonial')).toHaveCount(14);await page.screenshot({path:`artifacts/public-testimonials-${width}.png`,fullPage:true});
 }
 const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa']).analyze();expect(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);expect(errors).toEqual([]);
});
