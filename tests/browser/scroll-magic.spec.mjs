import {test,expect} from '@playwright/test';
test('scroll depth follows scrolling and respects reduced motion',async({page})=>{
  await page.addInitScript(()=>sessionStorage.setItem('ga-intro-seen','1'));
  await page.goto('/');
  const photo=page.locator('.scroll-depth-photo');
  await expect(photo).toHaveCount(1);
  const initial=await photo.evaluate(e=>e.style.getPropertyValue('--scroll-drift'));
  await page.evaluate(()=>window.scrollTo(0,450));
  await expect.poll(()=>photo.evaluate(e=>e.style.getPropertyValue('--scroll-drift'))).not.toBe(initial);
  await page.locator('.service-list').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await expect(page.locator('.service-row.reveal-pending')).toHaveCount(0);
  await page.screenshot({path:'artifacts/scroll-magic-services.png'});
  await page.emulateMedia({reducedMotion:'reduce'});
  await expect.poll(()=>photo.evaluate(e=>e.style.getPropertyValue('--scroll-drift'))).toBe('0px');
  for(const width of [390,1440]){
    await page.setViewportSize({width,height:900});
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
});
