import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';
import {departmentManagers} from '../../people-data.mjs';
import {industries} from '../../site-data.mjs';
import {offices} from '../../office-data.mjs';
const routes=JSON.parse(fs.readFileSync('routes.json','utf8'));
test.beforeEach(async({page})=>{await page.addInitScript(()=>sessionStorage.setItem('ga-intro-seen','1'));await page.emulateMedia({reducedMotion:'reduce'});await page.route('**://*.tile.openstreetmap.org/**',r=>r.abort());});
test('PDF content rules apply sitewide without changing the original archive',async({page})=>{
 for(const {url} of routes){const file=url==='/'?'dist/index.html':`dist${url}/index.html`,html=fs.readFileSync(file,'utf8');
  if(url!=='/services/recruitment-head-hunting')expect(html,url).not.toMatch(/(?:10,000|₹10|&#8377;10)/);
  expect(html,url).not.toContain('Sweta Nishad');expect(html,url).not.toContain('class="department-index"');
 }
 await page.goto('/');await expect(page.locator('.insights-groups>section')).toHaveCount(2);await expect(page.locator('.insights-groups .article-card img')).toHaveCount(3);await expect(page.locator('.why-grid>div>span')).toHaveCount(0);
 const archive=fs.readFileSync('dist/resources/archived-notices/index.html','utf8'),original=JSON.parse(fs.readFileSync('research.json','utf8')).public_notice;
 const text=await page.request.get('/resources/archived-notices');expect(text.ok()).toBe(true);await page.goto('/resources/archived-notices');expect(await page.locator('.notice-verbatim').innerText()).toBe(original.split('\n').filter(Boolean).join('\n\n'));
 expect(archive).toContain('14/06/2025');await page.goto('/about');await expect(page.locator('#director-message')).toBeVisible();await expect(page.locator('#director-message img')).toHaveAttribute('src','/assets/garima-arora.jpeg');
});
test('department fronts carry contacts and handling chiefs; Ritu retains her source role',async({page})=>{
 await page.goto('/about/our-team');
 for(const department of departmentManagers){const shell=page.locator('.department-card-shell').filter({has:page.getByText(department.department,{exact:true})});await expect(shell.locator('.department-email')).toHaveAttribute('href','mailto:'+department.email);await expect(shell.locator('.department-handling strong')).toHaveText(department.handling.join(''));}
 const tender=page.locator('[data-department-flip]').first();await tender.focus();await page.keyboard.press('Enter');await expect(tender.locator('.department-person').last()).toHaveText('RituJr. Tender Executive');
 expect(departmentManagers[2].members.slice(0,2).every(p=>p.position.startsWith('Chief'))).toBe(true);expect(departmentManagers[3].members.slice(0,2).every(p=>p.position.startsWith('Chief'))).toBe(true);
});
test('only Contract Staffing retains reference and facility sections; Recruitment retains fee details',async({page})=>{
 for(const {url} of routes.filter(p=>p.url.startsWith('/services/'))){await page.goto(url);const count=url==='/services/contract-staffing'?1:0;await expect(page.locator('.supplied-designations')).toHaveCount(count);await expect(page.locator('.related-facility')).toHaveCount(count);}
 await page.goto('/services/it-technical-manpower');await expect(page.locator('main')).toContainText('CTO and CXO');await expect(page.locator('main')).toContainText('C-DAC');await expect(page.locator('main')).toContainText('AI engineers');
 await page.goto('/services/recruitment-head-hunting');await expect(page.locator('#placement-service-fee')).toContainText('10,000');
 await page.goto('/services/outsourcing-training');await expect(page.locator('.training-provided')).toContainText('Workplace soft skills');
});
test('chatbot gives all known addresses and links to the fee source',async({page})=>{
 await page.goto('/');await page.getByRole('button',{name:'Website help',exact:true}).click();const chat=page.locator('#faq-chat');await chat.getByRole('button',{name:'Office locations',exact:true}).click();for(const office of offices)await expect(chat.locator('.faq-chat-message').last()).toContainText(office.address);
 await chat.getByRole('button',{name:'Placement service fee',exact:true}).click();await expect(chat.locator('.faq-chat-message').last()).not.toContainText('10,000');await expect(chat.locator('.faq-chat-message').last().getByRole('link').first()).toHaveAttribute('href','/services/recruitment-head-hunting#placement-service-fee');
});
test('new sections, photographs and pages fit desktop and mobile with no browser errors',async({page})=>{
 test.setTimeout(120000);const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const paths=['/','/resources','/resources/archived-notices','/disclaimer','/clients','/clients/case-studies','/clients/testimonials','/careers','/about/leadership','/about/our-team','/contact/office-locations','/contact','/services/it-technical-manpower',...routes.filter(p=>p.url.startsWith('/insights')).map(p=>p.url)];
 for(const width of [360,768,1440]){await page.setViewportSize({width,height:1000});for(const path of paths){await page.goto(path);await expect(page.locator('h1')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth),path+' at '+width).toBeLessThanOrEqual(width);if(path.startsWith('/insights/')){const image=page.locator('.insight-photo img');await image.scrollIntoViewIfNeeded();await expect.poll(()=>image.evaluate(el=>el.complete&&el.naturalWidth>0)).toBe(true);}}}
 expect(errors).toEqual([]);
 for(const path of ['/disclaimer','/careers','/services/it-technical-manpower','/contact/office-locations']){await page.goto(path);const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa']).analyze();expect(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),path).toEqual([]);}
});

test('every client industry and its organisations remain available through filtering',async({page})=>{
 await page.goto('/clients');await expect(page.locator('.client-tile')).toHaveCount(industries.reduce((n,i)=>n+i.clients.length,0));
 for(const industry of industries){await page.locator('[data-category-select]').selectOption(industry.slug);await expect(page.locator('.client-tile:visible')).toHaveCount(industry.clients.length);for(const client of industry.clients)await expect(page.locator('.client-tile:visible').filter({hasText:client})).toHaveCount(1);}
});
