import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly title: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.finishButton = page.getByTestId('finish');
    this.completeHeader = page.getByTestId('complete-header');
    this.completeText = page.getByTestId('complete-text');
    this.backHomeButton = page.getByTestId('back-to-products');
  }

  async expectInfoStepLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/checkout-step-one\.html/);
    await expect(this.title).toHaveText('Checkout: Your Information');
  }

  async fillCustomerInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    console.log('checkout: filling customer information');
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async expectOverviewLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/checkout-step-two\.html/);
    await expect(this.title).toHaveText('Checkout: Overview');
  }

  async finishOrder(): Promise<void> {
    console.log('checkout: finishing order');
    await this.finishButton.click();
  }

  async expectOrderComplete(header: string, body: string): Promise<void> {
    await expect(this.page).toHaveURL(/\/checkout-complete\.html/);
    await expect(this.completeHeader).toHaveText(header);
    await expect(this.completeText).toHaveText(body);
    await expect(this.backHomeButton).toBeVisible();
  }
}
