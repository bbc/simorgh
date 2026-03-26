/* eslint-disable cypress/no-async-tests */
import { test, expect } from '@bbc/unified-web-e2e-framework';

test('Verify page title', async ({ page }) => {
  await page.goto('https://www.bbc.co.uk/');
  expect(await page.title()).toBe('BBC - Home');
});

test.describe('Home Page - Arabic', () => {
  test('should load and display expected content', async ({ page }) => {
    await page.goto('/arabic');
    // Replace with actual selectors and checks
    await expect(page.locator('h1')).toHaveText(/BBC News, عربي - الرئيسية/i);
    // Add more assertions as needed
  });
});
