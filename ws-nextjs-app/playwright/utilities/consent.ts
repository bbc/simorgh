import type { Page } from '@playwright/test';

const addConsentBannerHandlers = async (page: Page) => {
  await page.addLocatorHandler(
    page.locator('[data-terms-banner="accept"]'),
    async button => {
      await button.click();
    },
  );
  await page.addLocatorHandler(
    page.locator('[data-cookie-banner="accept"]'),
    async button => {
      await button.click();
    },
  );
};

export default addConsentBannerHandlers;
