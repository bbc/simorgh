/* eslint-disable no-underscore-dangle */
import SERVICES_WITH_NEW_NAV from '#app/components/Navigation/config';
import defaultToggles from '#app/lib/config/toggles';
import { test, expect, type Page } from '@playwright/test';
import appConfig from '../../../utilities/serviceConfigs';
import { onDemandTVSuites } from './suites';
import {
  appEnvFromProcess,
  baseURL,
  shouldRunForEnv,
} from '../../utilities/env';
import assert200HtmlResponse from '../../utilities/response';
import {
  assertDropdownNavigationComponentClick,
  assertDropdownNavigationComponentView,
  assertLiteSiteSummaryComponentToMainSiteClick,
  assertPageView,
  assertResonancePageView,
} from '../../specialFeatures/atiAnalytics/assertions';
import { getATIUrls } from '../../specialFeatures/atiAnalytics/helpers';

type OnDemandTVPageData = {
  recentEpisodes?: unknown[];
  mediaBlocks?: Array<{
    model?: {
      availability?: string;
      imageUrl?: string;
    };
  }>;
};

type OnDemandTVWindow = Window & {
  __NEXT_DATA__?: {
    props?: {
      pageProps?: {
        pageData?: OnDemandTVPageData;
      };
    };
  };
  _sf_async_config?: unknown;
};

type ServiceToggleConfig = {
  recentVideoEpisodes?: {
    enabled?: boolean;
    value?: string | number;
  };
};

const togglesBaseUrlByEnv: Record<typeof appEnvFromProcess, string> = {
  local: 'https://web-cdn.test.api.bbci.co.uk',
  test: 'https://web-cdn.test.api.bbci.co.uk',
  live: 'https://web-cdn.api.bbci.co.uk',
};

const getServiceConfig = (service: string) =>
  appConfig[service as keyof typeof appConfig]?.default;

const excludedNavServices = ['magyarul', 'romania'];

const twoTierNavServices: Record<string, string[] | null> = {
  local: null,
  test: ['arabic', 'tamil'],
  live: SERVICES_WITH_NEW_NAV.filter(
    service => !excludedNavServices.includes(service),
  ),
};

const shouldTestTwoTierNav = (service: string) => {
  const serviceName = getServiceConfig(service)?.service ?? service;
  return twoTierNavServices[appEnvFromProcess]?.includes(serviceName) ?? false;
};

const getOnDemandTVPageData = async (page: Page) =>
  page.evaluate(() => {
    return (window as OnDemandTVWindow).__NEXT_DATA__?.props?.pageProps
      ?.pageData;
  });

const getEpisodeAvailability = (pageData?: OnDemandTVPageData) =>
  pageData?.mediaBlocks?.[0]?.model?.availability === 'available';

const videoPlaceholderImageUrl = (pageData?: OnDemandTVPageData) => {
  const imageUrl = pageData?.mediaBlocks?.[0]?.model?.imageUrl;
  return imageUrl ? `https://${imageUrl}` : null;
};

const getOnDemandTVServiceToggles = async (
  service: string,
): Promise<ServiceToggleConfig> => {
  if (appEnvFromProcess === 'local') {
    return {
      recentVideoEpisodes: defaultToggles.local.recentVideoEpisodes,
    };
  }

  const fallbackTogglesEndpoint = new URL(
    '/fd/ws-toggles',
    togglesBaseUrlByEnv[appEnvFromProcess],
  );
  fallbackTogglesEndpoint.searchParams.set('application', 'simorgh');
  fallbackTogglesEndpoint.searchParams.set('service', service);

  const togglesEndpoint = process.env.TOGGLES_BFF_PATH
    ? `${process.env.TOGGLES_BFF_PATH}?application=simorgh&service=${service}`
    : fallbackTogglesEndpoint.toString();

  const response = await fetch(togglesEndpoint, {
    headers:
      appEnvFromProcess === 'live' ? undefined : { 'ctx-service-env': 'test' },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch toggles for ${service}: ${response.status}`,
    );
  }

  const data = (await response.json()) as {
    data?: { toggles?: ServiceToggleConfig };
    toggles?: ServiceToggleConfig;
  };

  return data.data?.toggles ?? data.toggles ?? {};
};

const assertTwoTierNavigation = async ({
  page,
  viewport,
}: {
  page: Page;
  viewport: { width: number; height: number };
}) => {
  await page.setViewportSize(viewport);

  await expect(page.locator('[data-e2e="scrollable-nav"]')).toBeVisible();
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
};

test.describe('onDemandTV', () => {
  const allSuites = [...onDemandTVSuites.canonical, ...onDemandTVSuites.lite];

  allSuites.forEach(testSuite => {
    const isLite = testSuite.path.endsWith('.lite');
    const testLabel = `${baseURL}${testSuite.path}`;

    test.describe(testLabel, () => {
      test.describe(
        `Tests for ${testSuite.service} onDemandTV${isLite ? ' - isLite' : ''}`,
        () => {
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

          if (!isLite) {
            test('should render a valid media player', async ({ page }) => {
              test.skip(
                !shouldRunForEnv(testSuite.runForEnv),
                `Skipped for APP_ENV=${appEnvFromProcess}`,
              );

              await page.goto(`${baseURL}${testSuite.path}`, {
                waitUntil: 'domcontentloaded',
              });

              const pageData = await getOnDemandTVPageData(page);
              test.skip(
                !getEpisodeAvailability(pageData),
                `Episode is not available: ${testSuite.path}`,
              );

              await expect(
                page.locator('[data-e2e="media-loader__container"]'),
              ).toBeVisible();

              const placeholderImage = page.locator(
                '[data-e2e="media-loader__placeholder"] div img',
              );

              await expect(placeholderImage).toBeVisible();
              const src = await placeholderImage.getAttribute('src');
              const expectedSrc = videoPlaceholderImageUrl(pageData);

              expect(src).toBeTruthy();
              expect(src).toBe(expectedSrc);
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
                () => !!(window as OnDemandTVWindow)._sf_async_config,
              );

              expect(hasChartbeatConfig).toBe(true);
            });
          }

          test('should be displayed if the toggle is on, and shows the expected number of items', async ({
            page,
          }) => {
            test.skip(
              !shouldRunForEnv(testSuite.runForEnv),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            const toggles = await getOnDemandTVServiceToggles(testSuite.service);
            const recentEpisodesEnabled = toggles?.recentVideoEpisodes?.enabled;

            const recentEpisodesMaxNumber = parseInt(
              String(toggles?.recentVideoEpisodes?.value ?? '0'),
              10,
            );

            await page.goto(`${baseURL}${testSuite.path}`, {
              waitUntil: 'domcontentloaded',
            });

            const recentEpisodesList = page.locator(
              '[data-e2e="recent-episodes-list"]',
            );

            if (recentEpisodesEnabled) {
              const pageData = await getOnDemandTVPageData(page);
              const recentEpisodes = pageData?.recentEpisodes;

              if ((recentEpisodes?.length ?? 0) > 1 && recentEpisodesMaxNumber > 1) {
                await expect(recentEpisodesList).toBeVisible();

                const renderedCount = await recentEpisodesList
                  .locator('[data-e2e="recent-episodes-list-item"]')
                  .count();

                expect(renderedCount).toBeLessThanOrEqual(recentEpisodesMaxNumber);
                return;
              }

              return;
            }

            await expect(recentEpisodesList).toHaveCount(0);
          });

          if (!isLite) {
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

              await page.goto(`${baseURL}${testSuite.path}`, {
                waitUntil: 'domcontentloaded',
              });

              await assertTwoTierNavigation({
                page,
                viewport: { width: 1008, height: 900 },
              });
            });

            test('should show two tier navigation on mobile', async ({ page }) => {
              test.skip(
                !shouldRunForEnv(testSuite.runForEnv) ||
                  !shouldTestTwoTierNav(testSuite.service),
                `Skipped for APP_ENV=${appEnvFromProcess}`,
              );

              await page.goto(`${baseURL}${testSuite.path}`, {
                waitUntil: 'domcontentloaded',
              });

              await assertTwoTierNavigation({
                page,
                viewport: { width: 320, height: 480 },
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

              const menuButton = page.locator('nav button[aria-expanded]').first();

              await expect(
                page.locator('nav [data-e2e="scrollable-nav"]'),
              ).toBeVisible();
              await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
              await expect(
                page.locator('nav [data-e2e="dropdown-nav"] ul'),
              ).not.toBeVisible();

              await menuButton.click();
              await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
              await expect(
                page.locator('nav [data-e2e="dropdown-nav"] ul'),
              ).toBeVisible();

              await menuButton.click();
              await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
              await expect(
                page.locator('nav [data-e2e="dropdown-nav"] ul'),
              ).not.toBeVisible();
            });
          }
        },
      );
    });
  });
});

test.describe('onDemandTV ATI Analytics', () => {
  onDemandTVSuites.ati.forEach(testSuite => {
    const testLabel = `${baseURL}${testSuite.path}`;

    test.describe(testLabel, () => {
      test.describe(`ATI Analytics for ${testSuite.service} onDemandTV`, () => {
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

        if (testSuite.tests.includes('assertPageView')) {
          test('should send a page view event', async ({ page }) => {
            test.skip(
              !shouldRunForEnv(testSuite.runForEnv),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            await assertPageView({ page, ...atiProps });
          });
        }

        if (testSuite.tests.includes('assertResonancePageView')) {
          test('should send a resonance page view event when applicable', async ({
            page,
          }) => {
            test.skip(
              !shouldRunForEnv(testSuite.runForEnv),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            await assertResonancePageView({ page, ...atiProps });
          });
        }

        if (testSuite.tests.includes('assertDropdownNavigationComponentView')) {
          test('should send a view event for the Dropdown Navigation component', async ({
            page,
          }) => {
            test.skip(
              !shouldRunForEnv(testSuite.runForEnv),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            await assertDropdownNavigationComponentView({ page, ...atiProps });
          });
        }

        if (testSuite.tests.includes('assertDropdownNavigationComponentClick')) {
          test('should send a click event for the Dropdown Navigation component', async ({
            page,
          }) => {
            test.skip(
              !shouldRunForEnv(testSuite.runForEnv),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            await assertDropdownNavigationComponentClick({ page, ...atiProps });
          });
        }
      });
    });
  });
});

test.describe('onDemandTV ATI Analytics Lite', () => {
  onDemandTVSuites.atiLite.forEach(testSuite => {
    const testLabel = `${baseURL}${testSuite.path}`;

    test.describe(testLabel, () => {
      test.describe(`ATI Analytics Lite for ${testSuite.service} onDemandTV`, () => {
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

        if (testSuite.tests.includes('assertPageView')) {
          test('should send a page view event', async ({ page }) => {
            test.skip(
              !shouldRunForEnv(testSuite.runForEnv),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            await assertPageView({ page, ...atiProps });
          });
        }

        if (testSuite.tests.includes('assertResonancePageView')) {
          test('should send a resonance page view event when applicable', async ({
            page,
          }) => {
            test.skip(
              !shouldRunForEnv(testSuite.runForEnv),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            await assertResonancePageView({ page, ...atiProps });
          });
        }

        if (
          testSuite.tests.includes('assertDropdownNavigationComponentView')
        ) {
          test('should send a view event for the Dropdown Navigation component', async ({
            page,
          }) => {
            test.skip(
              !shouldRunForEnv(testSuite.runForEnv),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            await assertDropdownNavigationComponentView({ page, ...atiProps });
          });
        }

        if (
          testSuite.tests.includes('assertDropdownNavigationComponentClick')
        ) {
          test('should send a click event for the Dropdown Navigation component', async ({
            page,
          }) => {
            test.skip(
              !shouldRunForEnv(testSuite.runForEnv),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            await assertDropdownNavigationComponentClick({ page, ...atiProps });
          });
        }

        if (
          testSuite.tests.includes('assertLiteSiteSummaryComponentToMainSiteClick')
        ) {
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
        }
      });
    });
  });
});