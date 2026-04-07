import { test } from '@bbc/unified-web-e2e-framework';
import { expect } from '@playwright/test';

test('Verify page title', async ({ page }) => {
  await page.goto('https://www.bbc.com');
  expect(await page.title()).toEqual(
    expect.stringMatching(
      /(BBC - Home|BBC Home - Breaking News, World News, US News, Sports, Business, Innovation, Climate, Culture, Travel, Video & Audio)/,
    ),
  );
});
