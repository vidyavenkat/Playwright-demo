import { expect, type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly inventoryList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.inventoryList = page.getByTestId('inventory-list');
  }

  async expectInventoryLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/inventory\.html/);
    await expect(this.title).toHaveText('Products');
    await expect(this.inventoryList).toBeVisible();
  }

  itemByName(name: string): Locator {
    return this.page
      .getByTestId('inventory-item')
      .filter({ has: this.page.getByTestId('inventory-item-name').filter({ hasText: name }) });
  }

  async getItemPrice(name: string): Promise<string> {
    const priceText = await this.itemByName(name).getByTestId('inventory-item-price').innerText();
    return priceText.trim();
  }

  async addItemToCart(addToCartTestId: string): Promise<void> {
    console.log(`inventory: adding item via ${addToCartTestId}`);
    await this.page.getByTestId(addToCartTestId).click();
  }

  async expectCartBadgeCount(count: number): Promise<void> {
    await expect(this.cartBadge).toHaveText(String(count));
  }

  async openCart(): Promise<void> {
    console.log('inventory: opening cart');
    await this.cartLink.click();
  }
}
