/* eslint-disable no-underscore-dangle, camelcase */
import SERVICES_WITH_NEW_NAV from '#app/components/Navigation/config';
import defaultToggles from '#app/lib/config/toggles';
import { test, expect, type Page } from '@playwright/test';
import appConfig from '../../../utilities/serviceConfigs';
import { liveRadioPageSuites } from './suites';
import {
  appEnvFromProcess,
  baseURL,
  shouldRunForEnv,
} from '../../utilities/env';
import assert200HtmlResponse from '../../utilities/response';
import {
  assertPageView,
  assertRadioScheduleComponentClick,
  assertRadioScheduleComponentView,
} from '../../specialFeatures/atiAnalytics/assertions';
import { getATIUrls } from '../../specialFeatures/atiAnalytics/helpers';

type LiveRadioPageData = {
  radioScheduleData?: unknown;
};

type LiveRadioWindow = Window & {
  __NEXT_DATA__?: {
    props?: {
      pageProps?: {
        pageData?: LiveRadioPageData;
      };
    };
  };
  _sf_async_config?: unknown;
};

type ServiceToggleConfig = {
  liveRadioSchedule?: {
    enabled?: boolean;
  };
};

const togglesUrlByEnv: Record<'local' | 'test' | 'live', string> = {
  local: 'https://config.api.bbci.co.uk/',
  test: 'https://config.test.api.bbci.co.uk/',
  live: 'https://config.test.api.bbci.co.uk/',
};

const twoTierNavServices: Record<string, string[] | null> = {
  local: null,
  test: ['arabic', 'tamil'],
  live: SERVICES_WITH_NEW_NAV,
};

const getServiceConfig = (service: string) =>
  appConfig[service as keyof typeof appConfig]?.default;

const shouldTestTwoTierNav = (service: string) => {
  const serviceName = getServiceConfig(service)?.service ?? service;
  return twoTierNavServices[appEnvFromProcess]?.includes(serviceName) ?? false;
};

const getLiveRadioPageData = async (page: Page) =>
  page.evaluate(() => {
    return (window as LiveRadioWindow).__NEXT_DATA__?.props?.pageProps
      ?.pageData;
  });

const getLiveRadioServiceToggles = async (
  service: string,
): Promise<ServiceToggleConfig> => {
  if (appEnvFromProcess === 'local') {
    return defaultToggles.local as ServiceToggleConfig;
  }

  const togglesUrl = togglesUrlByEnv[appEnvFromProcess];
  const response = await fetch(
    `${togglesUrl}?application=simorgh&service=${service}&__amp_source_origin=${baseURL}`,
    {
      headers: {
        Origin: 'https://www.bbc.com',
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch toggles for ${service}: ${response.status}`,
    );
  }

  const data = (await response.json()) as { toggles?: ServiceToggleConfig };

  return data.toggles ?? {};
};

test.describe('liveRadioPage', () => {
  liveRadioPageSuites.canonical.forEach(testSuite => {
    const testLabel = `${baseURL}${testSuite.path}`;

    test.describe(testLabel, () => {
      test.describe(`Tests for ${testSuite.service} liveRadioPage`, () => {
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

        test('should render a valid media player', async ({ page }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await page.goto(`${baseURL}${testSuite.path}`, {
            waitUntil: 'domcontentloaded',
          });

          await expect(
            page.locator('[data-e2e="media-loader__container"]'),
          ).toBeVisible();
        });

        test('should have a script with src value set to chartbeat source', async ({
          page,
        }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await page.goto(`${baseURL}${testSuite.path}`, {
            waitUntil: 'domcontentloaded',
          });

          await expect(
            page.locator(
              'script[src="https://static.chartbeat.com/js/chartbeat.js"]',
            ),
          ).toHaveCount(1);
        });

        test('should have chartbeat config set to window object', async ({
          page,
        }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await page.goto(`${baseURL}${testSuite.path}`, {
            waitUntil: 'domcontentloaded',
          });

          const hasChartbeatConfig = await page.evaluate(
            () => !!(window as LiveRadioWindow)._sf_async_config,
          );

          expect(hasChartbeatConfig).toBe(true);
        });

        test('should be displayed if there is enough schedule data', async ({
          page,
        }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          const toggles = await getLiveRadioServiceToggles(testSuite.service);

          await page.goto(`${baseURL}${testSuite.path}`, {
            waitUntil: 'domcontentloaded',
          });

          const scheduleIsEnabled = toggles?.liveRadioSchedule?.enabled;
          const pageData = await getLiveRadioPageData(page);
          const hasScheduleData = !!pageData?.radioScheduleData;
          const radioSchedule = page.locator('[data-e2e="radio-schedule"]');

          if (scheduleIsEnabled && hasScheduleData) {
            await expect(radioSchedule).toBeVisible();
            return;
          }

          if (scheduleIsEnabled && !hasScheduleData) {
            return;
          }

          await expect(radioSchedule).toHaveCount(0);
        });

        test('should include mainEntityOfPage in the LinkedData', async () => {
          test.skip(
            true,
            'Skipped: Cypress equivalent is intentionally skipped pending https://github.com/bbc/simorgh/issues/3117',
          );
        });

        test('should have a noscript img tag with the ati url', async ({
          page,
        }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv) || !process.env.SMOKE,
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          const { atiUrl } = getATIUrls(appEnvFromProcess);

          await page.goto(`${baseURL}${testSuite.path}`, {
            waitUntil: 'domcontentloaded',
          });

          const noScriptText = await page
            .locator('noscript[id="analytics-noscript"]')
            .textContent();

          if (noScriptText) {
            expect(noScriptText).toContain(
              `<img height="1px" width="1px" alt="" style="position:absolute" src="${atiUrl}`,
            );
          }
        });

        test('should show two tier navigation on desktop', async ({ page }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv) ||
              !shouldTestTwoTierNav(testSuite.service),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await page.setViewportSize({ width: 1008, height: 900 });
          await page.goto(`${baseURL}${testSuite.path}`, {
            waitUntil: 'domcontentloaded',
          });

          await expect(
            page.locator('[data-e2e="scrollable-nav"]'),
          ).toBeVisible();
          await expect(
            page.locator('[data-e2e="scrollable-nav-secondary"] ul'),
          ).toBeVisible();

          const primaryHrefs = await page
            .locator('[data-e2e="scrollable-nav"] a')
            .evaluateAll(links => links.map(link => link.getAttribute('href')));
          const secondaryHrefs = await page
            .locator('[data-e2e="scrollable-nav-secondary"] ul a')
            .evaluateAll(links => links.map(link => link.getAttribute('href')));

          [...primaryHrefs, ...secondaryHrefs].forEach(href => {
            expect(href).toBeTruthy();
            expect(href).not.toBe('');
          });
        });

        test('should show two tier navigation on mobile', async ({ page }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv) ||
              !shouldTestTwoTierNav(testSuite.service),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await page.setViewportSize({ width: 320, height: 480 });
          await page.goto(`${baseURL}${testSuite.path}`, {
            waitUntil: 'domcontentloaded',
          });

          await expect(
            page.locator('[data-e2e="scrollable-nav"]'),
          ).toBeVisible();
          await expect(
            page.locator('[data-e2e="scrollable-nav-secondary"] ul'),
          ).toBeVisible();

          const primaryHrefs = await page
            .locator('[data-e2e="scrollable-nav"] a')
            .evaluateAll(links => links.map(link => link.getAttribute('href')));
          const secondaryHrefs = await page
            .locator('[data-e2e="scrollable-nav-secondary"] ul a')
            .evaluateAll(links => links.map(link => link.getAttribute('href')));

          [...primaryHrefs, ...secondaryHrefs].forEach(href => {
            expect(href).toBeTruthy();
            expect(href).not.toBe('');
          });
        });

        test('dropdown menu should open and close when the menu button is clicked', async ({
          page,
        }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv) ||
              !shouldTestTwoTierNav(testSuite.service),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await page.setViewportSize({ width: 320, height: 480 });
          await page.goto(`${baseURL}${testSuite.path}`, {
            waitUntil: 'domcontentloaded',
          });

          await expect(
            page.locator('nav [data-e2e="scrollable-nav"]'),
          ).toBeVisible();
          await expect(
            page.locator('nav [data-e2e="dropdown-nav"] ul'),
          ).not.toBeVisible();

          await page.locator('nav button').click({ force: true });
          await expect(
            page.locator('nav [data-e2e="dropdown-nav"] ul'),
          ).toBeVisible();

          await page.locator('nav button').click({ force: true });
          await expect(
            page.locator('nav [data-e2e="dropdown-nav"] ul'),
          ).not.toBeVisible();
        });
      });
    });
  });
});

test.describe('liveRadioPage ATI Analytics', () => {
  liveRadioPageSuites.ati.forEach(testSuite => {
    const testLabel = `${baseURL}${testSuite.path}`;

    test.describe(testLabel, () => {
      test.describe(`ATI Analytics for ${testSuite.service} liveRadioPage`, () => {
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

        test('should send a view event for the Radio Schedule component', async ({
          page,
        }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await assertRadioScheduleComponentView({ page, ...atiProps });
        });

        test('should send a click event for the Radio Schedule component', async ({
          page,
        }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await assertRadioScheduleComponentClick({ page, ...atiProps });
        });
      });
    });
  });
});
