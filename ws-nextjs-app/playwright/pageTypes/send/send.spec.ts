import {
  test,
  expect,
  type APIRequestContext,
  type Page,
} from '@playwright/test';
import { sendPageSuites } from './suites';
import {
  appEnvFromProcess,
  baseURL,
  shouldRunForEnv,
} from '../../utilities/env';

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

const assertWebpImages = async (page: Page) => {
  const ichefImages = page.locator('img[src*="ichef."]');
  const count = await ichefImages.count();

  test.skip(count === 0, 'No ichef images on page');

  const sources = await ichefImages.evaluateAll(images =>
    (images as HTMLImageElement[]).map(img => img.getAttribute('src')),
  );

  sources.forEach(src => {
    expect(src ?? '').toMatch(/\.webp(\?.*)?$/);
  });
};

const assertTopicTags = async (page: Page) => {
  const topicTagsSection = page.locator(
    "aside[aria-labelledby*='related-topics']",
  );
  const hasTopicTags = await topicTagsSection.isVisible();

  if (!hasTopicTags) return;

  const firstTag = topicTagsSection.locator('a').first();
  const topicTitle = (await firstTag.textContent())?.trim();

  expect(topicTitle, 'first topic tag should have non-empty text').toBeTruthy();

  await firstTag.click();
  await expect(page.locator('h1')).toContainText(topicTitle as string);
};

test.describe('sendPage', () => {
  const allSuites = [...sendPageSuites.canonical, ...sendPageSuites.lite];

  allSuites.forEach(testSuite => {
    const testLabel = `${baseURL}${testSuite.path}`;

    test.describe(testLabel, () => {
      test.describe(`Tests for ${testSuite.service} sendPage`, () => {
        test('should return a 200 status code', async ({ request }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await assert200HtmlResponse({ request, path: testSuite.path });
        });

        test('should serve webp images from ichef', async ({ page }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await page.goto(`${baseURL}${testSuite.path}`, {
            waitUntil: 'domcontentloaded',
          });

          await assertWebpImages(page);
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

          await assertTopicTags(page);
        });
      });
    });
  });
});
