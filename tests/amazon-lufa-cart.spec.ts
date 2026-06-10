import { test, expect } from '@playwright/test';
import { AmazonHomePage } from '../pages/amazon-home.page';
import { AmazonSearchResultsPage } from '../pages/amazon-search-results.page';
import { AmazonProductPage } from '../pages/amazon-product.page';

test.describe('Amazon shopping', () => {
  test.use({
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1366, height: 768 },
    extraHTTPHeaders: { 'Accept-Language': 'en-US,en;q=0.9' },
  });

  test('search for lufa and add to cart', async ({ page }) => {
    test.setTimeout(120000);

    const homePage = new AmazonHomePage(page);
    const searchResultsPage = new AmazonSearchResultsPage(page);
    const productPage = new AmazonProductPage(page);

    await homePage.goto();
    await homePage.dismissCookieBannerIfVisible();
    await homePage.searchFor('lufa');

    await expect(page).toHaveURL(/s\?k=lufa|k=lufa/i);
    await searchResultsPage.openFirstProduct();

    await productPage.addToCart();

    await expect(productPage.addedToCartConfirmation.first()).toBeVisible({ timeout: 20000 });
  });
});
