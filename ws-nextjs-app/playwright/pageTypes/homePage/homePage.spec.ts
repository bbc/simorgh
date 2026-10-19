import { test, expect, type Page } from '@playwright/test';
import SERVICES_WITH_NEW_NAV from '#app/components/Navigation/config';
import SERVICES from '#app/lib/config/services';
import defaultToggles from '#app/lib/config/toggles';
import appConfig from '../../../utilities/serviceConfigs';
import { homePageSuites } from './suites';
import {
  appEnvFromProcess,
  baseURL,
  shouldRunForEnv,
} from '../../utilities/env';
import assert200HtmlResponse from '../../utilities/response';
import {
  assertBillboardComponentClick,
  assertBillboardComponentView,
  assertDropdownNavigationComponentClick,
  assertDropdownNavigationComponentView,
  assertLiteSiteSummaryComponentToMainSiteClick,
  assertMessageBannerComponentClick,
  assertMessageBannerComponentView,
  assertMostReadComponentClick,
  assertMostReadComponentView,
  assertPageView,
  assertPortraitVideoCarouselComponentView,
  assertPortraitVideoModalComponentView,
  assertRadioScheduleComponentClick,
  assertRadioScheduleComponentView,
  assertResonancePageView,
  assertScrollableNavigationComponentClick,
  assertScrollableNavigationComponentView,
} from '../../specialFeatures/atiAnalytics/assertions';
import { getATIUrls } from '../../specialFeatures/atiAnalytics/helpers';
import type { AtiHomePageTestSuite } from './suites';

type HomePageCuration = {
  visualProminence?: string;
  visualStyle?: string;
  summaries?: Array<{ title?: string }>;
};

type HomePageData = {
  // NOTE: mirrors the (nested) accessor used in the original Cypress test
  pageData?: {
    curations?: HomePageCuration[];
  };
  metadata?: {
    adCampaignKeyword?: string;
  };
};

type HomePageWindow = Window & {
  __NEXT_DATA__?: {
    props?: {
      pageProps?: {
        pageData?: HomePageData;
      };
    };
  };
  _sf_async_config?: unknown;
};

type ServiceToggleConfig = {
  ads?: {
    enabled?: boolean;
  };
};

const togglesBaseUrlByEnv: Record<typeof appEnvFromProcess, string> = {
  local: 'https://web-cdn.test.api.bbci.co.uk',
  test: 'https://web-cdn.test.api.bbci.co.uk',
  live: 'https://web-cdn.api.bbci.co.uk',
};

const canonicalHeaders = {
  'page-type': 'home',
  'BBC-Adverts': 'true',
};

const getServiceConfig = (service: string) =>
  appConfig[service as keyof typeof appConfig]?.default;

const SERVICES_PATTERN = SERVICES.join('|');

const VALID_HREF_REGEX = new RegExp(
  `^https://www\\.bbc\\.com/(?:${SERVICES_PATTERN}|usingthebbc/[^/]+(?:/.*)?|programmes/[a-z0-9]{8,15})(?:/.*)?$`,
);

const excludedNavServices = ['magyarul', 'romania'];

const twoTierNavServices: Record<typeof appEnvFromProcess, string[] | null> = {
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

const getHomePageData = async (page: Page) =>
  page.evaluate(() => {
    // eslint-disable-next-line no-underscore-dangle
    return (window as HomePageWindow).__NEXT_DATA__?.props?.pageProps
      ?.pageData;
  });

const assertUrlValidation = async (page: Page) => {
  const hrefs = await page
    .locator('main a[href^="https://www.bbc.com"]')
    .evaluateAll(links => links.map(link => link.getAttribute('href')));

  hrefs.forEach(href => {
    expect(href).toBeTruthy();
    expect(href).not.toBe('');
    expect(href).toMatch(VALID_HREF_REGEX);
  });
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

const getSecondaryNavItemTexts = async (page: Page) =>
  page
    .locator('[data-e2e="scrollable-nav-secondary"] li a')
    .allTextContents();

const gotoHomePage = async (page: Page, path: string) => {
  await page.setExtraHTTPHeaders(canonicalHeaders);
  await page.goto(`${baseURL}${path}`, { waitUntil: 'domcontentloaded' });
};

const getHomePageServiceToggles = async (
  service: string,
): Promise<ServiceToggleConfig> => {
  if (appEnvFromProcess === 'local') {
    const { ads } = defaultToggles.local;
    return { ads };
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

const atiTestRunner = (testSuite: AtiHomePageTestSuite) => {
  const testLabel = `${baseURL}${testSuite.path}`;

  test.describe(testLabel, () => {
    test.describe(`ATI Analytics for ${testSuite.service} homePage`, () => {
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
        test('should send a resonance page view event', async ({ page }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await assertResonancePageView({ page, ...atiProps });
        });
      }

      if (testSuite.tests.includes('assertBillboardComponentView')) {
        test('should send a view event for the Billboard component', async ({
          page,
        }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await assertBillboardComponentView({ page, ...atiProps });
        });
      }

      if (testSuite.tests.includes('assertBillboardComponentClick')) {
        test('should send a click event for the Billboard component', async ({
          page,
        }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );
          test.slow();

          await assertBillboardComponentClick({ page, ...atiProps });
        });
      }

      if (testSuite.tests.includes('assertScrollableNavigationComponentView')) {
        test('should send a view event for the Scrollable Navigation component', async ({
          page,
        }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await assertScrollableNavigationComponentView({ page, ...atiProps });
        });
      }

      if (
        testSuite.tests.includes('assertScrollableNavigationComponentClick')
      ) {
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

      if (testSuite.tests.includes('assertMessageBannerComponentView')) {
        test('should send a view event for the Message Banner component', async ({
          page,
        }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await assertMessageBannerComponentView({ page, ...atiProps });
        });
      }

      if (testSuite.tests.includes('assertMessageBannerComponentClick')) {
        test('should send a click event for the Message Banner component', async ({
          page,
        }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await assertMessageBannerComponentClick({ page, ...atiProps });
        });
      }

      if (testSuite.tests.includes('assertMostReadComponentView')) {
        test('should send a view event for the Most Read component', async ({
          page,
        }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await assertMostReadComponentView({ page, ...atiProps });
        });
      }

      if (testSuite.tests.includes('assertMostReadComponentClick')) {
        test('should send a click event for the Most Read component', async ({
          page,
        }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await assertMostReadComponentClick({ page, ...atiProps });
        });
      }

      if (testSuite.tests.includes('assertRadioScheduleComponentView')) {
        test('should send a view event for the Radio Schedule component', async ({
          page,
        }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await assertRadioScheduleComponentView({ page, ...atiProps });
        });
      }

      if (testSuite.tests.includes('assertRadioScheduleComponentClick')) {
        test('should send a click event for the Radio Schedule component', async ({
          page,
        }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );
          test.slow();

          await assertRadioScheduleComponentClick({ page, ...atiProps });
        });
      }

      if (
        testSuite.tests.includes('assertPortraitVideoCarouselComponentView')
      ) {
        test('should send a view event for the Portrait Video Carousel component', async ({
          page,
        }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv) ||
              testSuite.applicationType === 'lite',
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await assertPortraitVideoCarouselComponentView({
            page,
            ...atiProps,
          });
        });
      }

      if (testSuite.tests.includes('assertPortraitVideoModalComponentView')) {
        test('should send a view event for the Portrait Video Modal component', async ({
          page,
        }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv) ||
              testSuite.applicationType === 'lite',
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );
          // TODO: PortraitVideoModal's useViewTracker never dispatches a
          // "portrait-video-modal" beacon once the modal opens (confirmed via
          // network capture: the modal renders and the media player loads
          // correctly, but no viewability event is ever sent), unlike every
          // sibling component on the same page using the same mechanism.
          // This is an app-level analytics gap, not a test timing issue.
          test.fixme(
            testSuite.service === 'portuguese',
            'PortraitVideoModal view beacon never fires - see analytics gap above',
          );
          test.slow();

          await assertPortraitVideoModalComponentView({ page, ...atiProps });
        });
      }

      if (
        testSuite.tests.includes(
          'assertLiteSiteSummaryComponentToMainSiteClick',
        )
      ) {
        test('should send a click event for the Lite Site Summary component when navigating to the main site', async ({
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
};

test.describe('homePage', () => {
  homePageSuites.canonical.forEach(testSuite => {
    const testLabel = `${baseURL}${testSuite.path}`;

    test.describe(testLabel, () => {
      test.describe(`Tests for ${testSuite.service} homePage`, () => {
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

        test('all links within <main> element should be a valid World Service URL', async ({
          page,
        }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await gotoHomePage(page, testSuite.path);
          await assertUrlValidation(page);
        });

        test('should have a noscript img tag with the ati url', async ({
          page,
        }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv) || !process.env.SMOKE,
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          const { atiUrl } = getATIUrls(appEnvFromProcess);

          await gotoHomePage(page, testSuite.path);

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
          await gotoHomePage(page, testSuite.path);
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

          await page.setViewportSize({ width: 320, height: 480 });
          await gotoHomePage(page, testSuite.path);
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
          await gotoHomePage(page, testSuite.path);

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

        test('should stay on the same page when the brand link is clicked', async ({
          page,
        }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv) ||
              !shouldTestTwoTierNav(testSuite.service),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await gotoHomePage(page, testSuite.path);
          const initialPathname = new URL(page.url()).pathname;

          await page.locator('a#topPage').click();

          expect(new URL(page.url()).pathname).toBe(initialPathname);
        });

        test('navigates to a new page and secondary nav changes when clicking a non-home item in top nav', async ({
          page,
        }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv) ||
              !shouldTestTwoTierNav(testSuite.service),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await gotoHomePage(page, testSuite.path);

          const primaryNavItems = page.locator(
            '[data-e2e="scrollable-nav"] li',
          );
          const primaryNavItemCount = await primaryNavItems.count();

          test.skip(
            primaryNavItemCount < 2,
            'The primary navigation has fewer than two items',
          );

          const initialPathname = new URL(page.url()).pathname;
          const initialSecondaryNavItemTexts =
            await getSecondaryNavItemTexts(page);

          await primaryNavItems.nth(1).locator('a').click();
          await page.waitForURL(
            url => new URL(url).pathname !== initialPathname,
          );

          expect(await getSecondaryNavItemTexts(page)).not.toEqual(
            initialSecondaryNavItemTexts,
          );
        });

        test('when first item top-nav item is clicked it navigates to the home page and secondary scrollable nav has corresponding items', async ({
          page,
        }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv) ||
              !shouldTestTwoTierNav(testSuite.service),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await gotoHomePage(page, testSuite.path);

          const initialSecondaryNavItemTexts =
            await getSecondaryNavItemTexts(page);

          await page
            .locator('[data-e2e="scrollable-nav"] li')
            .first()
            .locator('a')
            .click();
          await page.waitForURL(url =>
            new URL(url).pathname.includes(`/${testSuite.service}`),
          );

          expect(await getSecondaryNavItemTexts(page)).toEqual(
            initialSecondaryNavItemTexts,
          );
        });

        test.describe('Images', () => {
          test('should have a picture tag around images', async ({
            page,
          }) => {
            test.skip(
              !shouldRunForEnv(testSuite.runForEnv),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            await gotoHomePage(page, testSuite.path);

            const images = page.locator('img:not([data-testid="embed"] img)');
            const imageCount = await images.count();

            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < imageCount; i++) {
              const image = images.nth(i);
              const section = image.locator(
                'xpath=ancestor::section[1]',
              );

              if ((await section.count()) > 0) {
                const testId = await section.getAttribute('data-testid');
                const exceptions = ['message-banner', 'portrait-video-carousel'];

                if (testId && exceptions.some(id => testId.includes(id))) {
                  // eslint-disable-next-line no-continue
                  continue;
                }

                const parentTagName = await image.evaluate(
                  el => el.parentElement?.tagName.toLowerCase(),
                );
                expect(parentTagName).toBe('picture');
              }
            }
          });

          test('should have two sources one with webp and one with fallback jpg/png', async ({
            page,
          }) => {
            test.skip(
              !shouldRunForEnv(testSuite.runForEnv),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            await gotoHomePage(page, testSuite.path);

            const pictures = page.locator('picture');
            const pictureCount = await pictures.count();

            const expectedFileTypes = [/\.webp$/, /\.(jpg|png)$/];

            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < pictureCount; i++) {
              const sources = pictures.nth(i).locator('source');
              await expect(sources).toHaveCount(2);

              const srcSets = await sources.evaluateAll(elements =>
                elements.map(element => element.getAttribute('srcset')),
              );

              srcSets.forEach((srcSet, index) => {
                const urls = (srcSet || '')
                  .split(',')
                  .map(url => url.replace(/\s+\S+$/, ''));

                urls.forEach(url => {
                  expect(url).toMatch(expectedFileTypes[index]);
                });
              });
            }
          });
        });

        test.describe('Billboard', () => {
          test('should display the correct number of items in the curation grid if there is at least 2 summaries', async ({
            page,
          }) => {
            test.skip(
              !shouldRunForEnv(testSuite.runForEnv),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            await page.setViewportSize({ width: 1008, height: 900 });
            await gotoHomePage(page, testSuite.path);

            const pageData = await getHomePageData(page);
            const billboardCurations =
              pageData?.pageData?.curations?.filter(
                curation =>
                  curation.visualProminence === 'MAXIMUM' &&
                  curation.visualStyle === 'BANNER',
              ) || [];

            // eslint-disable-next-line no-restricted-syntax
            for (const [index, curation] of billboardCurations.entries()) {
              const summaries = curation?.summaries || [];
              const expectedNumberOfAdditionalItems = Math.min(
                Math.max(summaries.length - 1, 0),
                4,
              );

              if (summaries.length > 1) {
                const testId = `billboard-${index + 1}`;
                const grid = page.locator(
                  `[data-testid="${testId}"] [data-testid="billboard-curation-grid"]`,
                );

                if (summaries.length > 2) {
                  // eslint-disable-next-line no-await-in-loop
                  await expect(grid.locator('li:visible')).toHaveCount(
                    expectedNumberOfAdditionalItems,
                  );
                } else {
 
                  await expect(grid.locator('div.promo-image')).toHaveCount(1);
                  await expect(grid.locator('div.promo-image')).toBeVisible();

                  await expect(grid.locator('div.promo-text')).toHaveCount(1);
                  await expect(grid.locator('div.promo-text')).toBeVisible();
                }
              }
            }
          });

          test('should not render a curation grid if there is only one summary in the curation', async ({
            page,
          }) => {
            test.skip(
              !shouldRunForEnv(testSuite.runForEnv),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            await gotoHomePage(page, testSuite.path);

            const pageData = await getHomePageData(page);
            const billboardCurations =
              pageData?.pageData?.curations?.filter(
                curation =>
                  curation.visualProminence === 'MAXIMUM' &&
                  curation.visualStyle === 'BANNER',
              ) || [];

            // eslint-disable-next-line no-restricted-syntax
            for (const [index, curation] of billboardCurations.entries()) {
              const summaries = curation?.summaries || [];

              if (summaries.length === 1) {
                const testId = `billboard-${index + 1}`;
                // eslint-disable-next-line no-await-in-loop
                await expect(
                  page
                    .locator(`[data-testid="${testId}"]`)
                    .locator('[data-testid="billboard-curation-grid"]'),
                ).toHaveCount(0);
              }
            }
          });
        });

        test.describe('Canonical Ads', () => {
          test('should be displayed based on whether ads toggle is enabled/disabled', async ({
            page,
          }) => {
            test.skip(
              !shouldRunForEnv(testSuite.runForEnv) ||
                appEnvFromProcess !== 'local',
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            const serviceName =
              getServiceConfig(testSuite.service)?.service ??
              testSuite.service;
            const toggles = await getHomePageServiceToggles(serviceName);

            await gotoHomePage(page, testSuite.path);

            if (!toggles.ads?.enabled) {
              return;
            }

            const pageData = await getHomePageData(page);
            const adCampaignKeyword = pageData?.metadata?.adCampaignKeyword;

            await expect(
              page.locator('head script[src*="dotcom-bootstrap.js"]'),
            ).toHaveCount(1);

            const scriptContents = await page
              .locator('head script[type="text/javascript"]')
              .allTextContents();

            expect(scriptContents.some(script => script.includes('pageAds: true'))).toBe(
              true,
            );

            if (adCampaignKeyword) {
              expect(
                scriptContents.some(script =>
                  script.includes(`adcampaign: '${adCampaignKeyword}'`),
                ),
              ).toBe(true);
            }

            await expect(
              page.locator(
                '[data-e2e="advertisement"] [id="dotcom-leaderboard"]',
              ),
            ).toHaveCount(1);
            await expect(
              page.locator('[data-e2e="advertisement"] [id="dotcom-mpu"]'),
            ).toHaveCount(1);
          });
        });

        test.describe('Chartbeat', () => {
          test('should have a script with src value set to chartbeat source', async ({
            page,
          }) => {
            test.skip(
              !shouldRunForEnv(testSuite.runForEnv),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            await gotoHomePage(page, testSuite.path);

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

            await gotoHomePage(page, testSuite.path);

            const hasChartbeatConfig = await page.evaluate(
              () => !!(window as HomePageWindow)._sf_async_config,
            );

            expect(hasChartbeatConfig).toBe(true);
          });
        });
      });
    });
  });
});

test.describe('homePage ATI Analytics', () => {
  homePageSuites.ati.forEach(atiTestRunner);
});

test.describe('homePage ATI Analytics Lite', () => {
  homePageSuites.atiLite.forEach(atiTestRunner);
});
