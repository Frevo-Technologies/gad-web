import {test,expect} from '@playwright/test';

test('Fresh Blue & Teal is the fixed theme and preview controls are hidden',async({page})=>{
 await page.goto('/');
 await expect(page.locator('html')).toHaveAttribute('data-theme','fresh');
 await expect(page.locator('.theme-picker')).toHaveCount(0);
 await expect(page.getByLabel('Preview theme')).toHaveCount(0);
 await page.goto('/contact?theme=classic');
 await expect(page.locator('html')).toHaveAttribute('data-theme','fresh');
});
