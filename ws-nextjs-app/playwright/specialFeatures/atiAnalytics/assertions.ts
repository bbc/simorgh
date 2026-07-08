import { expect, type Page, type Request } from '@playwright/test';
import {
  getATIParamsFromURL,
  getATIUrls,
  getAppName,
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
