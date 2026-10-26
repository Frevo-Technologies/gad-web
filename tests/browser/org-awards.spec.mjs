import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {departmentManagers} from '../../people-data.mjs';

test.beforeEach(async({page})=>{await page.addInitScript(()=>sessionStorage.setItem('ga-intro-seen','1'));});
test('department cards show approved contacts with keyboard, hover and tap',async({page,browser})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/about/our-team');
 await expect(page.locator('.department-card')).toHaveCount(5);
 await expect(page.locator('.department-title')).toHaveText(['Tender','HR','Compliance','Finance & Account Section','HRMS']);
 await expect(page.locator('.department-person')).toHaveCount(22);
 for(const row of departmentManagers){
  const card=page.locator('.department-card').filter({has:page.getByText(row.department,{exact:true})});
  await expect(card.locator('.department-title')).toHaveText(row.department);
  await expect(card.locator('.department-back')).not.toBeVisible();await card.focus();await page.keyboard.press('Enter');await expect(card).toHaveAttribute('aria-pressed','true');
  await expect(card.locator('.department-person strong')).toHaveText(row.members.map(person=>person.name));
  await expect(card.locator('.department-person>span')).toHaveText(row.members.map(person=>person.position));
  await expect(card.locator('.department-front')).not.toBeVisible();
  const bounds=await card.boundingBox(),last=await card.locator('.department-person').last().boundingBox();expect(last.y+last.height).toBeLessThanOrEqual(bounds.y+bounds.height);
  await page.keyboard.press('Escape');await expect(card).toHaveAttribute('aria-pressed','false');await card.blur();
 }
 const tender=page.locator('[data-department-flip]').filter({hasText:'Tender'});await tender.hover();await expect(tender.locator('.department-back')).toBeVisible();await page.mouse.move(0,0);await expect(tender.locator('.department-front')).toBeVisible();
 await expect(page.locator('.department-cards')).not.toContainText('Chief Executive Officer');
 await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'reduce'});
 const context=await browser.newContext({baseURL:new URL(page.url()).origin,hasTouch:true,viewport:{width:390,height:844},reducedMotion:'reduce'});const mobile=await context.newPage();await mobile.addInitScript(()=>sessionStorage.setItem('ga-intro-seen','1'));await mobile.goto('/about/our-team');const mobileTender=mobile.locator('[data-department-flip]').first();await mobileTender.tap();await expect(mobileTender).toHaveAttribute('aria-pressed','true');await mobileTender.tap();await expect(mobileTender).toHaveAttribute('aria-pressed','false');await context.close();
 const a11y=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa']).analyze();expect(a11y.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
});
test('leadership uses the requested two rows of three equal cards',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/about/leadership');
 await expect(page.locator('.leadership-compact h3')).toHaveText(['Garima Arora','S.K. Tandon','Sharat Mishra','Manish Dutt Sharma','Archeesha Sharma','Nidhi Anand']);
 await page.setViewportSize({width:1440,height:1000});
 const cards=await page.locator('.leadership-compact .person-card').all();const boxes=await Promise.all(cards.map(card=>card.boundingBox()));
 for(let i=1;i<3;i++)expect(boxes[i].y).toBe(boxes[0].y);for(let i=4;i<6;i++)expect(boxes[i].y).toBe(boxes[3].y);expect(boxes[3].y).toBeGreaterThan(boxes[0].y);await page.screenshot({path:'artifacts/leadership-refreshed.png',fullPage:true});
 expect(await cards[0].evaluate(el=>getComputedStyle(el,'::after').content)).toMatch(/none|normal/);
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:1000});
  for(const [name,file] of [['S.K. Tandon','sk-tandon.jpeg'],['Archeesha Sharma','archeesha-sharma.jpeg'],['Nidhi Anand','nidhi-anand.jpeg']]){
   const card=page.locator('.leadership-compact .person-card').filter({has:page.getByRole('heading',{name,exact:true})});const image=card.getByRole('img',{name,exact:true});
   await expect(image).toHaveCSS('object-fit','cover');await expect(image).toHaveAttribute('src','/assets/'+file);await image.scrollIntoViewIfNeeded();await expect.poll(()=>image.evaluate(el=>el.complete&&el.naturalWidth>0)).toBe(true);await expect(card.locator('.portrait-pending')).toHaveCount(0);
  }
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  await page.locator('.leadership-compact').screenshot({path:`artifacts/leadership-portraits-${width}.png`});
 }

});
test('all seven supplied images load, retain labels/dates, and link to full-size originals',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 for(const width of [390,1440]){
  await page.setViewportSize({width,height:1000});await page.goto('/about/certifications');await expect(page.locator('h1')).toHaveText('Certificates & Awards');await expect(page.locator('.credential-update,.credential-gallery')).toHaveCount(0);await expect(page.locator('.award-gallery .award-card')).toHaveCount(7);await expect(page.locator('#iiea-2023 .award-copy>.eyebrow')).toHaveText('CERTIFICATE OF ACHIEVEMENT');
  await expect(page.locator('#media-excellence-2026 time')).toHaveText('21 February 2026');await expect(page.locator('#honorary-business-administration-2023')).toContainText('Honorary award');
  for(const img of await page.locator('.award-gallery img').all()){await img.scrollIntoViewIfNeeded();await expect.poll(()=>img.evaluate(el=>el.complete&&el.naturalWidth>0)).toBe(true);}
  const full=await page.locator('#iiea-2023 .award-image').getAttribute('href');expect((await page.request.get(full)).ok()).toBe(true);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  await page.locator('h1').scrollIntoViewIfNeeded();await page.screenshot({path:`artifacts/awards-${width}.png`,fullPage:true});
  await page.goto('/about/our-team');expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);await page.screenshot({path:`artifacts/our-team-${width}.png`,fullPage:true});
 }
 await page.goto('/about/certifications');const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa']).analyze();expect(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
});
test('awards ribbon pauses and its duplicated links stay out of keyboard navigation',async({page})=>{
 await page.goto('/');const window=page.locator('.award-ribbon .client-ribbon-window');await window.scrollIntoViewIfNeeded();await page.mouse.move(0,0);await page.locator('h1').evaluate(el=>{el.tabIndex=-1;el.focus({preventScroll:true});});
 await expect.poll(()=>window.evaluate(el=>el.scrollLeft)).toBeGreaterThan(0);
 await page.locator('.award-ribbon [data-ribbon-pause]').click();const paused=await window.evaluate(el=>el.scrollLeft);await page.waitForTimeout(150);expect(await window.evaluate(el=>el.scrollLeft)).toBe(paused);
 await expect(page.locator('.award-ribbon [data-ribbon-copy][inert]')).toHaveCount(7);
 await page.emulateMedia({reducedMotion:'reduce'});await expect(page.locator('.award-ribbon [data-ribbon-pause]')).toHaveText('Resume awards');
});
