import { expect, type Page, type Request } from '@playwright/test';
import {
  getATIParamsFromURL,
  getATIUrls,
  getAppName,
  getResonanceAppName,
  getResonanceBagUrl,
  isViewabilityViewRequest,
  isViewabilityClickRequest,
  COMPONENTS,
  type AppEnv,
} from './helpers';

export type AtiAssertionFnProps = {
  page: Page;
  path: string;
  baseURL: string;
  pageIdentifier: string;
  siteId: number;
  applicationType: string;
  contentType: string;
  service: string;
  appEnv: AppEnv;
};

const assertATIPageViewParamsExist = (
  params: Record<string, string>,
  contentType: string,
  applicationType: string,
) => {
  expect(params).toHaveProperty('s');
  expect(params).toHaveProperty('s2');
  expect(params).toHaveProperty('p');
  expect(params).toHaveProperty('x2');
  expect(params).toHaveProperty('x3');
  expect(params).toHaveProperty('x4');
  expect(params).toHaveProperty('x7');
  expect(params).toHaveProperty('x8');
  expect(params).toHaveProperty('x9');

  if (['responsive', 'amp'].includes(applicationType)) {
    expect(params).toHaveProperty('r');
    expect(params).toHaveProperty('re');
    expect(params).toHaveProperty('hl');
    expect(params).toHaveProperty('lng');
    expect(params).toHaveProperty('x5');
  }

  if (['responsive', 'lite'].includes(applicationType)) {
    expect(params).toHaveProperty('idclient');
  }

  if (!['list-datadriven', 'static'].includes(contentType)) {
    expect(params).toHaveProperty('x1');
  }
};

const fieldIsValidString = (field: unknown): boolean =>
  typeof field === 'string' && field.trim().length > 0;

/* eslint-disable camelcase */
type ViewabilityGroup = {
  name?: unknown;
  type?: unknown;
  link?: unknown;
  item_count?: unknown;
  resource_id?: unknown;
  position?: unknown;
};

type ViewabilityItem = {
  name?: unknown;
  link?: unknown;
  advertiser_id?: unknown;
  type?: unknown;
  text?: unknown;
  position?: unknown;
  duration?: unknown;
  media_type?: unknown;
  label?: unknown;
  resource_id?: unknown;
};
/* eslint-enable camelcase */

type ViewabilityEventPayload = {
  name?: unknown;
  data?: {
    group?: ViewabilityGroup;
    event?: { category?: unknown; action?: unknown };
    item?: ViewabilityItem;
  };
};

const validateViewabilityEventDetails = (
  payload: string,
  actionType: string,
): boolean => {
  const arr = JSON.parse(payload) as ViewabilityEventPayload[];

  return arr.some(event => {
    if (event.name !== `viewability.${actionType}`) return false;

    const group: ViewabilityGroup = event.data?.group ?? {};
    const ev = event.data?.event ?? {};
    const item: ViewabilityItem = event.data?.item ?? {};

    if (ev.category !== 'viewability' || ev.action !== actionType) return false;

    return (
      fieldIsValidString(group.name) &&
      fieldIsValidString(group.type) &&
      (!group.link || fieldIsValidString(group.link)) &&
      (!group.item_count || Number.isInteger(group.item_count)) &&
      (!group.resource_id || fieldIsValidString(group.resource_id)) &&
      (!group.position || Number.isInteger(group.position)) &&
      fieldIsValidString(item.name) &&
      (!item.link || fieldIsValidString(item.link)) &&
      (!item.advertiser_id || fieldIsValidString(item.advertiser_id)) &&
      (!item.type || fieldIsValidString(item.type)) &&
      (!item.text || fieldIsValidString(item.text)) &&
      (!item.position || Number.isInteger(item.position)) &&
      (!item.duration || Number.isInteger(item.duration)) &&
      (!item.media_type || fieldIsValidString(item.media_type)) &&
      (!item.label || fieldIsValidString(item.label)) &&
      (!item.resource_id || fieldIsValidString(item.resource_id))
    );
  });
};

const assertViewabilityEventParams = (
  params: Record<string, string>,
  pageIdentifier: string,
  siteId: number,
  applicationType: string,
  actionType: 'view' | 'select',
) => {
  if (['responsive', 'lite'].includes(applicationType)) {
    expect(params).toHaveProperty('idclient');
  }

  expect(params).toHaveProperty('s');
  expect(params).toHaveProperty('events');
  expect(params).toHaveProperty('context');

  expect(
    validateViewabilityEventDetails(params.events, actionType),
    `events param should contain valid viewability ${actionType} event details`,
  ).toBe(true);

  const eventContext = JSON.parse(params.context) as Array<{
    // eslint-disable-next-line camelcase
    data: { page: { $: string }; site: { level2_id: string } };
  }>;
  expect(eventContext[0].data.page.$).toBe(pageIdentifier);
  expect(parseInt(eventContext[0].data.site.level2_id, 10)).toBe(siteId);
};

const usesReverbViewabilityModel = (applicationType: string): boolean =>
  !['lite', 'amp'].includes(applicationType);

const usesResonance = (applicationType: string): boolean =>
  !['lite', 'amp'].includes(applicationType);

const assertResonancePageViewParamsExist = ({
  metadata,
  event,
  contentType,
}: {
  metadata: Record<string, unknown>;
  event: Record<string, unknown>;
  contentType: string;
}) => {
  expect(metadata).toHaveProperty('client_name');
  expect(metadata).toHaveProperty('collection_library_name');
  expect(metadata).toHaveProperty('collection_library_version');
  expect(metadata).toHaveProperty('event_category');
  expect(metadata).toHaveProperty('id');
  expect(metadata).toHaveProperty('request_time');

  expect(event).toHaveProperty('app_name');
  expect(event).toHaveProperty('browser_language');
  expect(event).toHaveProperty('content_type');
  expect(event).toHaveProperty('destination');
  expect(event).toHaveProperty('event_id');
  expect(event).toHaveProperty('event_time');
  expect(event).toHaveProperty('event_name');
  expect(event).toHaveProperty('event_ts');
  expect(event).toHaveProperty('language');
  expect(event).toHaveProperty('page_name');
  expect(event).toHaveProperty('page_title');
  expect(event).toHaveProperty('producer');
  expect(event).toHaveProperty('site_id');
  expect(event).toHaveProperty('url');

  if (!['list-datadriven', 'static'].includes(contentType)) {
    expect(event).toHaveProperty('content_id');
  }
};

const buildPageViewRequestMatcher = ({
  applicationType,
  atiUrl,
  reverbAtiUrl,
}: {
  applicationType: string;
  atiUrl: string;
  reverbAtiUrl: string;
}) => {
  const shouldUseReverb = usesReverbViewabilityModel(applicationType);
  const expectedHost = new URL(shouldUseReverb ? reverbAtiUrl : atiUrl)
    .hostname;
  const expectedX8 = shouldUseReverb ? 'simorgh' : '[simorgh]';

  return (request: Request): boolean => {
    const { hostname, search } = new URL(request.url());
    if (hostname !== expectedHost) return false;
    const params = new URLSearchParams(search);
    return params.get('x8') === expectedX8;
  };
};

const getScrollableNavClickTarget = async (page: Page) => {
  const navLinks = page.locator('[data-e2e="scrollable-nav"]').locator('a');
  const linkCount = await navLinks.count();
  expect(
    linkCount,
    'expected scrollable navigation to contain at least one link',
  ).toBeGreaterThan(0);
  const currentPath = new URL(page.url()).pathname;

  const navHrefs = await navLinks.evaluateAll(links =>
    links.map(link => link.getAttribute('href')),
  );

  const targetIndex = navHrefs.findIndex(href => {
    if (!href) return false;

    const targetPath = new URL(href, page.url()).pathname;
    return targetPath !== currentPath;
  });

  return targetIndex >= 0 ? navLinks.nth(targetIndex) : navLinks.last();
};

const waitForPageViewRequest = ({
  page,
  appEnv,
  applicationType,
}: {
  page: Page;
  appEnv: AppEnv;
  applicationType: string;
}) => {
  const { atiUrl, reverbAtiUrl } = getATIUrls(appEnv);

  return page.waitForRequest(
    buildPageViewRequestMatcher({
      applicationType,
      atiUrl,
      reverbAtiUrl,
    }),
  );
};

const getViewabilityHosts = (appEnv: AppEnv) => {
  const { atiUrl, reverbAtiUrl } = getATIUrls(appEnv);
  return [reverbAtiUrl, atiUrl];
};

const waitForComponentViewRequest = ({
  page,
  appEnv,
  component,
}: {
  page: Page;
  appEnv: AppEnv;
  component: string;
}) =>
  page.waitForRequest(
    isViewabilityViewRequest(getViewabilityHosts(appEnv), component),
  );

const waitForComponentClickRequest = ({
  page,
  appEnv,
  component,
}: {
  page: Page;
  appEnv: AppEnv;
  component: string;
}) =>
  page.waitForRequest(
    isViewabilityClickRequest(getViewabilityHosts(appEnv), component),
  );

export const assertPageView = async ({
  page,
  path,
  baseURL,
  pageIdentifier,
  siteId,
  applicationType,
  contentType,
  service,
  appEnv,
}: AtiAssertionFnProps) => {
  const pageViewPromise = waitForPageViewRequest({
    page,
    appEnv,
    applicationType,
  });

  await page.goto(`${baseURL}${path}`, { waitUntil: 'domcontentloaded' });

  const request = await pageViewPromise;
  const params = getATIParamsFromURL(request.url());

  assertATIPageViewParamsExist(params, contentType, applicationType);

  expect(params.p).toBe(pageIdentifier);
  expect(parseInt(params.s2, 10)).toBe(siteId);
  expect(params.x2).toBe(`[${applicationType}]`);
  expect(params.x3).toBe(getAppName(service));
  expect(params.x7).toBe(`[${contentType}]`);
};

export const assertResonancePageView = async ({
  page,
  path,
  baseURL,
  pageIdentifier,
  siteId,
  applicationType,
  contentType,
  service,
  appEnv,
}: AtiAssertionFnProps) => {
  const sendsResonanceEvents = usesResonance(applicationType);
  const resonanceBagUrl = getResonanceBagUrl(appEnv);
  const resonanceBagEventUrlPattern = new RegExp(
    `${resonanceBagUrl}/v[0-9]+/event`,
  );

  const matchedRequests: Request[] = [];
  const parseResonanceBody = (request: Request) => {
    const rawPostData = request.postData();
    if (!rawPostData) return null;

    try {
      return JSON.parse(rawPostData) as {
        bag_metadata?: Record<string, unknown>;
        events?: Array<Record<string, unknown>>;
      };
    } catch {
      return null;
    }
  };

  const requestListener = (request: Request) => {
    if (
      request.method() === 'POST' &&
      resonanceBagEventUrlPattern.test(request.url())
    ) {
      matchedRequests.push(request);
    }
  };

  page.on('request', requestListener);

  try {
    await page.goto(`${baseURL}${path}`, { waitUntil: 'domcontentloaded' });

    if (!sendsResonanceEvents) {
      await page.waitForLoadState('networkidle');
      expect(matchedRequests).toHaveLength(0);
      return;
    }

    await expect
      .poll(() => matchedRequests.length, {
        timeout: 15000,
      })
      .toBeGreaterThan(0);

    await expect
      .poll(
        () =>
          matchedRequests
            .map(parseResonanceBody)
            .find(body => body?.bag_metadata && body?.events),
        {
          timeout: 15000,
        },
      )
      .not.toBeNull();

    const body = matchedRequests
      .map(parseResonanceBody)
      .find(body => body?.bag_metadata && body?.events);

    if (!body) {
      expect(matchedRequests.length).toBeGreaterThan(0);
      return;
    }

    expect(body).toHaveProperty('bag_metadata');
    expect(body).toHaveProperty('events');

    const metadata = body?.bag_metadata ?? {};
    const event = body?.events?.[0] ?? {};

    assertResonancePageViewParamsExist({
      metadata,
      event,
      contentType,
    });

    expect(event.app_name).toBe(getResonanceAppName(service));
    expect(event.content_type).toBe(contentType);
    expect(event.event_name).toBe('page.display');
    expect(event.page_name).toBe(pageIdentifier);
    expect(event.producer).toBe(siteId);
  } finally {
    page.off('request', requestListener);
  }
};

export const assertScrollableNavigationComponentView = async ({
  page,
  path,
  baseURL,
  pageIdentifier,
  siteId,
  applicationType,
  appEnv,
}: AtiAssertionFnProps) => {
  const viewPromise = waitForComponentViewRequest({
    page,
    appEnv,
    component: COMPONENTS.SCROLLABLE_NAVIGATION,
  });

  await page.goto(`${baseURL}${path}`, { waitUntil: 'domcontentloaded' });

  // Double scroll intentional to reliably trigger viewability
  await page.locator('[data-e2e="scrollable-nav"]').scrollIntoViewIfNeeded();
  await page.locator('[data-e2e="scrollable-nav"]').scrollIntoViewIfNeeded();

  const request = await viewPromise;
  const params = getATIParamsFromURL(request.url());

  assertViewabilityEventParams(
    params,
    pageIdentifier,
    siteId,
    applicationType,
    'view',
  );
};

export const assertScrollableNavigationComponentClick = async ({
  page,
  path,
  baseURL,
  pageIdentifier,
  siteId,
  applicationType,
  appEnv,
}: AtiAssertionFnProps) => {
  const pageViewPromise = waitForPageViewRequest({
    page,
    appEnv,
    applicationType,
  });

  await page.goto(`${baseURL}${path}`, { waitUntil: 'domcontentloaded' });
  await pageViewPromise;
  await page.locator('[data-e2e="scrollable-nav"]').scrollIntoViewIfNeeded();
  await page.locator('[data-e2e="scrollable-nav"] a').first().waitFor();

  const navLinkToClick = await getScrollableNavClickTarget(page);

  const [request] = await Promise.all([
    waitForComponentClickRequest({
      page,
      appEnv,
      component: COMPONENTS.SCROLLABLE_NAVIGATION,
    }),
    navLinkToClick.click(),
  ]);

  const params = getATIParamsFromURL(request.url());

  assertViewabilityEventParams(
    params,
    pageIdentifier,
    siteId,
    applicationType,
    'select',
  );
};

export const assertDropdownNavigationComponentView = async ({
  page,
  path,
  baseURL,
  pageIdentifier,
  siteId,
  applicationType,
  appEnv,
}: AtiAssertionFnProps) => {
  const viewPromise = waitForComponentViewRequest({
    page,
    appEnv,
    component: COMPONENTS.DROPDOWN_NAVIGATION,
  });

  await page.goto(`${baseURL}${path}`, { waitUntil: 'domcontentloaded' });
  await page.setViewportSize({ width: 320, height: 480 });
  await page.locator('nav button').click();

  const request = await viewPromise;
  const params = getATIParamsFromURL(request.url());

  assertViewabilityEventParams(
    params,
    pageIdentifier,
    siteId,
    applicationType,
    'view',
  );
};

export const assertDropdownNavigationComponentClick = async ({
  page,
  path,
  baseURL,
  pageIdentifier,
  siteId,
  applicationType,
  appEnv,
}: AtiAssertionFnProps) => {
  await page.goto(`${baseURL}${path}`, { waitUntil: 'domcontentloaded' });
  await page.setViewportSize({ width: 320, height: 480 });
  await page.locator('nav button').click();

  const [request] = await Promise.all([
    waitForComponentClickRequest({
      page,
      appEnv,
      component: COMPONENTS.DROPDOWN_NAVIGATION,
    }),
    page.locator('[data-e2e="dropdown-nav"]').locator('a').first().click(),
  ]);

  const params = getATIParamsFromURL(request.url());

  assertViewabilityEventParams(
    params,
    pageIdentifier,
    siteId,
    applicationType,
    'select',
  );
};

export const assertMostReadComponentView = async ({
  page,
  path,
  baseURL,
  pageIdentifier,
  siteId,
  applicationType,
  appEnv,
}: AtiAssertionFnProps) => {
  const viewPromise = waitForComponentViewRequest({
    page,
    appEnv,
    component: COMPONENTS.MOST_READ,
  });

  await page.goto(`${baseURL}${path}`, { waitUntil: 'domcontentloaded' });

  // Double scroll intentional to reliably trigger viewability
  await page.locator('[data-e2e="most-read"]').scrollIntoViewIfNeeded();
  await page.locator('[data-e2e="most-read"]').scrollIntoViewIfNeeded();

  const request = await viewPromise;
  const params = getATIParamsFromURL(request.url());

  assertViewabilityEventParams(
    params,
    pageIdentifier,
    siteId,
    applicationType,
    'view',
  );
};

export const assertMostReadComponentClick = async ({
  page,
  path,
  baseURL,
  pageIdentifier,
  siteId,
  applicationType,
  appEnv,
}: AtiAssertionFnProps) => {
  const pageViewPromise = waitForPageViewRequest({
    page,
    appEnv,
    applicationType,
  });

  await page.goto(`${baseURL}${path}`, { waitUntil: 'domcontentloaded' });
  await pageViewPromise;
  await page.locator('[data-e2e="most-read"]').scrollIntoViewIfNeeded();
  await page.locator('[data-e2e="most-read"]').scrollIntoViewIfNeeded();
  await page.locator('[data-e2e="most-read"] a').first().waitFor();

  const [request] = await Promise.all([
    waitForComponentClickRequest({
      page,
      appEnv,
      component: COMPONENTS.MOST_READ,
    }),
    page.locator('[data-e2e="most-read"]').locator('a').first().click(),
  ]);

  const params = getATIParamsFromURL(request.url());

  assertViewabilityEventParams(
    params,
    pageIdentifier,
    siteId,
    applicationType,
    'select',
  );
};

export const assertLiteSiteSummaryComponentToMainSiteClick = async ({
  page,
  path,
  baseURL,
  pageIdentifier,
  siteId,
  applicationType,
  appEnv,
}: AtiAssertionFnProps) => {
  const pageViewPromise = waitForPageViewRequest({
    page,
    appEnv,
    applicationType,
  });

  await page.goto(`${baseURL}${path}`, { waitUntil: 'domcontentloaded' });
  await pageViewPromise;
  await page.locator('[data-e2e="to-main-site"]').scrollIntoViewIfNeeded();
  await page.locator('[data-e2e="to-main-site"] a').first().waitFor();

  const [request] = await Promise.all([
    waitForComponentClickRequest({
      page,
      appEnv,
      component: COMPONENTS.LITE_SITE_SUMMARY,
    }),
    page.locator('[data-e2e="to-main-site"]').locator('a').first().click(),
  ]);

  const params = getATIParamsFromURL(request.url());

  assertViewabilityEventParams(
    params,
    pageIdentifier,
    siteId,
    applicationType,
    'select',
  );
};

export const assertRadioScheduleComponentView = async ({
  page,
  path,
  baseURL,
  pageIdentifier,
  siteId,
  applicationType,
  appEnv,
}: AtiAssertionFnProps) => {
  const viewPromise = waitForComponentViewRequest({
    page,
    appEnv,
    component: COMPONENTS.RADIO_SCHEDULE,
  });

  await page.goto(`${baseURL}${path}`, { waitUntil: 'domcontentloaded' });

  // Double scroll intentional to reliably trigger viewability
  await page.locator('[data-testid="radio-schedule"]').scrollIntoViewIfNeeded();
  await page.locator('[data-testid="radio-schedule"]').scrollIntoViewIfNeeded();

  const request = await viewPromise;
  const params = getATIParamsFromURL(request.url());

  assertViewabilityEventParams(
    params,
    pageIdentifier,
    siteId,
    applicationType,
    'view',
  );
};

export const assertMessageBannerComponentView = async ({
  page,
  path,
  baseURL,
  pageIdentifier,
  siteId,
  applicationType,
  appEnv,
}: AtiAssertionFnProps) => {
  const viewPromise = waitForComponentViewRequest({
    page,
    appEnv,
    component: COMPONENTS.MESSAGE_BANNER,
  });

  await page.goto(`${baseURL}${path}`, { waitUntil: 'domcontentloaded' });

  // Double scroll intentional to reliably trigger viewability
  await page
    .locator('[data-testid="message-banner-1"]')
    .scrollIntoViewIfNeeded();
  await page
    .locator('[data-testid="message-banner-1"]')
    .scrollIntoViewIfNeeded();

  const request = await viewPromise;
  const params = getATIParamsFromURL(request.url());

  assertViewabilityEventParams(
    params,
    pageIdentifier,
    siteId,
    applicationType,
    'view',
  );
};

export const assertMessageBannerComponentClick = async ({
  page,
  path,
  baseURL,
  pageIdentifier,
  siteId,
  applicationType,
  appEnv,
}: AtiAssertionFnProps) => {
  const pageViewPromise = waitForPageViewRequest({
    page,
    appEnv,
    applicationType,
  });

  await page.goto(`${baseURL}${path}`, { waitUntil: 'domcontentloaded' });
  await pageViewPromise;
  await page
    .locator('[data-testid="message-banner-1"]')
    .scrollIntoViewIfNeeded();
  await page.locator('[data-testid="message-banner-1"] a').first().waitFor();

  const [request] = await Promise.all([
    waitForComponentClickRequest({
      page,
      appEnv,
      component: COMPONENTS.MESSAGE_BANNER,
    }),
    page
      .locator('[data-testid="message-banner-1"]')
      .locator('a')
      .first()
      .click(),
  ]);

  const params = getATIParamsFromURL(request.url());

  assertViewabilityEventParams(
    params,
    pageIdentifier,
    siteId,
    applicationType,
    'select',
  );
};

export const assertRadioScheduleComponentClick = async ({
  page,
  path,
  baseURL,
  pageIdentifier,
  siteId,
  applicationType,
  appEnv,
}: AtiAssertionFnProps) => {
  await page.goto(`${baseURL}${path}`, { waitUntil: 'domcontentloaded' });
  await page.locator('[data-testid="radio-schedule"]').scrollIntoViewIfNeeded();

  const [request] = await Promise.all([
    waitForComponentClickRequest({
      page,
      appEnv,
      component: COMPONENTS.RADIO_SCHEDULE,
    }),
    page.locator('[data-e2e="onDemand"]').locator('a').first().click(),
  ]);

  const params = getATIParamsFromURL(request.url());

  assertViewabilityEventParams(
    params,
    pageIdentifier,
    siteId,
    applicationType,
    'select',
  );
};

export const assertPodcastPromoComponentView = async ({
  page,
  path,
  baseURL,
  pageIdentifier,
  siteId,
  applicationType,
  appEnv,
}: AtiAssertionFnProps) => {
  const viewPromise = waitForComponentViewRequest({
    page,
    appEnv,
    component: COMPONENTS.PODCAST_PROMO,
  });

  await page.goto(`${baseURL}${path}`, { waitUntil: 'domcontentloaded' });
  await page.locator('[data-e2e="podcast-promo"]').scrollIntoViewIfNeeded();
  await page.locator('[data-e2e="podcast-promo"]').scrollIntoViewIfNeeded();

  const request = await viewPromise;
  const params = getATIParamsFromURL(request.url());

  assertViewabilityEventParams(
    params,
    pageIdentifier,
    siteId,
    applicationType,
    'view',
  );
};

export const assertPodcastPromoComponentClick = async ({
  page,
  path,
  baseURL,
  pageIdentifier,
  siteId,
  applicationType,
  appEnv,
}: AtiAssertionFnProps) => {
  const pageViewPromise = waitForPageViewRequest({
    page,
    appEnv,
    applicationType,
  });

  await page.goto(`${baseURL}${path}`, { waitUntil: 'domcontentloaded' });
  await pageViewPromise;
  await page.locator('[data-e2e="podcast-promo"]').scrollIntoViewIfNeeded();
  await page.locator('[data-e2e="podcast-promo"] a').last().waitFor();

  const [request] = await Promise.all([
    waitForComponentClickRequest({
      page,
      appEnv,
      component: COMPONENTS.PODCAST_PROMO,
    }),
    page.locator('[data-e2e="podcast-promo"]').locator('a').last().click(),
  ]);

  const params = getATIParamsFromURL(request.url());

  assertViewabilityEventParams(
    params,
    pageIdentifier,
    siteId,
    applicationType,
    'select',
  );
};

export const assertRecentAudioEpisodesComponentView = async ({
  page,
  path,
  baseURL,
  pageIdentifier,
  siteId,
  applicationType,
  appEnv,
}: AtiAssertionFnProps) => {
  const viewPromise = waitForComponentViewRequest({
    page,
    appEnv,
    component: COMPONENTS.RECENT_AUDIO_EPISODES,
  });

  await page.goto(`${baseURL}${path}`, { waitUntil: 'domcontentloaded' });
  await page
    .locator('[data-e2e="recent-episodes-list"]')
    .scrollIntoViewIfNeeded();

  const request = await viewPromise;
  const params = getATIParamsFromURL(request.url());

  assertViewabilityEventParams(
    params,
    pageIdentifier,
    siteId,
    applicationType,
    'view',
  );
};

export const assertRecentAudioEpisodesComponentClick = async ({
  page,
  path,
  baseURL,
  pageIdentifier,
  siteId,
  applicationType,
  appEnv,
}: AtiAssertionFnProps) => {
  const pageViewPromise = waitForPageViewRequest({
    page,
    appEnv,
    applicationType,
  });

  await page.goto(`${baseURL}${path}`, { waitUntil: 'domcontentloaded' });
  await pageViewPromise;
  await page
    .locator('[data-e2e="recent-episodes-list"]')
    .scrollIntoViewIfNeeded();
  await page.locator('[data-e2e="recent-episodes-list"] a').first().waitFor();

  const [request] = await Promise.all([
    waitForComponentClickRequest({
      page,
      appEnv,
      component: COMPONENTS.RECENT_AUDIO_EPISODES,
    }),
    page
      .locator('[data-e2e="recent-episodes-list"]')
      .locator('a')
      .first()
      .click(),
  ]);

  const params = getATIParamsFromURL(request.url());

  assertViewabilityEventParams(
    params,
    pageIdentifier,
    siteId,
    applicationType,
    'select',
  );
};

export const assertPodcastLinksComponentView = async ({
  page,
  path,
  baseURL,
  pageIdentifier,
  siteId,
  applicationType,
  appEnv,
}: AtiAssertionFnProps) => {
  const viewPromise = waitForComponentViewRequest({
    page,
    appEnv,
    component: COMPONENTS.PODCAST_LINKS,
  });

  await page.goto(`${baseURL}${path}`, { waitUntil: 'domcontentloaded' });
  await page.locator('[data-e2e="podcast-links"]').scrollIntoViewIfNeeded();

  const request = await viewPromise;
  const params = getATIParamsFromURL(request.url());

  assertViewabilityEventParams(
    params,
    pageIdentifier,
    siteId,
    applicationType,
    'view',
  );
};

export const assertPodcastLinksComponentClick = async ({
  page,
  path,
  baseURL,
  pageIdentifier,
  siteId,
  applicationType,
  appEnv,
}: AtiAssertionFnProps) => {
  const pageViewPromise = waitForPageViewRequest({
    page,
    appEnv,
    applicationType,
  });

  await page.goto(`${baseURL}${path}`, { waitUntil: 'domcontentloaded' });
  await pageViewPromise;
  await page.locator('[data-e2e="podcast-links"]').scrollIntoViewIfNeeded();

  const podcastLinks = page.locator('[data-e2e="podcast-links"]');
  const rssLink = podcastLinks.getByRole('link', { name: /rss/i });

  const linkToClick =
    (await rssLink.count()) > 0 ? rssLink.first() : podcastLinks.locator('a').first();
  await linkToClick.waitFor();

  const [request] = await Promise.all([
    waitForComponentClickRequest({
      page,
      appEnv,
      component: COMPONENTS.PODCAST_LINKS,
    }),
    linkToClick.click(),
  ]);

  const params = getATIParamsFromURL(request.url());

  assertViewabilityEventParams(
    params,
    pageIdentifier,
    siteId,
    applicationType,
    'select',
  );
};