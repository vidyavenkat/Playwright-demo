import { type Locator, type Page } from '@playwright/test';

export class AmazonHomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchSubmitButton: Locator;
  readonly cookieAcceptButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('#twotabsearchtextbox');
    this.searchSubmitButton = page.locator('#nav-search-submit-button');
    this.cookieAcceptButton = page.locator('#sp-cc-accept');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.amazon.com/', { waitUntil: 'domcontentloaded' });
  }

  async dismissCookieBannerIfVisible(): Promise<void> {
    if (await this.cookieAcceptButton.isVisible({ timeout: 3000 }).catch(() => false)) {
      await this.cookieAcceptButton.click();
    }
  }

  async searchFor(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchSubmitButton.click();
  }
}
