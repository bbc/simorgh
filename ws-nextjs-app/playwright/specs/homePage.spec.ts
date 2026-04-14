import SERVICES from '#app/lib/config/services';
import { test } from '@bbc/unified-web-e2e-framework';
import { expect } from '@playwright/test';

const SERVICES_PATTERN = SERVICES.join('|');

const VALID_HREF_REGEX = new RegExp(
  `^https://www\\.bbc\\.com/(?:${SERVICES_PATTERN}|usingthebbc/[^/]+(?:/.*)?|programmes/[a-z0-9]{8,15})(?:/.*)?$`,
);

const testSuites = [
  {
    path: '/arabic',
    service: 'arabic',
  },
  {
    path: '/dari',
    service: 'dari',
  },
  {
    path: '/kyrgyz',
    service: 'kyrgyz',
  },
  {
    path: '/magyarul',
    service: 'magyarul',
    expectedPath: '/magyarul/articles/cwywderkzy2o',
  },
  {
    path: '/polska',
    service: 'polska',
  },
  {
    path: '/portuguese',
    service: 'portuguese',
  },
  {
    path: '/romania',
    service: 'romania',
    expectedPath: '/romania/articles/c993yged1xno',
  },
  {
    path: '/serbian/lat',
    service: 'serbian',
    variant: 'lat',
  },
  {
    path: '/serbian/cyr',
    service: 'serbian',
    variant: 'cyr',
  },
  {
    path: '/uzbek/lat',
    service: 'uzbek',
    variant: 'lat',
  },
  {
    path: '/uzbek/cyr',
    service: 'uzbek',
    variant: 'cyr',
  },
];

testSuites.forEach(suite => {
  test.describe(`Home Page - ${suite.service}${suite.variant ?? ''}`, () => {
    test('all links within <main> element should be a valid World Service URL', async ({
      page,
    }) => {
      const expectedPath = suite.expectedPath || suite.path;

      await page.goto(suite.path);
      await expect(page).toHaveURL(expectedPath);

      const pageLinks = await page
        .locator('main a[href^="https://www.bbc.com"]')
        .all();

      for (const link of pageLinks) {
        const href = await link.getAttribute('href');
        expect(href).not.toBeNull();
        expect(href).toMatch(VALID_HREF_REGEX);
      }
    });
  });
});
