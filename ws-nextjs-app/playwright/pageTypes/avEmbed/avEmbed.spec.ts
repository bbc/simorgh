import { test } from '@playwright/test';
import { avEmbedSuites } from './suites';
import {
  appEnvFromProcess,
  baseURL,
  shouldRunForEnv,
} from '../../utilities/env';
import assert200HtmlResponse from '../../utilities/response';

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
