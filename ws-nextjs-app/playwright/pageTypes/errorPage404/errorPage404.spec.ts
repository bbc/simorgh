import { test, expect } from '@playwright/test';
import { AppEnv, errorPage404Suites } from './suites';
import appConfig from '../../../utilities/serviceConfigs';
import { getEnvConfig } from '../../../cypress/support/config/envs';

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
const shouldIncludeStandaloneErrorRoutes = getEnvConfig(
  appEnvFromProcess,
  false,
).standaloneErrorPages;

const getServiceConfig = (service: string, variant?: string) => {
  return appConfig[service as keyof typeof appConfig][variant || 'default'];
};

const assert404HtmlResponse = async ({
  request,
  path,
}: {
  request: Parameters<Parameters<typeof test>[1]>[0]['request'];
  path: string;
}) => {
  const response = await request.get(`${baseURL}${path}`);
  const contentType = response.headers()['content-type'] || '';

  expect(response.status()).toBe(404);
  expect(contentType).toContain('text/html');
};

test.describe('errorPage404', () => {
  const allSuites = [
    ...errorPage404Suites.canonical,
    ...errorPage404Suites.amp,
  ];

  allSuites.forEach(testSuite => {
    const suiteName = `${testSuite.service}${
      testSuite.variant ? ` (${testSuite.variant})` : ''
    }`;
    const testLabel = `${baseURL}${testSuite.path}`;

    test.describe(testLabel, () => {
      test.describe(`Tests for ${suiteName} errorPage404`, () => {
        test('should return a 404 error code', async ({ request }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runforEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await assert404HtmlResponse({ request, path: testSuite.path });
        });

        test.describe(`${suiteName} Error Page Tests`, () => {
          test('should display the expected error title on screen', async ({
            page,
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

            await page.goto(`${baseURL}${testSuite.path}`, {
              waitUntil: 'domcontentloaded',
            });

            await expect(page.locator('h1')).toContainText(title);
          });

          test('should have an inline link to the homepage', async ({
            page,
          }) => {
            test.skip(
              !shouldRunForEnv(testSuite.runforEnv),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            const serviceConfig = getServiceConfig(
              testSuite.service,
              testSuite.variant,
            );
            const ctaUrl =
              serviceConfig.translations.error[404].callToActionLinkUrl;

            await page.goto(`${baseURL}${testSuite.path}`, {
              waitUntil: 'domcontentloaded',
            });

            await expect(page.locator(`a[href="${ctaUrl}"]`)).toBeVisible();
          });

          test('should have correct title and description metadata', async ({
            page,
          }) => {
            test.skip(
              !shouldRunForEnv(testSuite.runforEnv),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            const serviceConfig = getServiceConfig(
              testSuite.service,
              testSuite.variant,
            );
            const description = serviceConfig.translations.error[404].title;
            const title = serviceConfig.translations.error[404].title;
            const pageTitle = `${title} - ${serviceConfig.brandName}`;

            await page.goto(`${baseURL}${testSuite.path}`, {
              waitUntil: 'domcontentloaded',
            });

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
          });

          test('should have lang attribute', async ({ page }) => {
            test.skip(
              !shouldRunForEnv(testSuite.runforEnv),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            const serviceConfig = getServiceConfig(
              testSuite.service,
              testSuite.variant,
            );

            await page.goto(`${baseURL}${testSuite.path}`, {
              waitUntil: 'domcontentloaded',
            });

            await expect(page.locator('html')).toHaveAttribute(
              'lang',
              serviceConfig.lang,
            );
          });
        });

        if (shouldIncludeStandaloneErrorRoutes) {
          test.describe.skip(`${suiteName} error page routes`, () => {
            test(`/${testSuite.service}/404 should have response code 200`, async ({
              request,
            }) => {
              const response = await request.get(
                `${baseURL}/${testSuite.service}/404`,
              );

              expect(response.status()).toBe(200);
            });

            test(`/${testSuite.service}/500 should have response code 200`, async ({
              request,
            }) => {
              const response = await request.get(
                `${baseURL}/${testSuite.service}/500`,
              );

              expect(response.status()).toBe(200);
            });
          });
        }
      });

      test.describe(`Canonical Tests for ${suiteName} errorPage404`, () => {
        test('should return a 404 error code', async ({ request }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runforEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await assert404HtmlResponse({ request, path: testSuite.path });
        });
      });

      test.describe(`Amp Tests for ${suiteName} errorPage404`, () => {
        test('should return a 404 error code', async ({ request }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runforEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await assert404HtmlResponse({
            request,
            path: `${testSuite.path}.amp`,
          });
        });
      });
    });
  });
});
