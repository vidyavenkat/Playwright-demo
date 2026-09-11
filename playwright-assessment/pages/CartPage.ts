import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly title: Locator;
  readonly checkoutButton: Locator;
  readonly cartList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.checkoutButton = page.getByTestId('checkout');
    this.cartList = page.getByTestId('cart-list');
  }

  async expectCartLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/cart\.html/);
    await expect(this.title).toHaveText('Your Cart');
  }

  itemByName(name: string): Locator {
    return this.page
      .getByTestId('inventory-item')
      .filter({ has: this.page.getByTestId('inventory-item-name').filter({ hasText: name }) });
  }

  async expectItemInCart(name: string): Promise<void> {
    await expect(this.itemByName(name).getByTestId('inventory-item-name')).toHaveText(name);
  }

  async expectItemPrice(name: string, price: string): Promise<void> {
    await expect(this.itemByName(name).getByTestId('inventory-item-price')).toHaveText(price);
  }

  async proceedToCheckout(): Promise<void> {
    console.log('cart: proceeding to checkout');
    await this.checkoutButton.click();
  }
}
