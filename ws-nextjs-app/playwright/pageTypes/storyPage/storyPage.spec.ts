import { test, expect, type Page } from '@playwright/test';
import type * as axeCore from 'axe-core';
import SERVICES_WITH_NEW_NAV from '#app/components/Navigation/config';
import defaultToggles from '#app/lib/config/toggles';
import { getMostReadEndpoint } from '#lib/utilities/getUrlHelpers/getMostReadUrls';
import serviceNumerals from '#app/components/MostRead/utilities/getServiceNumerals';
import type { Services } from '#app/models/types/global';
import appConfig from '../../../utilities/serviceConfigs';
import {
  appEnvFromProcess,
  baseURL,
  shouldRunForEnv,
} from '../../utilities/env';
import assert200HtmlResponse from '../../utilities/response';
import {
  assertPageView,
  assertResonancePageView,
  assertDropdownNavigationComponentView,
  assertDropdownNavigationComponentClick,
  assertScrollableNavigationComponentView,
  assertScrollableNavigationComponentClick,
} from '../../specialFeatures/atiAnalytics/assertions';
import { getATIUrls } from '../../specialFeatures/atiAnalytics/helpers';
import { storyPageSuites, type AtiStoryPageTestSuite } from './suites';

type ServiceParametersType = {
  service: string;
  path: string;
  pageType?: string;
  variant?: string;
  isAmp?: boolean;
};

type StoryBlock = {
  type: string;
  model?: { blocks?: StoryBlock[]; href?: string };
};

type StoryPageData = {
  metadata?: { adCampaignKeyword?: string; blockTypes?: string[] };
  content?: { model?: { blocks?: StoryBlock[] } };
};

type StoryPageWindow = Window & {
  __NEXT_DATA__?: { props?: { pageProps?: { pageData?: StoryPageData } } };
  axe?: typeof axeCore;
};

type ServiceToggleConfig = {
  ads?: { enabled?: boolean };
  mostRead?: { enabled?: boolean };
};

const canonicalHeaders = { 'page-type': 'article', 'BBC-Adverts': 'true' };
const twoYearsAgo = new Date().getFullYear() - 2;

const getServiceConfig = (service: string, variant = 'default') =>
  appConfig[service as keyof typeof appConfig]?.[variant as 'default'];

const getPageDataFromWindow = (page: Page) =>
  page.evaluate(() => {
    // eslint-disable-next-line no-underscore-dangle
    return (window as StoryPageWindow).__NEXT_DATA__?.props?.pageProps
      ?.pageData;
  });

const fetchToggles = async (service: string): Promise<ServiceToggleConfig> => {
  if (appEnvFromProcess === 'local') return defaultToggles.local;

  const endpoint = new URL(
    process.env.TOGGLES_BFF_PATH || '/fd/ws-toggles',
    appEnvFromProcess === 'live'
      ? 'https://web-cdn.api.bbci.co.uk'
      : 'https://web-cdn.test.api.bbci.co.uk',
  );
  endpoint.searchParams.set('application', 'simorgh');
  endpoint.searchParams.set('service', service);
  const response = await fetch(endpoint, {
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

const checkA11y = async (page: Page) => {
  await expect(page.locator('main')).toBeVisible();
  await expect(page.locator('h1')).toBeVisible();
  await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
  const violations = await page.evaluate(async () => {
    const { axe } = window as StoryPageWindow;
    if (!axe) throw new Error('Accessibility engine failed to load');
    axe.configure({
      rules: [
        {
          id: 'frame-title-unique',
          selector: '*:not([src*="/ws/av-embeds/"])',
        },
        { id: 'frame-title', enabled: false },
        { id: 'aria-hidden-focus', enabled: false },
        { id: 'color-contrast', enabled: false },
      ],
    });
    const result = await axe.run(
      {
        exclude: [
          '.bbc-news-vj-embed-wrapper, [id^="include-"]',
          '[class*=dotcom], [id*=dotcom], amp-ad',
          '[id^="toucan-"]',
          '[id^="hearken-"]',
        ],
      },
      {
        runOnly: {
          type: 'tag',
          values: ['wcag21a', 'wcag21aa', 'wcag2a', 'wcag2aa', 'best-practice'],
        },
      },
    );
    return result.violations;
  });
  expect(violations).toEqual([]);
};

const topicTagsTest = async (page: Page) => {
  const firstVisitedPage = page.url();
  const tags = page.locator('aside[aria-labelledby*="related-topics"] a');
  if ((await tags.count()) === 0) return;
  const topicTitle = await tags.first().innerText();
  await tags.first().click();
  await expect(page.locator('h1')).toContainText(topicTitle);
  await page.goto(firstVisitedPage, { waitUntil: 'domcontentloaded' });
};

const MOST_READ_EXCLUDED_SERVICES = ['news', 'sport', 'newsround', 'ukchina'];

const crossPlatform = ({
  service,
  variant = 'default',
}: ServiceParametersType) => {
  const config = getServiceConfig(service, variant);
  if (
    MOST_READ_EXCLUDED_SERVICES.includes(service) ||
    !config?.mostRead?.hasMostRead
  )
    return;
  const { numberOfItems } = config.mostRead;

  test.describe('Most Read Component', () => {
    test.beforeEach(async () => {
      const toggles = await fetchToggles(service);
      test.skip(!toggles.mostRead?.enabled, 'Most Read is disabled');
    });

    test(`should render ${numberOfItems} items`, async ({ page }) => {
      await page.locator('[data-e2e="most-read"]').scrollIntoViewIfNeeded();
      await expect(page.locator('[data-e2e="most-read"] li')).toHaveCount(
        numberOfItems,
      );
    });

    test('should show correct numerals', async ({ page }) => {
      await page.locator('[data-e2e="most-read"]').scrollIntoViewIfNeeded();
      const expectedMostReadRank = serviceNumerals(service as Services);
      const ranks = page.locator(
        '[data-e2e="most-read"] li span[data-e2e="most-read-rank"]',
      );
      await expect(ranks.first()).toBeVisible();
      await Promise.all(
        (await ranks.all()).map((rank, index) =>
          expect(rank).toHaveText(expectedMostReadRank[index + 1]),
        ),
      );
    });

    test('should have links with href and title', async ({ page }) => {
      await page.locator('[data-e2e="most-read"]').scrollIntoViewIfNeeded();
      const links = page.locator('[data-e2e="most-read"] a');
      await expect(links.first()).toBeVisible();
      await Promise.all(
        (await links.all()).map(async link => {
          await expect(link).toHaveText(/\S/);
          await expect(link).toHaveAttribute('href', /\S/);
        }),
      );
    });
  });
};

const ampOnly = ({ service, variant = 'default' }: ServiceParametersType) => {
  const config = getServiceConfig(service, variant);
  if (
    MOST_READ_EXCLUDED_SERVICES.includes(service) ||
    !config?.mostRead?.hasMostRead
  )
    return;

  test.describe('Most Read Component', () => {
    test('should not render when data fetch fails', async ({
      page,
      context,
    }) => {
      const toggles = await fetchToggles(service);
      test.skip(!toggles.mostRead?.enabled, 'Most Read is disabled');
      const endpoint = new URL(
        getMostReadEndpoint({
          service,
          variant: variant !== 'default' && variant,
          isBff: appEnvFromProcess !== 'local',
        }),
        baseURL,
      );
      const matchesMostReadUrl = (url: URL) =>
        url.pathname === endpoint.pathname &&
        Array.from(endpoint.searchParams).every(
          ([key, value]) => url.searchParams.get(key) === value,
        );

      const fulfilledRequests: string[] = [];
      await context.route(matchesMostReadUrl, async route => {
        await route.fulfill({ status: 404, body: '' });
        fulfilledRequests.push(route.request().url());
      });

      await page.reload({ waitUntil: 'load' });

      const mostRead = page.locator('[data-e2e="most-read"]');
      await mostRead.locator('amp-list').scrollIntoViewIfNeeded();

      await expect.poll(() => fulfilledRequests.length).toBeGreaterThan(0);

      await expect(mostRead.locator('amp-list [fallback]')).toBeVisible();
      await expect(mostRead.locator('li')).toHaveCount(0);
    });
  });
};

const runCanonicalAdsTests = ({ service }: ServiceParametersType) => {
  test.describe('Canonical Ads', () => {
    test('should be displayed based on whether ads toggle is enabled/disabled', async ({
      page,
    }) => {
      const toggles = await fetchToggles(service);
      test.skip(!toggles.ads?.enabled, 'Ads are disabled');
      const pageData = await getPageDataFromWindow(page);
      const adCampaignKeyword = pageData?.metadata?.adCampaignKeyword;
      await expect(
        page.locator('head script[src*="dotcom-bootstrap.js"]'),
      ).toBeAttached();
      const scripts = (
        await page
          .locator('head script[type="text/javascript"]')
          .allTextContents()
      ).join('\n');
      expect(scripts).toContain('pageAds: true');
      if (adCampaignKeyword)
        expect(scripts).toContain(`adcampaign: '${adCampaignKeyword}'`);
      await expect(
        page.locator('[data-e2e="advertisement"] [id="dotcom-leaderboard"]'),
      ).toBeAttached();
      await expect(
        page.locator('[data-e2e="advertisement"] [id="dotcom-mpu"]'),
      ).toBeAttached();
    });
  });
};

const runAMPAdsTests = ({ service }: ServiceParametersType) => {
  test.describe('AMP Ads', () => {
    test('should be displayed based on whether ads toggle is enabled/disabled', async ({
      page,
    }) => {
      const toggles = await fetchToggles(service);
      test.skip(!toggles.ads?.enabled, 'Ads are disabled');
      await expect(
        page.locator('head script[src*="dotcom-bootstrap.js"]'),
      ).toHaveCount(0);
      await expect(
        page.locator('[data-e2e="advertisement"]').first(),
      ).toBeAttached();
      await expect(page.locator('amp-ad').first()).toBeAttached();
    });
  });
};

const hasInformationPageLinkTranslation = ({
  service,
  variant = 'default',
}: ServiceParametersType) =>
  getServiceConfig(service, variant)?.translations?.liteSite
    ?.informationPageLink;

const shouldTestTwoTierNav = (service: string) => {
  if (appEnvFromProcess === 'local') return false;
  if (appEnvFromProcess === 'test')
    return ['arabic', 'tamil'].includes(service);
  return SERVICES_WITH_NEW_NAV.filter(
    serviceName => !['magyarul', 'romania'].includes(serviceName),
  ).includes(service as Services);
};

const gotoStoryPage = async (page: Page, path: string) => {
  const pageUrl = new URL(path, baseURL).href;
  await page.route(
    url => url.href === pageUrl,
    route =>
      route.continue({
        headers: { ...route.request().headers(), ...canonicalHeaders },
      }),
    { times: 1 },
  );
  await page.goto(pageUrl, { waitUntil: 'domcontentloaded' });
};

const isArticleLessThanTwoYearsOld = async (page: Page) => {
  const fullDate = await page
    .locator('main time')
    .first()
    .getAttribute('datetime');
  if (!fullDate) return false;
  const isNewArticle = Number(fullDate.split('-')[0]) > twoYearsAgo;
  return isNewArticle && appEnvFromProcess === 'live';
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
  const links = page.locator(
    '[data-e2e="scrollable-nav"] a, [data-e2e="scrollable-nav-secondary"] ul a',
  );
  expect(await links.count()).toBeGreaterThan(0);
  await Promise.all(
    (await links.all()).map(link => expect(link).toHaveAttribute('href', /\S/)),
  );
};

const atiTestRunner = (testSuite: AtiStoryPageTestSuite) => {
  test.describe(`${baseURL}${testSuite.path}`, () => {
    test.describe(`ATI Analytics for ${testSuite.service} storyPage`, () => {
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

      test.beforeEach(async ({ page }) => {
        test.skip(
          !shouldRunForEnv(testSuite.runForEnv),
          `Skipped for APP_ENV=${appEnvFromProcess}`,
        );

        const cookieAcceptLabel = getServiceConfig(testSuite.service)
          ?.translations?.consentBanner?.cookie?.canonical?.accept;

        if (cookieAcceptLabel) {
          await page.addLocatorHandler(
            page.getByRole('button', {
              name: cookieAcceptLabel,
              exact: true,
            }),
            async button => {
              await button.click();
            },
          );
        }
      });

      if (testSuite.tests.includes('assertPageView')) {
        test('should send a page view event', async ({ page }) => {
          await assertPageView({ page, ...atiProps });
        });
      }
      if (testSuite.tests.includes('assertResonancePageView')) {
        test('should send a resonance page view event', async ({ page }) => {
          await assertResonancePageView({ page, ...atiProps });
        });
      }
      if (testSuite.tests.includes('assertDropdownNavigationComponentView')) {
        test('should send a view event for the Dropdown Navigation component', async ({
          page,
        }) => {
          await assertDropdownNavigationComponentView({ page, ...atiProps });
        });
      }
      if (testSuite.tests.includes('assertDropdownNavigationComponentClick')) {
        test('should send a click event for the Dropdown Navigation component', async ({
          page,
        }) => {
          await assertDropdownNavigationComponentClick({ page, ...atiProps });
        });
      }
      if (testSuite.tests.includes('assertScrollableNavigationComponentView')) {
        test('should send a view event for the Scrollable Navigation component', async ({
          page,
        }) => {
          await assertScrollableNavigationComponentView({ page, ...atiProps });
        });
      }
      if (
        testSuite.tests.includes('assertScrollableNavigationComponentClick')
      ) {
        test('should send a click event for the Scrollable Navigation component', async ({
          page,
        }) => {
          await assertScrollableNavigationComponentClick({ page, ...atiProps });
        });
      }
    });
  });
};

test.describe('storyPage', () => {
  const canonicalAndAmpTestSuites = [
    ...storyPageSuites.canonical.map(testSuite => ({
      ...testSuite,
      isAmp: false,
    })),
    ...storyPageSuites.amp.map(testSuite => ({ ...testSuite, isAmp: true })),
  ];

  canonicalAndAmpTestSuites.forEach(testSuite => {
    test.describe(`${baseURL}${testSuite.path}`, () => {
      test.describe(`Tests for ${testSuite.service} storyPage`, () => {
        test.beforeEach(() => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );
        });

        test('should return a 200 status code', async ({ request }) => {
          await assert200HtmlResponse({
            request,
            path: testSuite.path,
            baseURL,
          });
        });

        test('should have no detectable a11y violations on page load', async ({
          page,
        }) => {
          test.slow();
          await gotoStoryPage(page, testSuite.path);
          await checkA11y(page);
        });

        test('should render topic tags if they are in the json, and they should navigate to correct topic page', async ({
          page,
        }) => {
          test.skip(
            ['sport', 'newsround', 'news'].includes(testSuite.service) ||
              appEnvFromProcess === 'local',
            'Topic tags are disabled for this service or environment',
          );
          await gotoStoryPage(page, testSuite.path);
          await topicTagsTest(page);
        });

        test.describe('Images', () => {
          test.describe.configure({ retries: 3 });
          test('should have webp images on pages', async ({ page }) => {
            await gotoStoryPage(page, testSuite.path);
            const images = page.locator(
              'amp-img[src*="ichef."], img[src*="ichef."]',
            );
            await Promise.all(
              (await images.all()).map(async image => {
                if (await image.isVisible())
                  await expect(image).toHaveAttribute('src', /\.webp$/);
              }),
            );
          });
        });

        test.describe('Recommendations', () => {
          test.beforeEach(async ({ page }) => {
            test.skip(
              appEnvFromProcess !== 'live',
              'Recommendations require live data',
            );
            await gotoStoryPage(page, testSuite.path);
            test.skip(
              !(await isArticleLessThanTwoYearsOld(page)),
              'Requires an article less than two years old',
            );
            const toggles = await fetchToggles(testSuite.service);
            test.skip(!toggles.mostRead?.enabled, 'Most Read is disabled');
            await page
              .locator('[data-e2e="recommendations-heading"]')
              .scrollIntoViewIfNeeded();
          });

          test('Recommendations have images', async ({ page }) => {
            const items = page.locator(
              '[data-e2e="recommendations-heading"] > div > ul > li',
            );
            await expect(items.first()).toBeAttached();
            await Promise.all(
              (await items.all()).map(item =>
                expect(
                  item
                    .locator(
                      `[data-e2e="recommendations-wrapper"] ${testSuite.isAmp ? 'amp-img' : 'img'}`,
                    )
                    .first(),
                ).toHaveAttribute('src', /\S/),
              ),
            );
          });

          test('Recommendations have titles', async ({ page }) => {
            const items = page.locator(
              '[data-e2e="recommendations-heading"] > div > ul > li',
            );
            await expect(items.first()).toBeAttached();
            await Promise.all(
              (await items.all()).map(item =>
                expect(
                  item.locator(
                    '[data-e2e="recommendations-wrapper"] > div > div > a',
                  ),
                ).toHaveText(/\S/),
              ),
            );
          });
        });

        if (!testSuite.isAmp) {
          test('should have a noscript img tag with the ati url', async ({
            page,
          }) => {
            test.skip(!process.env.SMOKE, 'Only run for smoke tests');
            await gotoStoryPage(page, testSuite.path);
            const { atiUrl } = getATIUrls(appEnvFromProcess);
            const noScriptText = await page
              .locator('noscript[id="analytics-noscript"]')
              .textContent();
            expect(noScriptText).toContain(
              `<img height="1px" width="1px" alt="" style="position:absolute" src="${atiUrl}`,
            );
          });

          test('should show two tier navigation on desktop', async ({
            page,
          }) => {
            test.skip(
              !shouldTestTwoTierNav(testSuite.service),
              'Two-tier navigation is not configured',
            );
            await page.setViewportSize({ width: 1008, height: 900 });
            await gotoStoryPage(page, testSuite.path);
            await assertTwoTierNavigation({
              page,
              viewport: { width: 1008, height: 900 },
            });
          });
        }

        test('should show two tier navigation on mobile', async ({ page }) => {
          test.skip(
            !shouldTestTwoTierNav(testSuite.service),
            'Two-tier navigation is not configured',
          );
          await page.setViewportSize({ width: 320, height: 480 });
          await gotoStoryPage(page, testSuite.path);
          await assertTwoTierNavigation({
            page,
            viewport: { width: 320, height: 480 },
          });
          if (testSuite.isAmp) {
            await page.waitForLoadState('load');
            await expect(page.locator('amp-state#menuState')).toHaveClass(
              /i-amphtml-built/,
            );
            const secondary = page.locator(
              'nav [data-e2e="scrollable-nav-secondary"]',
            );
            const dropdown = page.locator('nav [data-e2e="dropdown-nav"] ul');
            await expect(dropdown).toBeHidden();
            await page.locator('nav button').click();
            await expect(dropdown).toBeVisible();
            await expect(secondary).toBeHidden();
          }
        });

        if (!testSuite.isAmp) {
          test('dropdown menu should open and close when the menu button is clicked', async ({
            page,
          }) => {
            test.skip(
              !shouldTestTwoTierNav(testSuite.service),
              'Two-tier navigation is not configured',
            );
            const cookieAcceptLabel = getServiceConfig(testSuite.service)
              ?.translations?.consentBanner?.cookie?.canonical?.accept;
            if (cookieAcceptLabel) {
              await page.addLocatorHandler(
                page.getByRole('button', {
                  name: cookieAcceptLabel,
                  exact: true,
                }),
                async button => {
                  await button.click();
                },
              );
            }
            await page.setViewportSize({ width: 320, height: 480 });
            await gotoStoryPage(page, testSuite.path);
            const menuButton = page
              .locator('nav button[aria-expanded]')
              .first();
            const dropdown = page.locator('nav [data-e2e="dropdown-nav"] ul');
            await expect(
              page.locator('nav [data-e2e="scrollable-nav"]'),
            ).toBeVisible();
            await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
            await expect(dropdown).toBeHidden();
            await menuButton.click();
            await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
            await expect(dropdown).toBeVisible();
            await menuButton.click();
            await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
            await expect(dropdown).toBeHidden();
          });

          test.describe('Include initialisation', () => {
            test.describe.configure({ retries: 3 });
            test('should load the eclipse VJ include successfully', async ({
              page,
            }) => {
              test.skip(
                appEnvFromProcess === 'local' ||
                  !testSuite.path.includes('/mundo/23263889'),
                'Requires the Mundo eclipse asset outside local',
              );
              await gotoStoryPage(page, testSuite.path);
              await expect(
                page.locator('.bbc-news-vj-shadow-dom'),
              ).toBeAttached({ timeout: 20000 });
              await expect(
                page.locator(
                  '#responsive-embed-vjamericas-176-eclipse-lookup-app-core-content',
                ),
              ).toHaveCount(0);
            });

            test.skip('Hearken include is visible on the page - only /mundo/23263889', async ({
              page,
            }) => {
              await gotoStoryPage(page, testSuite.path);
              await expect(
                page
                  .locator(
                    'div[id="hearken-curiosity-14838"] > div div[id*="hearken-embed-module"] div',
                  )
                  .first(),
              ).toBeVisible();
            });

            test.skip('Riddle include is visible on the page - only /mundo/23263889', async ({
              page,
            }) => {
              await gotoStoryPage(page, testSuite.path);
              await expect(
                page
                  .frameLocator(
                    'div[class="riddle-target-initialised"] > iframe',
                  )
                  .locator('body[ng-controller="RiddleEmbedController"]'),
              ).toBeVisible();
            });
          });

          test.describe.skip('Social Embed', () => {
            test.beforeEach(async ({ page }) => {
              await gotoStoryPage(page, testSuite.path);
            });

            test('Lazy loaded tweets enrich', async ({ page }) => {
              const pageData = await getPageDataFromWindow(page);
              const twitterEmbedBlocks = (
                pageData?.content?.model?.blocks ?? []
              ).filter(
                block =>
                  block.type === 'social_embed' &&
                  block.model?.blocks?.[0]?.type === 'twitter',
              );
              test.skip(
                twitterEmbedBlocks.length < 2,
                'Requires multiple tweets',
              );
              const firstTwitterEmbedUrl =
                twitterEmbedBlocks[0].model?.blocks?.[0]?.model?.href;
              const secondTwitterEmbedUrl =
                twitterEmbedBlocks[1].model?.blocks?.[0]?.model?.href;
              await page
                .locator(`[data-e2e="twitter-embed-${firstTwitterEmbedUrl}"]`)
                .scrollIntoViewIfNeeded();
              await expect(page.locator('.twitter-tweet-rendered')).toHaveCount(
                1,
              );
              await page
                .locator(`[data-e2e="twitter-embed-${secondTwitterEmbedUrl}"]`)
                .scrollIntoViewIfNeeded();
              await expect
                .poll(() => page.locator('.twitter-tweet-rendered').count())
                .toBeGreaterThanOrEqual(2);
            });

            test('Lazy loaded instagram posts enrich', async ({ page }) => {
              const pageData = await getPageDataFromWindow(page);
              const instagramEmbedBlocks = (
                pageData?.content?.model?.blocks ?? []
              ).filter(
                block =>
                  block.type === 'social_embed' &&
                  block.model?.blocks?.[0]?.type === 'instagram',
              );
              test.skip(
                instagramEmbedBlocks.length < 3,
                'Requires three Instagram posts',
              );
              const urls = instagramEmbedBlocks
                .slice(0, 3)
                .map(block => block.model?.blocks?.[0]?.model?.href);
              await page
                .locator(`[data-e2e="instagram-embed-${urls[0]}"]`)
                .scrollIntoViewIfNeeded();
              await expect(
                page.locator('.instagram-media-rendered').first(),
              ).toBeVisible();
              await expect
                .poll(() => page.locator('.instagram-media-rendered').count())
                .toBeLessThanOrEqual(2);
              await page
                .locator(`[data-e2e="instagram-embed-${urls[1]}"]`)
                .scrollIntoViewIfNeeded();
              await page
                .locator(`[data-e2e="instagram-embed-${urls[2]}"]`)
                .scrollIntoViewIfNeeded();
              await expect
                .poll(() => page.locator('.instagram-media-rendered').count())
                .toBeGreaterThanOrEqual(3);
            });

            test('link should render if exists on page', async ({ page }) => {
              const pageData = await getPageDataFromWindow(page);
              test.skip(
                !pageData?.metadata?.blockTypes?.includes('social_embed'),
                'No social embed exists',
              );
              const socialEmbed = pageData?.content?.model?.blocks?.find(
                block => block.type === 'social_embed',
              );
              const socialEmbedData = socialEmbed?.model?.blocks?.[0];
              const socialEmbedSource = socialEmbedData?.type;
              const socialEmbedUrl = socialEmbedData?.model?.href;
              await page
                .locator(
                  `[data-e2e="${socialEmbedSource}-embed-${socialEmbedUrl}"]`,
                )
                .scrollIntoViewIfNeeded();
              await expect(
                page
                  .locator(`[href^="#end-of-${socialEmbedSource}-content"]`)
                  .first(),
              ).toBeAttached();
            });
          });
        }

        const parameters = { ...testSuite, pageType: 'STY' };
        test.describe('Most Read and Ads', () => {
          test.beforeEach(async ({ page }) => {
            await gotoStoryPage(page, testSuite.path);
          });
          if (testSuite.isAmp) {
            test.describe('Most Read - Amp', () => {
              test.skip(
                appEnvFromProcess === 'local',
                'AMP Most Read requires remote data',
              );
              ampOnly(parameters);
            });
            if (appEnvFromProcess === 'local') runAMPAdsTests(parameters);
          } else {
            crossPlatform(parameters);
            if (appEnvFromProcess === 'local') runCanonicalAdsTests(parameters);
          }
        });
      });
    });
  });

  storyPageSuites.lite.forEach(testSuite => {
    test.describe(`${baseURL}${testSuite.path}`, () => {
      test.describe(`Tests for ${testSuite.service} storyPage Lite`, () => {
        test.beforeEach(async ({ page }) => {
          test.skip(
            !shouldRunForEnv(testSuite.runForEnv),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );
          await gotoStoryPage(page, testSuite.path);
        });
        test.describe('Lite Site Summary', () => {
          test('Clicking the link to the main site should navigate to canonical site', async ({
            page,
          }) => {
            const link = page.locator('[data-e2e="to-main-site"] a');
            await expect(link).toHaveAttribute('href', /\S/);
            const href = await link.getAttribute('href');
            const destination = new URL(href as string, page.url()).href;
            await link.click();
            await expect(page).toHaveURL(destination);
            expect(page.url()).not.toContain('.lite');
          });

          if (hasInformationPageLinkTranslation(testSuite)) {
            test('Clicking the link to the Information page should navigate to lite site', async ({
              page,
            }) => {
              const link = page.locator('[data-e2e="information-page"] a');
              await expect(link).toHaveAttribute('href', /\S/);
              const href = await link.getAttribute('href');
              const destination = new URL(href as string, page.url()).href;
              expect(destination).toContain('.lite');
              await link.click();
              await expect(page).toHaveURL(destination);
            });
          }
        });
      });
    });
  });

  storyPageSuites.ati.forEach(atiTestRunner);
});
