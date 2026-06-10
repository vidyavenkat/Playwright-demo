import { type Locator, type Page } from '@playwright/test';

export class AmazonSearchResultsPage {
  readonly page: Page;
  readonly searchResults: Locator;
  readonly firstProductLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchResults = page.locator('[data-component-type="s-search-result"]');
    this.firstProductLink = this.searchResults
      .first()
      .locator('[data-cy="title-recipe"] a.a-link-normal.s-line-clamp-3');
  }

  async openFirstProduct(): Promise<void> {
    await this.firstProductLink.waitFor({ state: 'visible', timeout: 30000 });
    await this.firstProductLink.click();
  }
}
