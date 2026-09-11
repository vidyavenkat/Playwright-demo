import { expect, type Locator, type Page } from '@playwright/test';
import { CREDENTIALS } from '../utils/constants';
import { InventoryPage } from './InventoryPage';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
    this.errorMessage = page.getByTestId('error');
  }

  async goto(): Promise<void> {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
  }

  async login(username: string, password: string): Promise<void> {
    console.log(`login: signing in as ${username}`);
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /** Shared happy-path login used by authenticated flows. */
  async loginAsStandardUser(): Promise<InventoryPage> {
    const inventoryPage = new InventoryPage(this.page);
    await this.goto();
    await this.login(CREDENTIALS.valid.username, CREDENTIALS.valid.password);
    await inventoryPage.expectInventoryLoaded();
    return inventoryPage;
  }

  async expectLoginPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/saucedemo\.com\/?$/);
    await expect(this.loginButton).toHaveAttribute('value', 'Login');
  }

  async expectErrorMessage(message: string): Promise<void> {
    await expect(this.errorMessage).toHaveText(message);
  }
}
