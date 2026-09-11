import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CREDENTIALS, MESSAGES } from '../utils/constants';

test.describe('SauceDemo authentication', () => {
  test('valid login succeeds', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.expectLoginPageLoaded();
    await loginPage.login(CREDENTIALS.valid.username, CREDENTIALS.valid.password);

    await inventoryPage.expectInventoryLoaded();
  });

  test('invalid login shows error message', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(CREDENTIALS.invalid.username, CREDENTIALS.invalid.password);

    await loginPage.expectErrorMessage(MESSAGES.invalidLogin);
    await loginPage.expectLoginPageLoaded();
  });
});
