import { test } from '@bbc/unified-web-e2e-framework';
import { expect } from '@playwright/test';
import SERVICES from '#app/lib/config/services';

const SERVICES_PATTERN = SERVICES.join('|');

const VALID_HREF_REGEX = new RegExp(
  `^https://www\\.bbc\\.com/(?:${SERVICES_PATTERN}|usingthebbc/[^/]+(?:/.*)?|programmes/[a-z0-9]{8,15})(?:/.*)?$`,
);

export default page => {
  test('all links within <main> element should be a valid World Service URL', async () => {
    const links = await page
      .locator('main a[href^="https://www.bbc.com"]')
      .elementHandles();

    for (const link of links) {
      const href = await link.getAttribute('href');
      expect(href).not.toBeNull();
      expect(href).toMatch(VALID_HREF_REGEX);
    }
  });
};
