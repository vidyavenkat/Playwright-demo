import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { MESSAGES } from '../utils/constants';
import { CHECKOUT, PRODUCT } from '../utils/testData';

test.describe('SauceDemo purchase flow', () => {
  test('checkout happy path with cart badge and price consistency', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = await loginPage.loginAsStandardUser();
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    const inventoryPrice = await inventoryPage.getItemPrice(PRODUCT.name);

    await inventoryPage.addItemToCart(PRODUCT.addToCartTestId);
    await inventoryPage.expectCartBadgeCount(1);

    await inventoryPage.openCart();
    await cartPage.expectCartLoaded();
    await cartPage.expectItemInCart(PRODUCT.name);
    await cartPage.expectItemPrice(PRODUCT.name, inventoryPrice);

    await cartPage.proceedToCheckout();
    await checkoutPage.expectInfoStepLoaded();
    await checkoutPage.fillCustomerInfo(CHECKOUT.firstName, CHECKOUT.lastName, CHECKOUT.postalCode);
    await checkoutPage.expectOverviewLoaded();
    await checkoutPage.finishOrder();
    await checkoutPage.expectOrderComplete(MESSAGES.orderCompleteHeader, MESSAGES.orderCompleteText);
  });
});
