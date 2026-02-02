/* eslint-disable cypress/no-async-tests */
import { test, expect } from '@playwright/test';

// const tests = [urlValidationTest, canonicalTests, testsForAllCanonicalPages];
import SERVICES from '#app/lib/config/services';

const testSuites = [
  {
    path: '/arabic',
    service: 'arabic',
    variant: undefined,
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

const SERVICES_PATTERN = SERVICES.join('|');

const VALID_HREF_REGEX = new RegExp(
  `^https://www\\.bbc\\.com/(?:${SERVICES_PATTERN}|usingthebbc/[^/]+(?:/.*)?|programmes/[a-z0-9]{8,15})(?:/.*)?$`,
);

// smoke tests
testSuites.forEach(suite => {
  test.describe(`Home Page - ${suite.service}${suite.variant ?? ''}`, () => {
    test('all links within <main> element should be a valid World Service URL', async ({
      page,
    }) => {
      await page.goto(suite.path);
      await expect(page).toHaveURL(suite.path);

      const links = await page
        .locator('main a[href^="https://www.bbc.com"]')
        .elementHandles();

      for (const link of links) {
        const href = await link.getAttribute('href');
        expect(href).not.toBeNull();
        expect(href).toMatch(VALID_HREF_REGEX);
      }
    });
  });
});
