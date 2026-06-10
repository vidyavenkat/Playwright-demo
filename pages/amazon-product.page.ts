import { type Locator, type Page } from '@playwright/test';

export class AmazonProductPage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly addedToCartConfirmation: Locator;

  readonly declineProtectionPlanButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.locator('#add-to-cart-button, #submit.add-to-cart-button');
    this.declineProtectionPlanButton = page.locator('#attachSiNoCoverage');
    this.addedToCartConfirmation = page.locator(
      '#NATC_SMART_WAGON_CONF_MSG_SUCCESS, #sw-atc-details-single-container, #attachDisplayAddConfirmationMessage',
    );
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.waitFor({ state: 'visible', timeout: 30000 });
    await this.addToCartButton.click();

    if (await this.declineProtectionPlanButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      await this.declineProtectionPlanButton.click();
    }
  }

  async isAddedToCartVisible(): Promise<boolean> {
    return this.addedToCartConfirmation.first().isVisible({ timeout: 15000 });
  }
}
