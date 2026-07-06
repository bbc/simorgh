/* eslint-disable no-underscore-dangle */
import { test, expect, type Page } from '@playwright/test';
import { languagesPageSuites } from './suites';
import {
  appEnvFromProcess,
  baseURL,
  shouldRunForEnv,
  type AppEnv,
} from '../../utilities/env';
import { assertPageView } from '../../specialFeatures/atiAnalytics/assertions';
import assert200HtmlResponse from '../../utilities/response';

const getContentIdFromWindow = (page: Page) =>
  page.evaluate(
    () =>
      (
        window as unknown as {
          __NEXT_DATA__?: {
            props?: {
              pageProps?: {
                pageData?: {
                  metadata?: { atiAnalytics?: { contentId?: string } };
                };
              };
            };
          };
        }
      )?.__NEXT_DATA__?.props?.pageProps?.pageData?.metadata?.atiAnalytics
        ?.contentId,
  );

const expectedUrnByEnv: Record<AppEnv, string> = {
  local: 'urn:bbc:tipo:topic:c6jdzrejj3p3t',
  test: 'urn:bbc:tipo:topic:c6jdzrejj3p3t',
  live: 'urn:bbc:tipo:topic:c1le13lzd2qt',
};

test.describe('languagesPage', () => {
  languagesPageSuites.canonical.forEach(testSuite => {
    const testLabel = `${baseURL}${testSuite.path}`;

    test.describe(testLabel, () => {
      test.describe(`Tests for ${testSuite.service} languagesPage`, () => {
        test('should return a 200 status code', async ({ request }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await assert200HtmlResponse({
            request,
            path: testSuite.path,
            baseURL,
          });
        });

        test('should render the Languages Page with fixture content', async ({
          page,
        }) => {
          test.skip(
            appEnvFromProcess !== 'local',
            'Fixture content check only runs for local environment',
          );

          await page.goto(`${baseURL}${testSuite.path}`, {
            waitUntil: 'domcontentloaded',
          });

          await expect(page.getByText('Youtube - BBC News')).toBeVisible();
        });

        test('should render the WS Languages Page with correct URN', async ({
          page,
        }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await page.goto(`${baseURL}${testSuite.path}`, {
            waitUntil: 'domcontentloaded',
          });

          const contentId = await getContentIdFromWindow(page);
          const expectedUrn = expectedUrnByEnv[appEnvFromProcess];

          expect(contentId, `expected contentId to be ${expectedUrn}`).toBe(
            'urn:force-fail',
          );
        });
      });
    });
  });
});

test.describe('languagesPage ATI Analytics', () => {
  languagesPageSuites.ati.forEach(testSuite => {
    const testLabel = `${baseURL}${testSuite.path}`;

    test.describe(testLabel, () => {
      test.describe(`ATI Analytics for ${testSuite.service} languagesPage`, () => {
        const atiProps = {
          path: testSuite.path,
          baseURL,
          pageIdentifier: testSuite.pageIdentifier,
          siteId: testSuite.siteId,
          applicationType: testSuite.applicationType,
          contentType: testSuite.contentType,
          service: testSuite.service,
          appEnv: appEnvFromProcess,
        };

        test('should send a page view event', async ({ page }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await assertPageView({ page, ...atiProps });
        });
      });
    });
  });
});
