/* eslint-disable cypress/no-async-tests */
import { test, expect } from '@playwright/test';
import runUrlValidationTest from '../support/helpers/runUrlValidationTest';

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

// smoke tests
testSuites.forEach(suite => {
  test.describe(`Home Page - ${suite.service}${suite.variant ?? ''}`, () => {
    test('all links within <main> element should be a valid World Service URL', async ({
      page,
    }) => {
      await page.goto(suite.path);
      await expect(page).toHaveURL(suite.path);
      runUrlValidationTest(page);
      // ToDo: check how to reuse the same browser instead of opening / reponeing
      // ToDO: run canonicalTests, testsForAllCanonicalPages
      // ToDo: differentiate between smoke / non-smoke
      // ToDo: decide whether to migrate runPage or do a different mroe direct approach (even if it means more repetition)
    });
  });
});
