/* eslint-disable no-underscore-dangle */
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { expect, test, type Page } from '@playwright/test';
import type * as axeCore from 'axe-core';
import type {
  AresMediaMetadataBlock,
  CaptionBlock,
} from '#app/components/MediaLoader/types';
import SERVICES_WITH_NEW_NAV from '#app/components/Navigation/config';
import serviceNumerals from '#app/components/MostRead/utilities/getServiceNumerals';
import type { Services } from '#app/models/types/global';
import type {
  Article,
  ArticleContent,
  OptimoBlock,
  SecondaryColumn,
} from '#app/models/types/optimo';
import { getMostReadEndpoint } from '#lib/utilities/getUrlHelpers/getMostReadUrls';
import defaultToggles from '#app/lib/config/toggles';
import appConfig from '../../../utilities/serviceConfigs';
import envConfig, {
  type EnvironmentConfigType,
} from '../../../cypress/support/config/envs';
import { getATIUrls } from '../../specialFeatures/atiAnalytics/helpers';
import {
  articlePageSuites,
  type ArticlePageAtiTestSuite,
  type ArticlePageTestSuite,
} from './suites';
import {
  appEnvFromProcess,
  baseURL,
  shouldRunForEnv,
} from '../../utilities/env';
import assert200HtmlResponse from '../../utilities/response';
import scrollToOnwardJourney from '../../utilities/onwardJourneys';
import {
  assertArticleLinksBlockComponentClick,
  assertArticleLinksBlockComponentView,
  assertArticleLiteSiteLinkComponentClick,
  assertArticleLiteSiteLinkComponentView,
  assertContinueReadingButtonComponentClick,
  assertContinueReadingButtonComponentView,
  assertFeaturesAnalysisComponentClick,
  assertFeaturesAnalysisComponentView,
  assertLatestMediaComponentClick,
  assertLatestMediaComponentView,
  assertLiteSiteSummaryComponentToMainSiteClick,
  assertMostReadComponentClick,
  assertMostReadComponentView,
  assertPageView,
  assertPodcastPromoComponentClick,
  assertPodcastPromoComponentView,
  assertRelatedContentComponentClick,
  assertRelatedContentComponentView,
  assertRelatedTopicsComponentClick,
  assertRelatedTopicsComponentView,
  assertResonancePageView,
  assertSocialEmbedComponentClick,
  assertSocialEmbedComponentView,
  assertTopBarOJComponentClick,
  assertTopBarOJComponentView,
  assertTopStoriesComponentClick,
  assertTopStoriesComponentView,
} from '../../specialFeatures/atiAnalytics/assertions';
import type { AtiAssertionFnProps } from '../../specialFeatures/atiAnalytics/assertions';

type ArticlePageWindow = Window & {
  axe?: typeof axeCore;
  __NEXT_DATA__?: {
    props?: {
      pageProps?: {
        pageData?: Article;
      };
    };
  };
};

type ServiceToggleConfig = {
  articleLiteSiteLink?: { enabled?: boolean };
  continueReadingButton?: { enabled?: boolean };
  mostRead?: { enabled?: boolean };
};

type LocalMostReadFixture = {
  data?: { items?: unknown[] };
};

type LocalArticleFixture = {
  data?: {
    secondaryData?: {
      mostRead?: { items?: unknown[] } | null;
      latestMedia?: SecondaryColumn['latestMedia'] | null;
    };
  };
};

type ArticlePageDataWithMostRead = Article & {
  mostRead?: { items?: unknown[] } | null;
};

const canonicalHeaders = { 'page-type': 'article', 'BBC-Adverts': 'true' };
test.use({
  serviceWorkers: appEnvFromProcess === 'local' ? 'block' : 'allow',
});
const servicesWithFigure = ['arabic', 'news', 'pashto', 'persian', 'urdu'];
const servicesWithTimestamp = ['news', 'urdu'];
const knownMediaArticleIds = [
  'cgwk9w4zlg8o',
  'cj7xrxz0e8zo',
  'c25rp5glj5qo',
  'cwl08rd38l6o',
  'cej3lzd5e0go',
];

const getServiceConfig = (suite: ArticlePageTestSuite) =>
  appConfig[suite.service as keyof typeof appConfig]?.[
    (suite.variant ?? 'default') as 'default'
  ];

const getArticleDataFromWindow = (page: Page) =>
  page.evaluate(
    () =>
      (window as ArticlePageWindow).__NEXT_DATA__?.props?.pageProps?.pageData,
  );

const getBlockByType = <T>(blocks: OptimoBlock[], blockType: string) =>
  blocks.find((block: OptimoBlock) => block.type === blockType) as
    | T
    | undefined;

const getBlockData = <T = ArticleContent>(
  blockType: string,
  articleData: Article | undefined,
) => {
  const blocks = articleData?.content?.model?.blocks;
  return blocks ? getBlockByType<T>(blocks, blockType) : undefined;
};

const getImageCaptionText = (articleData: Article | undefined) => {
  const imageData = getBlockData('image', articleData);
  const captionBlock = imageData?.model?.blocks
    ? getBlockByType<CaptionBlock>(imageData.model.blocks, 'caption')
    : undefined;
  if (!captionBlock) return undefined;

  const captionContent = captionBlock.model.blocks[0] as
    | ArticleContent
    | undefined;
  const captionText = captionContent?.model.blocks[0] as
    | AresMediaMetadataBlock
    | undefined;
  return captionText?.model.text;
};

const getVideoGuidanceWarning = (articleData: Article | undefined) => {
  const media = getBlockData('video', articleData);
  const aresMediaBlock = media?.model.blocks[1] as ArticleContent | undefined;
  if (!aresMediaBlock) return undefined;

  const mediaMetadataBlock = aresMediaBlock.model.blocks[0] as
    | AresMediaMetadataBlock
    | undefined;
  return mediaMetadataBlock?.model.versions[0]?.warnings?.long;
};

const getArticleId = (articleData: Article) =>
  articleData.metadata.id.split('article:')[1];

const getVideoPid = (articleData: Article) => {
  const aresMediaBlock = getBlockData('video', articleData)?.model.blocks[1] as
    | ArticleContent
    | undefined;
  if (!aresMediaBlock) return undefined;

  const metadataBlock = aresMediaBlock.model.blocks[0] as
    | AresMediaMetadataBlock
    | undefined;
  return metadataBlock?.model.versions[0]?.versionId;
};

const getVideoEmbedUrl = (
  articleData: Article,
  language: string,
  isAmp = false,
) => {
  const embedBaseUrl = isAmp
    ? (envConfig as EnvironmentConfigType).avEmbedBaseUrlAmp
    : (envConfig as EnvironmentConfigType).avEmbedBaseUrlCanonical;
  const embedUrl = [
    embedBaseUrl,
    'ws/av-embeds/articles',
    getArticleId(articleData),
    getVideoPid(articleData),
    language,
  ].join('/');

  return isAmp ? `${embedUrl}/amp` : embedUrl;
};

const addCanonicalHeadersToPageRequest = async (
  page: Page,
  path: string,
  headers?: Record<string, string>,
) => {
  const pageUrl = new URL(path, baseURL).href;
  await page.route(
    url => url.href === pageUrl,
    route =>
      route.continue({
        headers: {
          ...route.request().headers(),
          ...canonicalHeaders,
          ...headers,
        },
      }),
    { times: 1 },
  );
};

const mockLocalArticleOnwardJourneys = async (page: Page, path: string) => {
  if (appEnvFromProcess !== 'local' || /\.(amp|lite)$/.test(path)) return;
  const [, service, , articleId] = path.split('/');
  const articleFixturePath = resolve(
    process.cwd(),
    '../data',
    service,
    'articles',
    `${articleId}.json`,
  );
  if (!existsSync(articleFixturePath)) return;
  const articleFixture = JSON.parse(
    readFileSync(articleFixturePath, 'utf8'),
  ) as LocalArticleFixture;
  const mostReadFixturePath = resolve(
    process.cwd(),
    '../data',
    service,
    'mostRead/index.json',
  );
  const mostReadFixture = existsSync(mostReadFixturePath)
    ? (JSON.parse(
        readFileSync(mostReadFixturePath, 'utf8'),
      ) as LocalMostReadFixture)
    : undefined;

  await page.route('**/fd/simorgh-bff?*', async route => {
    const url = new URL(route.request().url());
    if (url.searchParams.get('service') !== service) {
      await route.fallback();
      return;
    }
    const onwardJourney = url.searchParams.get('onwardJourney');
    if (onwardJourney === 'mostRead' && mostReadFixture?.data) {
      await route.fulfill({ json: mostReadFixture });
    } else if (
      onwardJourney === 'latestMedia' &&
      url.searchParams.get('id') === articleId &&
      articleFixture.data?.secondaryData?.latestMedia !== undefined
    ) {
      await route.fulfill({
        json: { data: articleFixture.data.secondaryData.latestMedia },
      });
    } else {
      await route.fallback();
    }
  });
};

const hideLocalDevOverlay = async (page: Page) => {
  if (appEnvFromProcess !== 'local') return;
  await page.addInitScript(() => {
    document.addEventListener('DOMContentLoaded', () => {
      const style = document.createElement('style');
      style.textContent = 'nextjs-portal { display: none !important; }';
      document.head.appendChild(style);
    });
  });
};

const gotoArticlePage = async (page: Page, path: string) => {
  const pageUrl = new URL(path, baseURL).href;
  await mockLocalArticleOnwardJourneys(page, path);
  await addCanonicalHeadersToPageRequest(page, path);
  await hideLocalDevOverlay(page);
  await page.goto(pageUrl, { waitUntil: 'domcontentloaded' });
};

const fetchServiceToggles = async (
  service: string,
): Promise<ServiceToggleConfig> => {
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
  const { data: responseData, toggles } = data;
  return responseData?.toggles ?? toggles ?? {};
};

const isToggleEnabled = async (
  service: string,
  toggleName: keyof ServiceToggleConfig,
) => {
  if (service === 'scotland') return true;
  const { [toggleName]: toggle } = await fetchServiceToggles(service);
  return toggle?.enabled ?? false;
};

const checkAccessibility = async (page: Page) => {
  await expect(page.locator('main')).toBeVisible();
  await expect(page.locator('h1')).toBeVisible();
  await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
  const violations = await page.evaluate(async () => {
    const { axe } = window as ArticlePageWindow;
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
    const results = await axe.run(
      {
        exclude: [
          '.bbc-news-vj-embed-wrapper, [id^="include-"]',
          '[class*=dotcom], [id*=dotcom], amp-ad',
          '[id^="toucan-"]',
          '[id^="hearken-"]',
          'nextjs-portal',
        ],
      },
      {
        runOnly: {
          type: 'tag',
          values: ['wcag21a', 'wcag21aa', 'wcag2a', 'wcag2aa', 'best-practice'],
        },
      },
    );
    return results.violations;
  });
  expect(violations).toEqual([]);
};

const checkWebpImages = async (page: Page) => {
  const images = page.locator('amp-img[src*="ichef."], img[src*="ichef."]');
  const sources = await images
    .filter({ visible: true })
    .evaluateAll(elements =>
      elements.map(element => element.getAttribute('src')),
    );
  sources.forEach(src => {
    expect(src).toMatch(/\.webp(?:$|\?)/);
  });
};

const checkTopicTags = async (page: Page) => {
  const firstVisitedUrl = page.url();
  const topicLinks = page.locator('aside[aria-labelledby*="related-topics"] a');
  if ((await topicLinks.count()) === 0) return;
  const topicTitle = await topicLinks.first().innerText();
  await topicLinks.first().click();
  await expect(page.locator('h1')).toContainText(topicTitle);
  await page.goto(firstVisitedUrl, { waitUntil: 'domcontentloaded' });
};

const shouldTestTwoTierNavigation = (suite: ArticlePageTestSuite) => {
  const serviceName = getServiceConfig(suite)?.service ?? suite.service;
  const excludedServices = ['magyarul', 'romania'];
  const servicesByEnv = {
    local: null,
    test: ['arabic', 'tamil'],
    live: SERVICES_WITH_NEW_NAV.filter(
      service => !excludedServices.includes(service),
    ),
  };
  return (
    servicesByEnv[appEnvFromProcess]?.includes(serviceName as Services) ?? false
  );
};

const checkTwoTierNavigation = async (
  page: Page,
  viewport: { width: number; height: number },
) => {
  await page.setViewportSize(viewport);
  await expect(page.locator('[data-e2e="scrollable-nav"]')).toBeVisible();
  await expect(
    page.locator('[data-e2e="scrollable-nav-secondary"] ul'),
  ).toBeVisible();
  const hrefs = await page
    .locator(
      '[data-e2e="scrollable-nav"], [data-e2e="scrollable-nav-secondary"] ul',
    )
    .locator('a')
    .evaluateAll(links => links.map(link => link.getAttribute('href')));
  hrefs.forEach(href => expect(href).toBeTruthy());
};

const assertPageMetadata = async (page: Page, suite: ArticlePageTestSuite) => {
  const serviceConfig = getServiceConfig(suite);
  await expect(page.locator('meta[name="article:author"]')).toHaveAttribute(
    'content',
    serviceConfig?.articleAuthor ?? '',
  );
  const linkedData = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll(scripts =>
      scripts.map(script => script.textContent ?? '').join('\n'),
    );
  expect(linkedData).toContain('mainEntityOfPage');
  expect(linkedData).toContain('author');
  expect(linkedData).toContain('headline');
};

const getArticleIdFromPath = (path: string) =>
  path.match(/\/([^/]+?)(?:\.[^/.]+)?$/)?.[1];

const atiAssertionByName = {
  assertPageView,
  assertResonancePageView,
  assertContinueReadingButtonComponentClick,
  assertContinueReadingButtonComponentView,
  assertTopBarOJComponentClick,
  assertTopBarOJComponentView,
  assertArticleLiteSiteLinkComponentClick,
  assertArticleLiteSiteLinkComponentView,
  assertTopStoriesComponentClick,
  assertTopStoriesComponentView,
  assertFeaturesAnalysisComponentClick,
  assertFeaturesAnalysisComponentView,
  assertPodcastPromoComponentClick,
  assertPodcastPromoComponentView,
  assertRelatedTopicsComponentClick,
  assertRelatedTopicsComponentView,
  assertRelatedContentComponentClick,
  assertRelatedContentComponentView,
  assertMostReadComponentClick,
  assertMostReadComponentView,
  assertLatestMediaComponentClick,
  assertLatestMediaComponentView,
  assertSocialEmbedComponentClick,
  assertSocialEmbedComponentView,
  assertArticleLinksBlockComponentClick,
  assertArticleLinksBlockComponentView,
  assertLiteSiteSummaryComponentToMainSiteClick,
} satisfies Record<
  ArticlePageAtiTestSuite['tests'][number],
  (_props: AtiAssertionFnProps) => Promise<void>
>;

const suitesForCurrentEnvironment = <T extends ArticlePageTestSuite>(
  suites: T[],
) => suites.filter(suite => shouldRunForEnv(suite.runForEnv));

const isContinueReadingAssertion = (
  assertionName: ArticlePageAtiTestSuite['tests'][number],
) =>
  assertionName === 'assertContinueReadingButtonComponentView' ||
  assertionName === 'assertContinueReadingButtonComponentClick';

const addPageTests = (
  suite: ArticlePageTestSuite,
  pageKind: 'canonical' | 'amp' | 'lite',
) => {
  const testLabel = `${baseURL}${suite.path}`;

  test.describe(testLabel, () => {
    test('should return a 200 status code and HTML content', async ({
      request,
    }) => {
      await assert200HtmlResponse({ request, path: suite.path, baseURL });
    });

    if (pageKind !== 'lite') {
      test('should have no detectable a11y violations on page load', async ({
        page,
      }) => {
        await gotoArticlePage(page, suite.path);
        await checkAccessibility(page);
      });

      test('should render webp images on the page', async ({ page }) => {
        await gotoArticlePage(page, suite.path);
        await checkWebpImages(page);
      });

      test('should render topic tags when present and navigate to the correct topic', async ({
        page,
      }) => {
        test.skip(
          ['sport', 'newsround', 'news'].includes(suite.service) ||
            appEnvFromProcess === 'local',
          'Topic tag navigation is not enabled for this service/environment',
        );
        await gotoArticlePage(page, suite.path);
        await checkTopicTags(page);
      });

      test('should have the correct article metadata', async ({ page }) => {
        await gotoArticlePage(page, suite.path);
        await assertPageMetadata(page, suite);
      });

      test('should include mainEntityOfPage in the linked data', async ({
        page,
      }) => {
        await gotoArticlePage(page, suite.path);
        const linkedData = await page
          .locator('script[type="application/ld+json"]')
          .evaluateAll(scripts =>
            scripts.map(script => script.textContent ?? '').join('\n'),
          );
        expect(linkedData).toContain('mainEntityOfPage');
        expect(linkedData).toContain('author');
        expect(linkedData).toContain('headline');
      });

      test('should have a valid inline article link', async ({
        page,
        request,
      }) => {
        test.skip(
          !['news', 'afaanoromoo'].includes(suite.service) ||
            appEnvFromProcess === 'live',
          'Inline article link check is limited to selected non-live services',
        );
        await gotoArticlePage(page, suite.path);
        const link = page.locator('a[href*="/articles/"]').first();
        const href = await link.getAttribute('href');
        if (!href) throw new Error('Expected inline article link to have href');
        const response = await request.get(
          new URL(href, page.url()).toString(),
          {
            failOnStatusCode: false,
          },
        );
        expect(response.status()).not.toBe(404);
      });

      if (servicesWithTimestamp.includes(suite.service)) {
        test('should render a timestamp', async ({ page }) => {
          await gotoArticlePage(page, suite.path);
          const timestamp = page.locator('time').first();
          await expect(timestamp).toBeVisible();
          await expect(timestamp).toHaveAttribute('datetime', /\S/);
        });
      }

      if (
        servicesWithFigure.includes(suite.service) &&
        suite.service === 'news'
      ) {
        test('should have a visible image that is not lazyloaded', async ({
          page,
        }) => {
          await gotoArticlePage(page, suite.path);
          const placeholder = page
            .locator('[data-e2e="image-placeholder"]')
            .nth(0);
          await expect(placeholder).toBeVisible();
          await expect(placeholder.locator('img').first()).toBeVisible();
          await expect(
            placeholder.locator('div[class*="lazyload-placeholder"]'),
          ).toHaveCount(0);
        });

        test('should have a lazyloaded image with a noscript fallback', async ({
          page,
        }) => {
          await gotoArticlePage(page, suite.path);
          const placeholder = page
            .locator('[data-e2e="image-placeholder"]')
            .nth(1);
          await placeholder.scrollIntoViewIfNeeded();
          await expect(placeholder).toBeVisible();
          await expect(placeholder.locator('noscript')).toContainText('<img ');
          await expect(
            placeholder.locator('div[class*="lazyload-placeholder"]'),
          ).toHaveCount(1);
        });

        test('should have a visible image with a caption and no lazyload', async ({
          page,
        }) => {
          await gotoArticlePage(page, suite.path);
          const pageData = await getArticleDataFromWindow(page);
          const captionText = getImageCaptionText(pageData);
          const figure = page.locator('figure').first();
          if (captionText) {
            await expect(figure.locator('figcaption')).toContainText(
              captionText,
            );
          } else {
            await expect(figure.locator('figcaption')).toHaveCount(0);
          }
        });

        test('should have no script-loaded image markup in the first figure', async ({
          page,
        }) => {
          await gotoArticlePage(page, suite.path);
          const figure = page.locator('figure').first();
          await expect(figure).toBeVisible();
          await expect(figure.locator('img').first()).toBeVisible();
          await expect(figure.locator('noscript')).toHaveCount(0);
        });
      }

      test('should render the Twitter embed consent flow when the article has an embed', async ({
        page,
      }) => {
        test.skip(getArticleIdFromPath(suite.path) !== 'cw8qv1d11l9o');
        await gotoArticlePage(page, suite.path);
        const embed = page.locator('[data-e2e^="twitter-embed-"]').first();
        await embed.scrollIntoViewIfNeeded();
        await expect(
          embed.locator('[data-testid="consentBanner"]'),
        ).toBeVisible();
        await expect(embed.locator('iframe')).toHaveCount(0);
        await embed.locator('[data-testid="banner-button"]').click();
        await expect(embed.locator('iframe')).toHaveCount(1);
        await expect(
          embed.locator('[href^="#end-of-twitter-content"]'),
        ).toHaveCount(1);
      });

      if (shouldTestTwoTierNavigation(suite)) {
        test('should show two tier navigation on desktop', async ({ page }) => {
          await gotoArticlePage(page, suite.path);
          await checkTwoTierNavigation(page, { width: 1008, height: 900 });
        });
        test('should show two tier navigation on mobile', async ({ page }) => {
          await gotoArticlePage(page, suite.path);
          await checkTwoTierNavigation(page, { width: 320, height: 480 });
        });

        if (pageKind === 'canonical') {
          test('dropdown menu should open and close on mobile', async ({
            page,
          }) => {
            const cookieAcceptLabel =
              getServiceConfig(suite)?.translations?.consentBanner?.cookie
                ?.canonical?.accept;
            if (cookieAcceptLabel) {
              await page.addLocatorHandler(
                page.getByRole('button', {
                  name: cookieAcceptLabel,
                  exact: true,
                }),
                async button => button.click(),
              );
            }
            await page.setViewportSize({ width: 320, height: 480 });
            await gotoArticlePage(page, suite.path);

            const menuButton = page
              .locator('nav button[aria-expanded]')
              .first();
            const dropdown = page.locator('nav [data-e2e="dropdown-nav"] ul');
            await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
            await expect(dropdown).toBeHidden();
            await menuButton.click();
            await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
            await expect(dropdown).toBeVisible();
            await menuButton.click();
            await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
            await expect(dropdown).toBeHidden();
          });
        }
      }
    }

    if (pageKind === 'canonical') {
      if (process.env.SMOKE) {
        test('should have a noscript img tag with the ATI URL', async ({
          page,
        }) => {
          await gotoArticlePage(page, suite.path);
          const { atiUrl } = getATIUrls(appEnvFromProcess);
          const noscriptText = await page
            .locator('noscript[id="analytics-noscript"]')
            .textContent();
          expect(noscriptText).toContain(
            `<img height="1px" width="1px" alt="" style="position:absolute" src="${atiUrl}`,
          );
        });
      }

      test('should include the Chartbeat script and config', async ({
        page,
      }) => {
        await gotoArticlePage(page, suite.path);
        await expect(
          page.locator(
            'script[src="https://static.chartbeat.com/js/chartbeat.js"]',
          ),
        ).toHaveCount(1);
        expect(await page.evaluate(() => '_sf_async_config' in window)).toBe(
          true,
        );
      });

      test('should navigate to the lite site from the article lite site link', async ({
        page,
      }) => {
        test.skip(
          !(await isToggleEnabled(suite.service, 'articleLiteSiteLink')),
        );
        await gotoArticlePage(page, suite.path);
        const link = page.locator('[data-e2e="article-lite-site-link"] a');
        const href = await link.getAttribute('href');
        if (!href) throw new Error('Expected article Lite link to have href');
        await link.click();
        await expect(page).toHaveURL(
          new RegExp(href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
        );
        expect(page.url()).toContain('.lite');
      });

      test.describe('Media Player: Canonical', () => {
        test.beforeEach(() => {
          test.skip(
            appEnvFromProcess !== 'live',
            'Media player assets are only available on live',
          );
        });

        test('should render a visible placeholder image when media is present', async ({
          page,
        }) => {
          await gotoArticlePage(page, suite.path);
          const pageData = await getArticleDataFromWindow(page);
          test.skip(!getBlockData('video', pageData));
          const placeholder = page
            .locator('[data-e2e="media-loader__container"]')
            .first()
            .locator('[data-e2e="media-loader__placeholder"] img');
          await expect(placeholder).toBeVisible();
          await expect(placeholder).toHaveAttribute('src', /\S/);
        });

        test('should render the media player guidance message when present', async ({
          page,
        }) => {
          await gotoArticlePage(page, suite.path);
          const pageData = await getArticleDataFromWindow(page);
          const media = getBlockData('video', pageData);
          test.skip(!media);
          const guidanceWarning = getVideoGuidanceWarning(pageData);
          const guidance = page
            .locator('[data-e2e="media-loader__container"]')
            .first()
            .locator('[data-e2e="media-player__guidance"] strong');
          if (guidanceWarning) {
            await expect(guidance).toBeVisible();
            await expect(guidance).toContainText(guidanceWarning);
          } else {
            await expect(guidance).toHaveCount(0);
          }
        });

        test('should have a visible play button and valid duration when video is present', async ({
          page,
        }) => {
          await gotoArticlePage(page, suite.path);
          const pageData = await getArticleDataFromWindow(page);
          const media = getBlockData('video', pageData);
          test.skip(!media);
          const player = page
            .locator('[data-e2e="media-loader__container"]')
            .first();
          await expect(player.locator('button')).toBeVisible();
          await expect(player.locator('button svg')).toBeVisible();
          await expect(player.locator('button time')).toHaveAttribute(
            'datetime',
            /\S/,
          );
        });

        test('should render a valid Pidgin media embed URL after play', async ({
          page,
          request,
        }) => {
          test.skip(suite.service !== 'pidgin');
          await gotoArticlePage(page, suite.path);
          const pageData = await getArticleDataFromWindow(page);
          const media = getBlockData('video', pageData);
          test.skip(!media);
          const serviceConfig =
            appConfig[suite.service as keyof typeof appConfig]?.default;
          test.skip(!serviceConfig?.lang);
          if (!pageData || !media || !serviceConfig?.lang) return;
          const embedUrl = getVideoEmbedUrl(pageData, serviceConfig.lang);
          await page
            .locator('[data-e2e="media-loader__container"] button')
            .first()
            .click();
          await expect(page.locator('[data-e2e="media-player"]')).toBeVisible();
          const response = await request.get(embedUrl, {
            failOnStatusCode: false,
          });
          expect(response.status()).not.toBe(404);
        });
      });

      test('should reveal article content when Continue Reading is clicked', async ({
        page,
      }) => {
        test.skip(
          !(await isToggleEnabled(suite.service, 'continueReadingButton')),
        );
        await page.setViewportSize({ width: 1000, height: 660 });
        await gotoArticlePage(page, suite.path);
        await page.reload();
        const pageData = await getArticleDataFromWindow(page);
        test.skip(!getBlockData('continueReading', pageData));
        const button = page.locator('#continue-reading-button');
        await expect(button).toBeVisible();
        const hiddenContent = await button.evaluateHandle(
          element => element.nextElementSibling,
        );
        expect(
          await hiddenContent.evaluate(element =>
            element ? getComputedStyle(element).display : null,
          ),
        ).toBe('none');
        await button.evaluate(element =>
          element.scrollIntoView({ block: 'center' }),
        );
        await button.click();
        await expect(button).toBeHidden();
        await expect
          .poll(() =>
            hiddenContent.evaluate(element =>
              element ? getComputedStyle(element).display : 'none',
            ),
          )
          .not.toBe('none');
      });

      test('should show the requested number of Most Read items', async ({
        page,
      }) => {
        const serviceConfig = getServiceConfig(suite);
        test.skip(!serviceConfig?.mostRead?.hasMostRead);
        test.skip(!(await isToggleEnabled(suite.service, 'mostRead')));
        if (!serviceConfig?.mostRead?.hasMostRead) return;
        await gotoArticlePage(page, suite.path);
        const localFixturePath = resolve(
          process.cwd(),
          '../data',
          suite.service,
          'mostRead/index.json',
        );
        const articleId = suite.path.split('/').filter(Boolean)[2];
        const localArticlePath = resolve(
          process.cwd(),
          '../data',
          suite.service,
          'articles',
          `${articleId}.json`,
        );
        const expectedItemCounts = await (async () => {
          if (appEnvFromProcess !== 'local') {
            const pageData = (await getArticleDataFromWindow(page)) as
              | ArticlePageDataWithMostRead
              | undefined;
            const remoteItemCount = pageData?.mostRead?.items?.length;
            return [
              remoteItemCount === undefined
                ? serviceConfig.mostRead.numberOfItems
                : Math.min(
                    remoteItemCount,
                    serviceConfig.mostRead.numberOfItems,
                  ),
              ...(remoteItemCount === undefined ? [] : [remoteItemCount]),
            ];
          }
          if (!existsSync(localFixturePath) || !existsSync(localArticlePath)) {
            return [];
          }
          const localArticle = JSON.parse(
            readFileSync(localArticlePath, 'utf8'),
          ) as LocalArticleFixture;
          if (!localArticle.data?.secondaryData?.mostRead) {
            return [];
          }
          const localFixture = JSON.parse(
            readFileSync(localFixturePath, 'utf8'),
          ) as LocalMostReadFixture;
          const localItemCount = localFixture.data?.items?.length;
          return localItemCount === undefined
            ? []
            : [Math.min(localItemCount, serviceConfig.mostRead.numberOfItems)];
        })();
        test.skip(
          expectedItemCounts.length === 0,
          'No local Most Read fixture exists for this service',
        );
        if (expectedItemCounts.length === 0) return;
        const mostRead = page.locator('[data-e2e="most-read"]');
        await scrollToOnwardJourney({
          page,
          onwardJourney: 'mostRead',
          selector: '[data-e2e="most-read"]',
        });
        await expect(mostRead.locator('li').first()).toBeVisible();
        const actualItemCount = await mostRead.locator('li').count();
        expect(expectedItemCounts).toContain(actualItemCount);
        const ranks = mostRead.locator('li span[data-e2e="most-read-rank"]');
        const rankTexts = await ranks.allTextContents();
        const expectedRanks = serviceNumerals(suite.service as Services);
        rankTexts.forEach((rank, index) => {
          expect(rank).toBe(expectedRanks[index + 1]);
        });
        const links = mostRead.locator('a');
        await Promise.all(
          (await links.all()).map(async itemLink => {
            await expect(itemLink).toHaveAttribute('href', /\S/);
            await expect(itemLink).toHaveText(/\S/);
          }),
        );
      });
    }

    if (pageKind === 'amp') {
      test('should contain an amp-img in the first figure when the service has figures', async ({
        page,
      }) => {
        await gotoArticlePage(page, suite.path);
        if (servicesWithFigure.includes(suite.service)) {
          await expect(
            page.locator('figure').first().locator('amp-img'),
          ).toBeVisible();
        }
      });

      test('should render an AMP media iframe with a valid URL for media articles', async ({
        page,
        request,
      }) => {
        test.skip(
          appEnvFromProcess !== 'live',
          'Media player assets are only available on live',
        );
        const articleId = getArticleIdFromPath(suite.path);
        test.skip(!articleId || !knownMediaArticleIds.includes(articleId));
        await gotoArticlePage(page, suite.path);
        const player = page.locator('[data-e2e="media-player"]');
        await expect(player).toBeVisible();
        const src = await player.getAttribute('src');
        if (!src) throw new Error('Expected AMP media player to have src');
        const response = await request.get(src, { failOnStatusCode: false });
        expect(response.status()).not.toBe(404);
      });

      test('should not render AMP Most Read items after a failed data request', async ({
        page,
        context,
      }) => {
        test.skip(
          appEnvFromProcess === 'local',
          'AMP Most Read failure check is disabled locally',
        );
        const serviceConfig = getServiceConfig(suite);
        test.skip(!serviceConfig?.mostRead?.hasMostRead);
        test.skip(!(await isToggleEnabled(suite.service, 'mostRead')));
        const endpoint = new URL(
          getMostReadEndpoint({
            service: suite.service as Services,
            variant:
              suite.variant && suite.variant !== 'default'
                ? suite.variant
                : false,
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

        await gotoArticlePage(page, suite.path);
        const mostRead = page.locator('[data-e2e="most-read"]');
        await mostRead.locator('amp-list').scrollIntoViewIfNeeded();
        await expect.poll(() => fulfilledRequests.length).toBeGreaterThan(0);
        await expect(mostRead.locator('amp-list [fallback]')).toBeVisible();
        await expect(mostRead.locator('li')).toHaveCount(0);
      });

      if (shouldTestTwoTierNavigation(suite)) {
        test('dropdown menu should open and hide secondary navigation on mobile', async ({
          browser,
        }) => {
          const context = await browser.newContext({
            hasTouch: true,
            viewport: { width: 320, height: 480 },
          });

          try {
            const page = await context.newPage();
            const cookieAcceptLabel =
              getServiceConfig(suite)?.translations?.consentBanner?.cookie
                ?.canonical?.accept;
            if (cookieAcceptLabel) {
              await page.addLocatorHandler(
                page.getByRole('button', {
                  name: cookieAcceptLabel,
                  exact: true,
                }),
                async button => button.click(),
              );
            }
            await gotoArticlePage(page, suite.path);
            await page.waitForLoadState('load');
            await expect(page.locator('amp-state#menuState')).toHaveClass(
              /i-amphtml-built/,
            );

            const secondary = page.locator(
              'nav [data-e2e="scrollable-nav-secondary"]',
            );
            const dropdown = page.locator('nav [data-e2e="dropdown-nav"] ul');
            const menuButton = page.locator('nav button');
            await expect(dropdown).toBeHidden();
            await menuButton.tap();
            await expect(dropdown).toBeVisible();
            await expect(secondary).toBeHidden();
          } finally {
            await context.close();
          }
        });
      }
    }

    if (pageKind === 'lite') {
      test('clicking the link to the main site should navigate to canonical', async ({
        page,
      }) => {
        await gotoArticlePage(page, suite.path);
        const link = page.locator('[data-e2e="to-main-site"] a');
        const href = await link.getAttribute('href');
        if (!href) throw new Error('Expected Lite summary link to have href');
        await link.click();
        await expect(page).toHaveURL(href);
        expect(page.url()).not.toContain('.lite');
      });

      test('clicking the Information page link should stay on the Lite site when translated', async ({
        page,
      }) => {
        const translatedLink =
          getServiceConfig(suite)?.translations?.liteSite?.informationPageLink;
        test.skip(!translatedLink);
        await gotoArticlePage(page, suite.path);
        const link = page.locator('[data-e2e="information-page"] a');
        const href = await link.getAttribute('href');
        if (!href) throw new Error('Expected Information link to have href');
        await link.click();
        await expect(page).toHaveURL(href);
        expect(page.url()).toContain('.lite');
      });
    }
  });
};

suitesForCurrentEnvironment(articlePageSuites.canonical).forEach(suite =>
  addPageTests(suite, 'canonical'),
);
suitesForCurrentEnvironment(articlePageSuites.amp).forEach(suite =>
  addPageTests(suite, 'amp'),
);
suitesForCurrentEnvironment(articlePageSuites.lite).forEach(suite =>
  addPageTests(suite, 'lite'),
);

const atiSuites = suitesForCurrentEnvironment([
  ...articlePageSuites.ati,
  ...articlePageSuites.atiAmp,
  ...articlePageSuites.atiLite,
]);

test.describe('articlePage ATI Analytics', () => {
  atiSuites.forEach(suite => {
    test.describe(`${baseURL}${suite.path}`, () => {
      suite.tests
        .filter(
          assertionName =>
            suite.applicationType === 'responsive' ||
            !isContinueReadingAssertion(assertionName),
        )
        .forEach(assertionName => {
          test(`should run ${assertionName}`, async ({ page }) => {
            const props: AtiAssertionFnProps = {
              page,
              path: suite.path,
              baseURL,
              pageIdentifier: suite.pageIdentifier,
              siteId: suite.siteId,
              applicationType: suite.applicationType,
              contentType: suite.contentType,
              service: suite.service,
              appEnv: appEnvFromProcess,
              expectsResonanceEvents: suite.expectsResonanceEvents,
            };
            await addCanonicalHeadersToPageRequest(
              page,
              suite.path,
              suite.headers,
            );
            await mockLocalArticleOnwardJourneys(page, suite.path);
            await hideLocalDevOverlay(page);
            await atiAssertionByName[assertionName](props);
          });
        });
    });
  });
});
