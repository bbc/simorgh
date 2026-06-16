import { test, expect, type APIRequestContext } from '@playwright/test';
import { avEmbedSuites } from './suites';
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

test.describe('avEmbed', () => {
  avEmbedSuites.canonical.forEach(testSuite => {
    const testLabel = `${baseURL}${testSuite.path}`;

    test.describe(testLabel, () => {
      test.describe(`Tests for ${testSuite.service} avEmbed`, () => {
        test('should return a 200 status code', async ({ request }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await assert200HtmlResponse({ request, path: testSuite.path });
        });
      });
    });
  });
});
