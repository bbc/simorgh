import { test, expect, type APIRequestContext } from '@playwright/test';
import { livePageSuites } from './suites';
import {
  appEnvFromProcess,
  baseURL,
  shouldRunForEnv,
} from '../../utilities/env';
import {
  assertPageView,
  assertScrollableNavigationComponentView,
  assertScrollableNavigationComponentClick,
  assertDropdownNavigationComponentView,
  assertDropdownNavigationComponentClick,
} from '../../specialFeatures/atiAnalytics/assertions';

const assert200HtmlResponse = async ({
  request,
  path,
}: {
  request: APIRequestContext;
  path: string;
}) => {
  const response = await request.get(`${baseURL}${path}`);
  const contentType = response.headers()['content-type'] || '';

  expect(response.status()).toBe(200);
  expect(contentType).toContain('text/html');
};

test.describe('livePage', () => {
  const allSuites = [...livePageSuites.canonical];

  allSuites.forEach(testSuite => {
    const suiteName = `${testSuite.service}${
      testSuite.variant ? ` (${testSuite.variant})` : ''
    }`;
    const testLabel = `${baseURL}${testSuite.path}`;

    test.describe(testLabel, () => {
      test.describe(`Tests for ${suiteName} livePage`, () => {
        test('should return a 200 status code', async ({ request }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await assert200HtmlResponse({ request, path: testSuite.path });
        });

        test.describe(`${suiteName} Live Page Tests`, () => {
          test('should render a key points summary', async ({ page }) => {
            test.skip(
              !shouldRunForEnv(testSuite.runForEnv),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            await page.goto(`${baseURL}${testSuite.path}`, {
              waitUntil: 'domcontentloaded',
            });

            await expect(page.locator('[data-e2e="key-points"]')).toBeVisible();
          });

          test('should serve webp images from ichef', async ({ page }) => {
            test.skip(
              !shouldRunForEnv(testSuite.runForEnv),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            await page.goto(`${baseURL}${testSuite.path}`, {
              waitUntil: 'domcontentloaded',
            });

            const ichefImages = page.locator('img[src*="ichef."]');
            const count = await ichefImages.count();

            test.skip(count === 0, 'No ichef images on page');

            const sources = await ichefImages.evaluateAll(images =>
              (images as HTMLImageElement[]).map(img =>
                img.getAttribute('src'),
              ),
            );

            sources.forEach(src => {
              expect(src ?? '').toMatch(/\.webp(\?.*)?$/);
            });
          });

          test('should render a media player', async ({ page }) => {
            test.skip(
              !shouldRunForEnv(testSuite.runForEnv),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );
            test.skip(
              !testSuite.hasMediaPlayer,
              'Suite does not contain a media player',
            );

            await page.goto(`${baseURL}${testSuite.path}`, {
              waitUntil: 'domcontentloaded',
            });

            const mediaLoader = page
              .locator('[data-e2e="media-loader__container"]')
              .first();

            await expect(
              mediaLoader.locator('[data-e2e="media-player"]'),
            ).toBeVisible();
            await expect(
              page.locator('smp-toucan-player').first(),
            ).toBeVisible();
          });

          test('should render a visible caption', async ({ page }) => {
            test.skip(
              !shouldRunForEnv(testSuite.runForEnv),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );
            test.skip(
              !testSuite.hasMediaPlayer,
              'Suite does not contain a media player',
            );

            await page.goto(`${baseURL}${testSuite.path}`, {
              waitUntil: 'domcontentloaded',
            });

            await expect(
              page.locator('[data-testid="caption-paragraph"]').first(),
            ).toBeVisible();
          });

          test('should render topic tags and navigate to the correct topic page', async ({
            page,
          }) => {
            test.skip(
              !shouldRunForEnv(testSuite.runForEnv),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );
            test.skip(
              appEnvFromProcess === 'local',
              'Topic tags disabled for local environment',
            );

            await page.goto(`${baseURL}${testSuite.path}`, {
              waitUntil: 'domcontentloaded',
            });

            const topicTagsSection = page.locator(
              "aside[aria-labelledby*='related-topics']",
            );
            const hasTopicTags = await topicTagsSection.isVisible();

            if (!hasTopicTags) return;

            const firstTag = topicTagsSection.locator('a').first();
            const topicTitle = (await firstTag.textContent())?.trim();

            expect(
              topicTitle,
              'first topic tag should have non-empty text',
            ).toBeTruthy();

            await firstTag.click();
            await expect(page.locator('h1')).toContainText(
              topicTitle as string,
            );
          });
        });
      });
    });
  });
});

test.describe('livePage ATI Analytics', () => {
  livePageSuites.ati.forEach(testSuite => {
    const testLabel = `${baseURL}${testSuite.path}`;

    test.describe(testLabel, () => {
      test.describe(`ATI Analytics for ${testSuite.service} livePage`, () => {
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

          await assertScrollableNavigationComponentClick({ page, ...atiProps });
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
      });
    });
  });
});
