import {test,expect} from '@playwright/test';
test.beforeEach(async({page})=>{await page.addInitScript(()=>sessionStorage.setItem('ga-intro-seen','1'));await page.route('**://*.tile.openstreetmap.org/**',route=>route.abort());});
test('navigation dropdowns work on desktop and mobile',async({page})=>{await page.goto('/');const company=page.getByRole('button',{name:'Company',exact:true});await company.click();await expect(page.locator('#nav-panel-0')).toBeVisible();await page.getByRole('button',{name:'Services',exact:true}).click();await expect(page.locator('#nav-panel-0')).toBeHidden();await page.keyboard.press('Escape');await expect(page.locator('#nav-panel-1')).toBeHidden();await page.setViewportSize({width:390,height:844});await page.getByRole('button',{name:'Menu',exact:false}).click();await company.click();await expect(page.locator('#nav-panel-0')).toBeVisible();await page.locator('#nav-panel-0').getByRole('link',{name:'Leadership',exact:true}).click();await expect(page).toHaveURL(/about\/leadership$/);});
test('all office pins synchronize with address selection and directions',async({page})=>{
 await page.goto('/contact/office-locations');await expect(page.locator('.leaflet-marker-icon')).toHaveCount(10);
 const left=await page.locator('.office-address-column').boundingBox(),right=await page.locator('.street-map-panel').boundingBox();expect(left.x+left.width).toBeLessThanOrEqual(right.x);
 await page.locator('[data-office-select="mumbai"]').click();await expect(page.locator('[data-street-address]')).toContainText('Mastermind-I');await expect(page.locator('.leaflet-popup')).toContainText('Mumbai');
 await page.locator('[data-street-directions]').getAttribute('href').then(url=>expect(decodeURIComponent(url)).toContain('Mastermind-I'));
 await page.getByRole('button',{name:'Show all offices',exact:true}).click();await expect(page.locator('.leaflet-popup')).toHaveCount(0);await expect(page.locator('.leaflet-marker-icon')).toHaveCount(10);
 await page.locator('[data-office-select="bhopal"]').click();await expect(page.locator('[data-street-address]')).toContainText('462066');
 await page.setViewportSize({width:390,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});
