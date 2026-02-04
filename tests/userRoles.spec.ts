// import { test, expect, chromium, BrowserContext, Page } from '@playwright/test';
 
// test('Admin action is visible for user', async () => {
//   const browser = await chromium.launch();
 

//   const adminContext: BrowserContext = await browser.newContext();
//   const adminPage: Page = await adminContext.newPage();
 
//   await adminPage.goto('https://ecom.com/admin/login');
//   await adminPage.fill('#email', 'admin@test.com');
//   await adminPage.fill('#password', 'admin123');
//   await adminPage.click('button[type="submit"]');
 
  
//   await adminPage.goto('https://ecom.com/admin/products/123');
//   await adminPage.click('button:has-text("Activate")');
 
//   await expect(adminPage.locator('.status')).toHaveText('Active');
 
 
//   const userContext: BrowserContext = await browser.newContext();
//   const userPage: Page = await userContext.newPage();
 
//   await userPage.goto('https://ecom.com/login');
//   await userPage.fill('#email', 'user@test.com');
//   await userPage.fill('#password', 'user123');
//   await userPage.click('button[type="submit"]');
 
//   await userPage.goto('https://ecom.com/products/123');
 
 
//   await expect(userPage.locator('.product-status')).toHaveText('Available');
 
//   await browser.close();
// });