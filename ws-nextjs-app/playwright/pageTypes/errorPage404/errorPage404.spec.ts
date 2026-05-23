import { test, expect } from '@playwright/test';
import { AppEnv, errorPage404Suites } from './suites';
import appConfig from '../../../utilities/serviceConfigs';

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

test.describe('errorPage404', () => {
  test.describe('canonical status checks', () => {
    errorPage404Suites.canonical.forEach(testSuite => {
      test(`${testSuite.service}${testSuite.variant ? ` (${testSuite.variant})` : ''} returns 404 HTML`, async ({
        request,
      }) => {
        test.skip(
          !shouldRunForEnv(testSuite.runforEnv),
          `Skipped for APP_ENV=${appEnvFromProcess}`,
        );

        const response = await request.get(`${baseURL}${testSuite.path}`);
        const contentType = response.headers()['content-type'] || '';

        expect(
          response.status(),
          `Unexpected status for ${testSuite.path}`,
        ).toBe(404);
        expect(
          contentType,
          `Unexpected content-type for ${testSuite.path}`,
        ).toContain('text/html');
      });
    });
  });

  test.describe('amp status checks', () => {
    errorPage404Suites.amp.forEach(testSuite => {
      test(`${testSuite.service}${testSuite.variant ? ` (${testSuite.variant})` : ''} AMP returns 404 HTML`, async ({
        request,
      }) => {
        test.skip(
          !shouldRunForEnv(testSuite.runforEnv),
          `Skipped for APP_ENV=${appEnvFromProcess}`,
        );

        const response = await request.get(`${baseURL}${testSuite.path}`);
        const contentType = response.headers()['content-type'] || '';

        expect(
          response.status(),
          `Unexpected status for ${testSuite.path}`,
        ).toBe(404);
        expect(
          contentType,
          `Unexpected content-type for ${testSuite.path}`,
        ).toContain('text/html');
      });
    });
  });

  test.describe('canonical UI smoke checks', () => {
    errorPage404Suites.canonical.forEach(testSuite => {
      test(`${testSuite.service}${testSuite.variant ? ` (${testSuite.variant})` : ''} renders a basic 404 page shell`, async ({
        page,
      }) => {
        test.skip(
          !shouldRunForEnv(testSuite.runforEnv),
          `Skipped for APP_ENV=${appEnvFromProcess}`,
        );

        const response = await page.goto(`${baseURL}${testSuite.path}`, {
          waitUntil: 'domcontentloaded',
        });
        const serviceConfig = getServiceConfig(
          testSuite.service,
          testSuite.variant,
        );
        const title = serviceConfig.translations.error[404].title;
        const pageTitle = `${title} - ${serviceConfig.brandName}`;
        const description = title;
        const ctaUrl =
          serviceConfig.translations.error[404].callToActionLinkUrl;

        expect(
          response?.status(),
          `Unexpected page status for ${testSuite.path}`,
        ).toBe(404);
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
  });
});

test.describe('errorPage404', () => {
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
