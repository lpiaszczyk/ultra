import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.saucedemo.com/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
  // Save signed-in state to 'storageState.json'.
  await page.context().storageState({ path: 'tests/stoarge/storageState.json' });
  await browser.close();
}

export default globalSetup;