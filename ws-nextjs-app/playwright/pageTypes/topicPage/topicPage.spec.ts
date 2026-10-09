import SERVICES_WITH_NEW_NAV from '#app/components/Navigation/config';
import SERVICES from '#app/lib/config/services';
import idSanitiser from '#src/app/lib/utilities/idSanitiser';
import {
  test,
  expect,
  type Page,
  type APIRequestContext,
} from '@playwright/test';
import appConfig from '../../../utilities/serviceConfigs';
import { topicPageSuites, type TopicPageTestSuite } from './suites';
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
  assertMessageBannerComponentClick,
  assertMessageBannerComponentView,
  assertPageView,
  assertScrollableNavigationComponentClick,
  assertScrollableNavigationComponentView,
} from '../../specialFeatures/atiAnalytics/assertions';
import { getATIUrls } from '../../specialFeatures/atiAnalytics/helpers';

type TopicSummary = {
  title?: string;
  link?: string;
};

type TopicCuration = {
  title?: string;
  visualProminence?: string;
  visualStyle?: string;
  summaries?: TopicSummary[];
};

type TopicPageData = {
  title?: string;
  pageCount?: number;
  curations?: TopicCuration[];
};

type TopicPageState = {
  topicId?: string;
  topicTitle?: string;
  pageCount: number;
  numberOfItems: number;
  firstItemHeadline?: string;
  firstItemLink?: string;
  messageBanner?: TopicCuration;
};

type SkipOptions = {
  requireUrlValidation?: boolean;
  requireTopicTests?: boolean;
  requireCanonicalSharedTests?: boolean;
  requireSmoke?: boolean;
  requireTwoTierNav?: boolean;
  skipLocalEnv?: boolean;
};

type TopicPageWindow = Window & {
  __NEXT_DATA__?: {
    props?: {
      pageProps?: {
        pageData?: TopicPageData;
      };
    };
  };
};

const SERVICES_PATTERN = SERVICES.join('|');

const VALID_HREF_REGEX = new RegExp(
  `^https://www\\.bbc\\.com/(?:${SERVICES_PATTERN}|usingthebbc/[^/]+(?:/.*)?|programmes/[a-z0-9]{8,15})(?:/.*)?$`,
);

const twoTierNavServices: Record<string, string[] | null> = {
  local: null,
  test: ['arabic', 'tamil'],
  live: SERVICES_WITH_NEW_NAV,
};

const getServiceConfig = (service: string, variant?: string) =>
  appConfig[service as keyof typeof appConfig][variant || 'default'];

const getSuiteName = (suite: TopicPageTestSuite) =>
  `${suite.service}${suite.variant ? ` (${suite.variant})` : ''}`;

const resolvePageUrl = (path: string) => new URL(path, baseURL).href;

const getTopicPageData = async (
  page: Page,
): Promise<TopicPageData | undefined> =>
  page.evaluate(() => {
    // eslint-disable-next-line no-underscore-dangle
    return (window as TopicPageWindow).__NEXT_DATA__?.props?.pageProps
      ?.pageData;
  });

const getTopicPageState = async ({
  page,
  path,
}: {
  page: Page;
  path: string;
}): Promise<TopicPageState> => {
  const pageData = await getTopicPageData(page);
  const firstCuration = pageData?.curations?.[0];
  const firstItem = firstCuration?.summaries?.[0];
  const messageBanner = pageData?.curations?.find(
    curation =>
      curation.visualProminence === 'NORMAL' &&
      curation.visualStyle === 'BANNER',
  );

  return {
    topicId: path.match(/(c[a-zA-Z0-9]{10,}t)/)?.[1],
    topicTitle: pageData?.title,
    pageCount: pageData?.pageCount ?? 0,
    numberOfItems: firstCuration?.summaries?.length ?? 0,
    firstItemHeadline: firstItem?.title,
    firstItemLink: firstItem?.link,
    messageBanner,
  };
};

const gotoTopicPage = async ({
  page,
  path,
  viewport,
}: {
  page: Page;
  path: string;
  viewport?: { width: number; height: number };
}) => {
  if (viewport) {
    await page.setViewportSize(viewport);
  }

  await page.goto(`${baseURL}${path}`, { waitUntil: 'domcontentloaded' });
};

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

const assertHtmlResponse = async ({
  request,
  url,
  retriesLeft = 2,
  allowFallback = false,
}: {
  request: APIRequestContext;
  url: string;
  retriesLeft?: number;
  allowFallback?: boolean;
}) => {
  const response = await request.get(url);
  const headers = response.headers();
  const contentType = headers['content-type'] || '';

  expect(response.status()).toBe(200);
  expect(contentType).toContain('text/html');

  if (
    process.env.SMOKE &&
    !allowFallback &&
    headers['belfrage-cache-status'] === 'STALE'
  ) {
    if (retriesLeft < 1) {
      throw new Error(`Belfrage fallback response detected for ${url}`);
    }

    await assertHtmlResponse({
      request,
      url,
      retriesLeft: retriesLeft - 1,
      allowFallback,
    });
  }
};

const shouldTestTwoTierNav = (suite: TopicPageTestSuite) => {
  const serviceName =
    getServiceConfig(suite.service, suite.variant)?.service ?? suite.service;
  return twoTierNavServices[appEnvFromProcess]?.includes(serviceName) ?? false;
};

test.describe('topicPage', () => {
  topicPageSuites.canonical.forEach(testSuite => {
    const testLabel = `${baseURL}${testSuite.path}`;
    const suiteName = getSuiteName(testSuite);

    test.describe(testLabel, () => {
      test.describe(`Tests for ${suiteName} topicPage`, () => {
        const shouldSkip = ({
          requireUrlValidation = false,
          requireTopicTests = false,
          requireCanonicalSharedTests = false,
          requireSmoke = false,
          requireTwoTierNav = false,
          skipLocalEnv = false,
        }: SkipOptions = {}) => {
          if (!shouldRunForEnv(testSuite.runForEnv)) {
            return true;
          }

          if (requireUrlValidation && !testSuite.includeUrlValidation) {
            return true;
          }

          if (requireTopicTests && !testSuite.includeTopicTests) {
            return true;
          }

          if (
            requireCanonicalSharedTests &&
            !testSuite.includeCanonicalSharedTests
          ) {
            return true;
          }

          if (requireSmoke && !process.env.SMOKE) {
            return true;
          }

          if (requireTwoTierNav && !shouldTestTwoTierNav(testSuite)) {
            return true;
          }

          if (skipLocalEnv && appEnvFromProcess === 'local') {
            return true;
          }

          return false;
        };

        const openTopicPage = async ({
          page,
          viewport,
        }: {
          page: Page;
          viewport?: { width: number; height: number };
        }) =>
          gotoTopicPage({
            page,
            path: testSuite.path,
            viewport,
          });

        const openTopicPageAndGetState = async ({
          page,
          viewport,
        }: {
          page: Page;
          viewport?: { width: number; height: number };
        }) => {
          await openTopicPage({ page, viewport });

          return getTopicPageState({
            page,
            path: testSuite.path,
          });
        };

        test('should return a 200 status code', async ({ request }) => {
          test.skip(shouldSkip(), `Skipped for APP_ENV=${appEnvFromProcess}`);

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
            shouldSkip({ requireUrlValidation: true }),
            `Skipped for APP_ENV=${appEnvFromProcess}`,
          );

          await openTopicPage({ page });
          await assertUrlValidation(page);
        });

        test.describe('Topic page content', () => {
          test('should render a H1, which contains/displays topic title', async ({
            page,
          }) => {
            test.skip(
              shouldSkip({ requireTopicTests: true }),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            const topicPageState = await openTopicPageAndGetState({
              page,
            });

            await expect(page.locator('h1')).toContainText(
              topicPageState.topicTitle || '',
            );
          });

          test('should render the correct number of items', async ({
            page,
          }) => {
            test.skip(
              shouldSkip({ requireTopicTests: true }),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            const topicPageState = await openTopicPageAndGetState({
              page,
            });

            await expect(
              page
                .locator('[data-testid="topic-promos"]')
                .first()
                .locator('> li'),
            ).toHaveCount(topicPageState.numberOfItems);
          });

          test('First item has correct headline', async ({ page }) => {
            test.skip(
              shouldSkip({ requireTopicTests: true }),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            const topicPageState = await openTopicPageAndGetState({
              page,
            });

            if (!topicPageState.firstItemHeadline) {
              return;
            }

            await expect(
              page
                .locator('[data-testid="topic-promos"]')
                .first()
                .locator('> li')
                .first()
                .locator('h2'),
            ).toContainText(topicPageState.firstItemHeadline);
          });

          test('Clicking the first item should navigate to the correct page', async ({
            page,
          }) => {
            test.skip(
              shouldSkip({ requireTopicTests: true }),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            await openTopicPage({ page });
            const firstItemLink = await page
              .locator('[data-testid="topic-promos"]')
              .first()
              .locator('> li')
              .first()
              .locator('h2 a')
              .getAttribute('href');

            expect(firstItemLink).toBeTruthy();
            const expectedUrl = resolvePageUrl(firstItemLink || '');

            await Promise.all([
              page.waitForURL(expectedUrl),
              page
                .locator('[data-testid="topic-promos"]')
                .first()
                .locator('> li')
                .first()
                .locator('h2 a')
                .click(),
            ]);
          });

          test('clicking the message banner should navigate to the correct page', async ({
            page,
          }) => {
            test.skip(
              shouldSkip({ requireTopicTests: true }),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            const topicPageState = await openTopicPageAndGetState({
              page,
            });

            const messageBannerLink =
              topicPageState.messageBanner?.summaries?.[0]?.link;

            if (!messageBannerLink) {
              return;
            }

            const expectedUrl = resolvePageUrl(messageBannerLink);
            const messageBannerTitle =
              topicPageState.messageBanner?.title ?? '';
            const messageBannerLinkLocator = page
              .locator(
                `[data-testid="message-banner-1"], [data-testid="message-banner-${idSanitiser(messageBannerTitle)}"], [data-testid^="message-banner-"]`,
              )
              .first()
              .locator('a')
              .first();

            await Promise.all([
              page.waitForURL(expectedUrl),
              messageBannerLinkLocator.click(),
            ]);
          });
        });

        test.describe('Pagination', () => {
          test('should show pagination if there is more than one page', async ({
            page,
          }) => {
            test.skip(
              shouldSkip({ requireTopicTests: true }),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            const topicPageState = await openTopicPageAndGetState({
              page,
            });

            if (topicPageState.pageCount > 1) {
              await expect(
                page.locator('[data-testid="topic-pagination"]'),
              ).toBeVisible();
            } else {
              await expect(
                page.locator('[data-testid="topic-pagination"]'),
              ).toHaveCount(0);
            }
          });

          test('should have the correct max pagination number', async ({
            page,
          }) => {
            test.skip(
              shouldSkip({ requireTopicTests: true }),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            const topicPageState = await openTopicPageAndGetState({
              page,
            });

            if (topicPageState.pageCount <= 1) {
              return;
            }

            await expect(
              page.locator('[data-testid="topic-pagination"] li').last(),
            ).toHaveText(String(topicPageState.pageCount));
          });

          test('Page 2 button navigates to 2nd page', async ({ page }) => {
            test.skip(
              shouldSkip({ requireTopicTests: true, skipLocalEnv: true }),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            const topicPageState = await openTopicPageAndGetState({
              page,
            });

            if (topicPageState.pageCount <= 1) {
              return;
            }

            await page
              .locator('[data-testid="topic-pagination"] li')
              .nth(1)
              .click();
            await expect(page).toHaveURL(/\?page=2$/);
            await expect(
              page.locator('[data-testid="topic-promos"] li').first(),
            ).toBeVisible();
          });

          test('Page 2 does not have a fallback response', async ({
            page,
            request,
          }) => {
            test.skip(
              shouldSkip({ requireTopicTests: true, skipLocalEnv: true }),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            const topicPageState = await openTopicPageAndGetState({
              page,
            });

            if (topicPageState.pageCount <= 1) {
              return;
            }

            await page
              .locator('[data-testid="topic-pagination"] li')
              .nth(1)
              .click();
            await expect(page).toHaveURL(/\?page=2$/);

            await assertHtmlResponse({
              request,
              url: page.url(),
            });
          });

          test('Next button navigates to next page (3)', async ({ page }) => {
            test.skip(
              shouldSkip({ requireTopicTests: true, skipLocalEnv: true }),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            const topicPageState = await openTopicPageAndGetState({
              page,
            });

            if (topicPageState.pageCount <= 2) {
              return;
            }

            await page
              .locator('[data-testid="topic-pagination"] li')
              .nth(1)
              .click();
            await page.locator('#pagination-next-page').click();
            await expect(page).toHaveURL(/\?page=3$/);
            await expect(
              page.locator('[data-testid="topic-promos"] li').first(),
            ).toBeVisible();
          });

          test('Last page number button navigates to last page', async ({
            page,
          }) => {
            test.skip(
              shouldSkip({ requireTopicTests: true, skipLocalEnv: true }),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            const topicPageState = await openTopicPageAndGetState({
              page,
            });

            if (topicPageState.pageCount <= 1) {
              return;
            }

            await page
              .locator('[data-testid="topic-pagination"] li')
              .last()
              .click();
            await expect(page).toHaveURL(
              new RegExp(`\\?page=${topicPageState.pageCount}$`),
            );
            await expect(
              page.locator('[data-testid="curation-grid-normal"]'),
            ).toBeVisible();
          });

          test('Previous page button navigates to previous page (second to last)', async ({
            page,
          }) => {
            test.skip(
              shouldSkip({ requireTopicTests: true, skipLocalEnv: true }),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            const topicPageState = await openTopicPageAndGetState({
              page,
            });

            if (topicPageState.pageCount <= 1) {
              return;
            }

            await page
              .locator('[data-testid="topic-pagination"] li')
              .last()
              .click();
            await page
              .locator('[data-testid="topic-pagination"] span a')
              .click();
            await expect(page).toHaveURL(
              new RegExp(`\\?page=${topicPageState.pageCount - 1}$`),
            );
            await page
              .locator('[data-testid="topic-pagination"] li')
              .first()
              .click();
            await expect(page).toHaveURL(/\?page=1$/);
            await expect(
              page.locator('[data-testid="topic-promos"] li').first(),
            ).toBeVisible();
          });

          test('Page 1 button navigates to page 1', async ({ page }) => {
            test.skip(
              shouldSkip({ requireTopicTests: true }),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            const topicPageState = await openTopicPageAndGetState({
              page,
            });

            if (topicPageState.pageCount <= 1) {
              return;
            }

            await page
              .locator('[data-testid="topic-pagination"] li')
              .last()
              .click();
            await page
              .locator('[data-testid="topic-pagination"] li')
              .first()
              .click();
            await expect(page).toHaveURL(/\?page=1$/);
            await expect(
              page.locator('[data-testid="topic-promos"] li').first(),
            ).toBeVisible();
          });

          test('Above 400px does not show Page x of y', async ({ page }) => {
            test.skip(
              shouldSkip({ requireTopicTests: true }),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            const topicPageState = await openTopicPageAndGetState({
              page,
              viewport: { width: 1008, height: 900 },
            });

            if (topicPageState.pageCount <= 1) {
              return;
            }

            await expect(
              page.locator('[data-testid="topic-pagination-summary"]'),
            ).not.toBeVisible();
          });

          test('Below 400px shows Page x of y', async ({ page }) => {
            test.skip(
              shouldSkip({ requireTopicTests: true }),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            const topicPageState = await openTopicPageAndGetState({
              page,
              viewport: { width: 320, height: 480 },
            });

            if (topicPageState.pageCount <= 1) {
              return;
            }

            await expect(
              page.locator('[data-testid="topic-pagination-summary"]'),
            ).toBeVisible();
          });
        });

        test.describe('Script switch', () => {
          test('Pages with 2 scripts should have a script switch button with correct other variant', async ({
            page,
          }) => {
            const otherVariant = getServiceConfig(
              testSuite.service,
              testSuite.variant,
            )?.scriptLink?.variant;

            test.skip(
              shouldSkip({ requireTopicTests: true }) || !otherVariant,
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            if (!otherVariant) {
              return;
            }

            await openTopicPage({ page });
            await expect(
              page.locator(`[data-variant="${otherVariant}"]`),
            ).toBeVisible();
          });

          test('Script switch button switches the script', async ({ page }) => {
            const otherVariant = getServiceConfig(
              testSuite.service,
              testSuite.variant,
            )?.scriptLink?.variant;
            const topicId = testSuite.path.match(/(c[a-zA-Z0-9]{10,}t)/)?.[1];

            test.skip(
              shouldSkip({ requireTopicTests: true }) ||
                !otherVariant ||
                !testSuite.variant ||
                !topicId,
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            if (!otherVariant || !testSuite.variant || !topicId) {
              return;
            }

            await openTopicPage({ page });
            await page.locator(`[data-variant="${otherVariant}"]`).click();
            await expect(page).toHaveURL(new RegExp(otherVariant));
            await expect(page).toHaveURL(new RegExp(topicId));
            await page.locator(`[data-variant="${testSuite.variant}"]`).click();
            await expect(page).toHaveURL(new RegExp(testSuite.variant));
            await expect(page).toHaveURL(new RegExp(topicId));
          });
        });

        test.describe('Shared canonical coverage', () => {
          const assertTwoTierNavigationLinks = async ({
            page,
            viewport,
          }: {
            page: Page;
            viewport: { width: number; height: number };
          }) => {
            await openTopicPage({ page, viewport });

            await expect(
              page.locator('[data-e2e="scrollable-nav"]'),
            ).toBeVisible();
            await expect(
              page.locator('[data-e2e="scrollable-nav-secondary"] ul'),
            ).toBeVisible();

            const primaryHrefs = await page
              .locator('[data-e2e="scrollable-nav"] a')
              .evaluateAll(links =>
                links.map(link => link.getAttribute('href')),
              );
            const secondaryHrefs = await page
              .locator('[data-e2e="scrollable-nav-secondary"] ul a')
              .evaluateAll(links =>
                links.map(link => link.getAttribute('href')),
              );

            [...primaryHrefs, ...secondaryHrefs].forEach(href => {
              expect(href).toBeTruthy();
              expect(href).not.toBe('');
            });
          };

          test('should have a noscript img tag with the ati url', async ({
            page,
          }) => {
            test.skip(
              shouldSkip({ requireSmoke: true }),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            const { atiUrl } = getATIUrls(appEnvFromProcess);

            await openTopicPage({ page });
            const noScriptText = await page
              .locator('noscript[id="analytics-noscript"]')
              .textContent();

            if (noScriptText) {
              expect(noScriptText).toContain(
                `<img height="1px" width="1px" alt="" style="position:absolute" src="${atiUrl}`,
              );
            }
          });

          test('should show two tier navigation on desktop', async ({
            page,
          }) => {
            test.skip(
              shouldSkip({
                requireCanonicalSharedTests: true,
                requireTwoTierNav: true,
              }),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            await assertTwoTierNavigationLinks({
              page,
              viewport: { width: 1008, height: 900 },
            });
          });

          test('should show two tier navigation on mobile', async ({
            page,
          }) => {
            test.skip(
              shouldSkip({
                requireCanonicalSharedTests: true,
                requireTwoTierNav: true,
              }),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            await assertTwoTierNavigationLinks({
              page,
              viewport: { width: 320, height: 480 },
            });
          });

          test('dropdown menu should open and close when the menu button is clicked', async ({
            page,
          }) => {
            test.skip(
              shouldSkip({
                requireCanonicalSharedTests: true,
                requireTwoTierNav: true,
              }),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            await openTopicPage({
              page,
              viewport: { width: 320, height: 480 },
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
});

test.describe('topicPage ATI Analytics', () => {
  topicPageSuites.ati.forEach(testSuite => {
    const testLabel = `${baseURL}${testSuite.path}`;

    test.describe(testLabel, () => {
      test.describe(`ATI Analytics for ${testSuite.service} topicPage`, () => {
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

        if (testSuite.service === 'portuguese') {
          test('should send a view event for the Scrollable Navigation component', async ({
            page,
          }) => {
            test.skip(
              !shouldRunForEnv(testSuite.runForEnv),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            await assertScrollableNavigationComponentView({
              page,
              ...atiProps,
            });
          });

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

          test('should send a view event for the Dropdown Navigation component', async ({
            page,
          }) => {
            test.skip(
              !shouldRunForEnv(testSuite.runForEnv),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            await assertDropdownNavigationComponentView({ page, ...atiProps });
          });

          test('should send a click event for the Dropdown Navigation component', async ({
            page,
          }) => {
            test.skip(
              !shouldRunForEnv(testSuite.runForEnv),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            await assertDropdownNavigationComponentClick({ page, ...atiProps });
          });

          test('should send a view event for the Message Banner component', async ({
            page,
          }) => {
            test.skip(
              !shouldRunForEnv(testSuite.runForEnv),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            await assertMessageBannerComponentView({ page, ...atiProps });
          });

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
      });
    });
  });
});

test.describe('topicPage ATI Analytics Lite', () => {
  topicPageSuites.atiLite.forEach(testSuite => {
    const testLabel = `${baseURL}${testSuite.path}`;

    test.describe(testLabel, () => {
      test.describe(`ATI Analytics Lite for ${testSuite.service} topicPage`, () => {
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

        if (testSuite.service === 'portuguese') {
          test('should send a view event for the Scrollable Navigation component', async ({
            page,
          }) => {
            test.skip(
              !shouldRunForEnv(testSuite.runForEnv),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            await assertScrollableNavigationComponentView({
              page,
              ...atiProps,
            });
          });

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

          test('should send a view event for the Message Banner component', async ({
            page,
          }) => {
            test.skip(
              !shouldRunForEnv(testSuite.runForEnv),
              `Skipped for APP_ENV=${appEnvFromProcess}`,
            );

            await assertMessageBannerComponentView({ page, ...atiProps });
          });

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
      });
    });
  });
});
