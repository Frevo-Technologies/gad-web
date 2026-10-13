import {test,expect} from '@playwright/test';
test('homepage sections animate their content on entering the viewport',async({page})=>{
  await page.addInitScript(()=>sessionStorage.setItem('ga-intro-seen','1'));
  await page.goto('/');
  for(const selector of ['.intro-section>div','.service-row','.why-grid>div','.industry-grid>a','.client-tile','.process-grid>div','.engagement-card','.article-card','.final-cta>.wrap>div']){
    const target=page.locator(selector).first();
    await target.evaluate(el=>window.scrollTo({top:el.getBoundingClientRect().top+scrollY-innerHeight+180,behavior:'instant'}));
    await expect.poll(()=>target.evaluate(el=>el.getAnimations().length)).toBeGreaterThan(0);
    await expect.poll(()=>target.evaluate(el=>el.getAnimations().length)).toBe(0);
    expect(await target.evaluate(el=>getComputedStyle(el).opacity)).toBe('1');
  }
});
