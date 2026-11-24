/* eslint-disable no-underscore-dangle */
import { test, expect, type Page } from '@playwright/test';
import { liveTvPageSuites } from './suites';
import {
  appEnvFromProcess,
  baseURL,
  shouldRunForEnv,
} from '../../utilities/env';
import assert200HtmlResponse from '../../utilities/response';
import { assertResonancePageView } from '../../specialFeatures/atiAnalytics/assertions';

const getPageTitleFromWindow = (page: Page) =>
  page.evaluate(
    () =>
      (
        window as unknown as {
          __NEXT_DATA__?: {
            props?: { pageProps?: { pageData?: { title?: string } } };
          };
        }
      )?.__NEXT_DATA__?.props?.pageProps?.pageData?.title,
  );

test.describe('liveTvPage', () => {
  liveTvPageSuites.canonical.forEach(testSuite => {
    const suiteName = `${testSuite.service}${
      testSuite.variant ? ` (${testSuite.variant})` : ''
    }`;
    const testLabel = `${baseURL}${testSuite.path}`;

    test.describe(testLabel, () => {
      test.describe(`Tests for ${suiteName} liveTvPage`, () => {
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

        test('should render the Live TV Page with the correct h1', async ({
          page,
        }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await page.goto(`${baseURL}${testSuite.path}`, {
            waitUntil: 'domcontentloaded',
          });

          const expectedHeading = await getPageTitleFromWindow(page);

          expect(
            expectedHeading,
            'expected pageData.title to be present on window.__NEXT_DATA__',
          ).toBeTruthy();

          await expect(page.locator('h1')).toHaveText(
            expectedHeading as string,
          );
        });
      });
    });
  });
});

test.describe('liveTvPage ATI Analytics', () => {
  liveTvPageSuites.ati.forEach(testSuite => {
    const testLabel = `${baseURL}${testSuite.path}`;

    test.describe(testLabel, () => {
      test.describe(`ATI Analytics for ${testSuite.service} liveTvPage`, () => {
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

        test('should send a resonance page view event', async ({ page }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await assertResonancePageView({ page, ...atiProps });
        });
      });
    });
  });
});
