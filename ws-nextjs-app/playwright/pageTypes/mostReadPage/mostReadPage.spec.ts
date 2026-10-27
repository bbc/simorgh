import { test } from '@playwright/test';
import { mostReadPageSuites } from './suites';
import {
  appEnvFromProcess,
  baseURL,
  shouldRunForEnv,
} from '../../utilities/env';
import assert200HtmlResponse from '../../utilities/response';
import {
  assertPageView,
  assertScrollableNavigationComponentView,
  assertScrollableNavigationComponentClick,
  assertDropdownNavigationComponentView,
  assertDropdownNavigationComponentClick,
  assertMostReadComponentView,
  assertMostReadComponentClick,
  assertLiteSiteSummaryComponentToMainSiteClick,
} from '../../specialFeatures/atiAnalytics/assertions';

test.describe('mostReadPage', () => {
  const allSuites = [
    ...mostReadPageSuites.canonical,
    ...mostReadPageSuites.lite,
  ];

  allSuites.forEach(testSuite => {
    const testLabel = `${baseURL}${testSuite.path}`;

    test.describe(testLabel, () => {
      test.describe(`Tests for ${testSuite.service} mostReadPage`, () => {
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
      });
    });
  });
});

test.describe('mostReadPage ATI Analytics', () => {
  mostReadPageSuites.ati.forEach(testSuite => {
    const testLabel = `${baseURL}${testSuite.path}`;

    test.describe(testLabel, () => {
      test.describe(`ATI Analytics for ${testSuite.service} mostReadPage`, () => {
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

        test('should send a view event for the Scrollable Navigation component', async ({
          page,
        }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await assertScrollableNavigationComponentView({ page, ...atiProps });
        });

        test('should send a click event for the Scrollable Navigation component', async ({
          page,
        }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await assertScrollableNavigationComponentClick({
            page,
            ...atiProps,
          });
        });

        test('should send a view event for the Dropdown Navigation component', async ({
          page,
        }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await assertDropdownNavigationComponentView({ page, ...atiProps });
        });

        test('should send a click event for the Dropdown Navigation component', async ({
          page,
        }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await assertDropdownNavigationComponentClick({ page, ...atiProps });
        });

        test('should send a view event for the Most Read component', async ({
          page,
        }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await assertMostReadComponentView({ page, ...atiProps });
        });

        test('should send a click event for the Most Read component', async ({
          page,
        }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await assertMostReadComponentClick({ page, ...atiProps });
        });
      });
    });
  });
});

test.describe('mostReadPage ATI Analytics Lite', () => {
  mostReadPageSuites.atiLite.forEach(testSuite => {
    const testLabel = `${baseURL}${testSuite.path}`;

    test.describe(testLabel, () => {
      test.describe(`ATI Analytics Lite for ${testSuite.service} mostReadPage`, () => {
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

        test('should send a view event for the Scrollable Navigation component', async ({
          page,
        }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await assertScrollableNavigationComponentView({
            page,
            ...atiProps,
          });
        });

        test('should send a click event for the Scrollable Navigation component', async ({
          page,
        }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await assertScrollableNavigationComponentClick({
            page,
            ...atiProps,
          });
        });

        test('should send a view event for the Most Read component', async ({
          page,
        }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await assertMostReadComponentView({ page, ...atiProps });
        });

        test('should send a click event for the Most Read component', async ({
          page,
        }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await assertMostReadComponentClick({ page, ...atiProps });
        });

        test('should send a click event for the Lite Site Summary component to main site link', async ({
          page,
        }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await assertLiteSiteSummaryComponentToMainSiteClick({
            page,
            ...atiProps,
          });
        });
      });
    });
  });
});
