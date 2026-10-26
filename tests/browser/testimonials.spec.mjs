import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';
import {clientTestimonials} from '../../testimonial-data.mjs';
import {approvedTestimonials,testimonialSection} from '../../testimonial-components.mjs';

test('draft PDF content is complete and never exported as confirmed endorsements',async({page})=>{
 expect(clientTestimonials).toHaveLength(14);expect(new Set(clientTestimonials.map(t=>t.id)).size).toBe(14);expect(approvedTestimonials(clientTestimonials)).toHaveLength(0);
 const missingSignoff={...clientTestimonials[0],status:'approved'};expect(approvedTestimonials([missingSignoff])).toHaveLength(0);
 const approvedFixture={...missingSignoff,approvedAttribution:'Approved test attribution',approvalReference:'Test fixture approval only'};expect(testimonialSection([approvedFixture])).toContain('Approved test attribution');expect(testimonialSection(clientTestimonials)).not.toContain(clientTestimonials[0].quote);
 expect(fs.existsSync('dist/review')).toBe(false);expect(fs.readFileSync('dist/sitemap.xml','utf8')).not.toContain('/review/');
 for(const route of ['/','/clients','/clients/testimonials']){await page.goto(route);await expect(page.locator('.client-feedback-section')).toBeVisible();await expect(page.locator('.client-testimonial')).toHaveCount(0);const html=await page.content();for(const entry of clientTestimonials)expect(html).not.toContain(entry.quote);}
});
test('local review shows all 14 exact draft quotes and suggested attributions on mobile and desktop',async({page})=>{
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 for(const width of [390,1440]){
  await page.setViewportSize({width,height:900});const response=await page.goto('/review/client-testimonials');expect(response.status()).toBe(200);expect(response.headers()['cache-control']).toBe('no-store');expect(response.headers()['x-robots-tag']).toContain('noindex');
  await expect(page.locator('h1')).toHaveText('Client testimonial drafts');await expect(page.locator('.client-testimonial')).toHaveCount(14);await expect(page.locator('.testimonial-status')).toHaveCount(14);
  for(const entry of clientTestimonials){const card=page.locator('#'+entry.id);await expect(card.locator('h3')).toHaveText(entry.organisation);await expect(card.locator('blockquote p')).toHaveText('“'+entry.quote+'”');await expect(card.locator('.testimonial-attribution')).toContainText(entry.suggestedAttribution);}
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  await page.screenshot({path:`artifacts/testimonial-review-${width}.png`,fullPage:true});
 }
 const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa']).analyze();expect(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);expect(errors).toEqual([]);
});
