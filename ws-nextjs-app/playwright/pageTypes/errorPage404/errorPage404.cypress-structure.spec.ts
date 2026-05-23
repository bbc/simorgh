import { test, expect } from '@playwright/test';
import appConfig from '../../../utilities/serviceConfigs';
import { AppEnv, errorPage404Suites } from './suites';

const appEnvFromProcess = (process.env.APP_ENV || 'local') as AppEnv;

const baseUrlByEnv: Record<AppEnv, string> = {
  local: 'http://localhost:7081',
  test: 'https://www.test.bbc.com',
  live: 'https://www.bbc.com',
};

const baseURL =
  process.env.PLAYWRIGHT_BASE_URL || baseUrlByEnv[appEnvFromProcess];

const shouldRunForEnv = (runforEnv: AppEnv[]) =>
  runforEnv.includes(appEnvFromProcess);

const getServiceConfig = (service: string, variant?: string) => {
  return appConfig[service as keyof typeof appConfig][variant || 'default'];
};

test.describe('errorPage404 cypress-structure migration', () => {
  errorPage404Suites.canonical.forEach(testSuite => {
    const suiteName = `${testSuite.service}${
      testSuite.variant ? ` (${testSuite.variant})` : ''
    }`;

    test.describe(`Tests for ${suiteName} errorPage404`, () => {
      test(`Test we get a 404 for ${suiteName}`, async ({ request }) => {
        test.skip(
          !shouldRunForEnv(testSuite.runforEnv),
          `Skipped for APP_ENV=${appEnvFromProcess}`,
        );

        const response = await request.get(`${baseURL}${testSuite.path}`);
        const contentType = response.headers()['content-type'] || '';

        expect(response.status()).toBe(404);
        expect(contentType).toContain('text/html');
      });

      test.describe(`Error Page Tests for ${suiteName}`, () => {
        test(`should display correct 404 content for ${suiteName}`, async ({
          page,
          request,
        }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runforEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          const serviceConfig = getServiceConfig(
            testSuite.service,
            testSuite.variant,
          );
          const title = serviceConfig.translations.error[404].title;
          const pageTitle = `${title} - ${serviceConfig.brandName}`;
          const description = title;
          const ctaUrl =
            serviceConfig.translations.error[404].callToActionLinkUrl;

          const apiResponse = await request.get(`${baseURL}${testSuite.path}`);
          expect(apiResponse.status()).toBe(404);

          const pageResponse = await page.goto(`${baseURL}${testSuite.path}`, {
            waitUntil: 'domcontentloaded',
          });

          expect(pageResponse?.status()).toBe(404);
          await expect(page.locator('h1')).toContainText(title);
          await expect(page.locator(`a[href="${ctaUrl}"]`)).toBeVisible();
          await expect(page).toHaveTitle(pageTitle);
          await expect(
            page.locator('meta[name="og:description"]'),
          ).toHaveAttribute('content', description);
          await expect(page.locator('meta[name="og:title"]')).toHaveAttribute(
            'content',
            pageTitle,
          );
          await expect(
            page.locator('meta[name="twitter:description"]'),
          ).toHaveAttribute('content', description);
          await expect(
            page.locator('meta[name="twitter:title"]'),
          ).toHaveAttribute('content', pageTitle);
          await expect(page.locator('html')).toHaveAttribute(
            'lang',
            serviceConfig.lang,
          );
        });
      });

      test.describe.skip(`Standalone error routes for ${suiteName}`, () => {
        test(`/${testSuite.service}/404 should return 200`, async ({
          request,
        }) => {
          const response = await request.get(
            `${baseURL}/${testSuite.service}/404`,
          );
          const contentType = response.headers()['content-type'] || '';
          expect(response.status()).toBe(200);
          expect(contentType).toContain('text/html');
        });

        test(`/${testSuite.service}/500 should return 200`, async ({
          request,
        }) => {
          const response = await request.get(
            `${baseURL}/${testSuite.service}/500`,
          );
          const contentType = response.headers()['content-type'] || '';
          expect(response.status()).toBe(200);
          expect(contentType).toContain('text/html');
        });
      });
    });
  });
});
