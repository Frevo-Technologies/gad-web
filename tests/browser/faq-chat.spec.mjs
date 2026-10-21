import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('FAQ assistant answers approved topics, falls back and supports keyboard',async({page})=>{
 await page.addInitScript(()=>sessionStorage.setItem('ga-intro-seen','1'));await page.goto('/');await page.getByRole('button',{name:'Website help',exact:true}).click();const chat=page.getByRole('dialog');await expect(chat).toBeVisible();const input=chat.getByLabel('Your website question');
 for(const [question,expected] of [['fees','10,000'],['नौकरी','Frevone'],['verification','48 hours'],['weather forecast','preset answers']]){await input.fill(question);await chat.getByRole('button',{name:'Ask',exact:true}).click();await expect(chat.locator('.faq-chat-message').last()).toContainText(expected);}
 await input.fill('<img src=x onerror=alert(1)>');await chat.getByRole('button',{name:'Ask',exact:true}).click();await expect(chat.locator('.faq-chat-log img')).toHaveCount(0);
 const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa']).analyze();expect(result.violations.map(x=>({id:x.id,nodes:x.nodes.map(n=>n.target)}))).toEqual([]);
 await page.keyboard.press('Escape');await expect(chat).not.toBeVisible();await expect(page.getByRole('button',{name:'Website help',exact:true})).toBeFocused();
 await page.setViewportSize({width:390,height:700});await page.getByRole('button',{name:'Website help',exact:true}).click();const box=await chat.boundingBox();expect(box.x).toBeGreaterThanOrEqual(0);expect(box.x+box.width).toBeLessThanOrEqual(390);expect(box.y+box.height).toBeLessThanOrEqual(700);await page.screenshot({path:'artifacts/faq-chat-mobile.png'});
});
