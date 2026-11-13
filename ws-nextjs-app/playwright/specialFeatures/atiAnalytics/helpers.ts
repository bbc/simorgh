import type { Page, Request } from '@playwright/test';

export type AppEnv = 'local' | 'test' | 'live';

const atiUrlByEnv: Record<AppEnv, string> = {
  local: 'https://logws1363.ati-host.net',
  test: 'https://logws1363.ati-host.net',
  live: 'https://a1.api.bbc.co.uk',
};

const reverbAtiUrlByEnv: Record<AppEnv, string> = {
  local: 'https://logw363.ati-host.net',
  test: 'https://logw363.ati-host.net',
  live: 'https://a1.api.bbc.co.uk',
};

const resonanceBagUrlByEnv: Record<AppEnv, string> = {
  local: 'https://bag.test.api.bbc.co.uk',
  test: 'https://bag.test.api.bbc.co.uk',
  live: 'https://bag.api.bbc.co.uk',
};

export const getATIUrls = (env: AppEnv) => ({
  atiUrl: atiUrlByEnv[env],
  reverbAtiUrl: reverbAtiUrlByEnv[env],
});

export const getResonanceBagUrl = (env: AppEnv) => resonanceBagUrlByEnv[env];

/* eslint-disable camelcase */
export type ResonanceRequestBody = {
  bag_metadata?: Record<string, unknown>;
  events?: Array<Record<string, unknown>>;
};
/* eslint-enable camelcase */

export type CapturedResonanceRequest = { url: string; body: string };

type WindowWithResonanceCapture = Window & {
  reportResonanceRequest: (url: string, body: string) => void;
};

// Resonance sends Blob bodies, which Playwright reports as null postData, so capture them in-page.
export const captureResonanceRequestBodies = async (page: Page) => {
  const capturedRequests: CapturedResonanceRequest[] = [];

  await page.exposeFunction(
    'reportResonanceRequest',
    (url: string, body: string) => {
      capturedRequests.push({ url, body });
    },
  );

  await page.addInitScript(() => {
    const capture = (url: string, data: unknown) => {
      if (data instanceof Blob) {
        data
          .text()
          .then(body =>
            (
              window as unknown as WindowWithResonanceCapture
            ).reportResonanceRequest(url, body),
          );
      }
    };

    const originalFetch = window.fetch;
    window.fetch = (input, init) => {
      capture(String(input instanceof Request ? input.url : input), init?.body);
      return originalFetch(input, init);
    };

    const originalSendBeacon = navigator.sendBeacon.bind(navigator);
    navigator.sendBeacon = (url, data) => {
      capture(String(url), data);
      return originalSendBeacon(url, data);
    };
  });

  return capturedRequests;
};

const parseResonanceRequestBody = (
  rawBody: string,
): ResonanceRequestBody | null => {
  try {
    const parsedBody = JSON.parse(rawBody);

    return parsedBody && typeof parsedBody === 'object'
      ? (parsedBody as ResonanceRequestBody)
      : null;
  } catch {
    return null;
  }
};

export const getCapturedResonanceBodies = (
  capturedRequests: CapturedResonanceRequest[],
  resonanceBagUrl: string,
): ResonanceRequestBody[] => {
  const resonanceOrigin = new URL(resonanceBagUrl).origin;

  return capturedRequests
    .filter(({ url }) => {
      const requestUrl = new URL(url);
      return (
        requestUrl.origin === resonanceOrigin &&
        /^\/v\d+\/event$/.test(requestUrl.pathname)
      );
    })
    .map(({ body }) => parseResonanceRequestBody(body))
    .filter((body): body is ResonanceRequestBody => body !== null);
};

export const getATIParamsFromURL = (url: string): Record<string, string> => {
  const parsedUrl = new URL(url);
  return Object.fromEntries(parsedUrl.searchParams);
};

export const getAppName = (service: string): string => {
  const customServiceAppName: Record<string, string> = {
    ws: '[news]',
    romania: '[news-romanian]',
  };

  if (customServiceAppName[service]) {
    return customServiceAppName[service];
  }

  return ['archive', 'news', 'newsround', 'scotland', 'sport'].includes(service)
    ? `[${service}]`
    : `[news-${service}]`;
};

export const getResonanceAppName = (service: string): string => {
  const customServiceAppName: Record<string, string> = {
    ws: 'news',
    romania: 'news-romanian',
  };

  if (customServiceAppName[service]) {
    return customServiceAppName[service];
  }

  return `news-${service}`;
};

export const COMPONENTS = {
  SCROLLABLE_NAVIGATION: 'scrollable-navigation',
  DROPDOWN_NAVIGATION: 'dropdown-navigation',
  MOST_READ: 'most-read',
  PODCAST_PROMO: 'promo-podcast',
  PODCAST_LINKS: 'third-party',
  RECENT_AUDIO_EPISODES: 'episodes-audio',
  RADIO_SCHEDULE: 'radio-schedule',
  LITE_SITE_SUMMARY: 'lite-site-summary',
  MESSAGE_BANNER: 'message-banner',
  BILLBOARD: 'billboard',
  PORTRAIT_VIDEO_CAROUSEL: 'portrait-video-carousel',
  PORTRAIT_VIDEO_MODAL: 'portrait-video-modal',
};

export const isPageViewRequest =
  (reverbAtiUrl: string) =>
  (request: Request): boolean => {
    if (!request.url().includes(new URL(reverbAtiUrl).hostname)) return false;
    const params = new URLSearchParams(new URL(request.url()).search);
    return params.get('x8') === 'simorgh';
  };

const requestMatchesAnyHost = (request: Request, hosts: string[]): boolean => {
  const requestUrl = request.url();
  return hosts.some(host => requestUrl.includes(new URL(host).hostname));
};

export const isViewabilityViewRequest =
  (hosts: string[], component: string) =>
  (request: Request): boolean => {
    if (!requestMatchesAnyHost(request, hosts)) return false;
    const params = new URLSearchParams(new URL(request.url()).search);
    const events = params.get('events');
    if (!events) return false;
    return (
      events.includes('"event":{"category":"viewability","action":"view"}') &&
      events.includes(`"name":"${component}`)
    );
  };

export const isViewabilityClickRequest =
  (hosts: string[], component: string) =>
  (request: Request): boolean => {
    if (!requestMatchesAnyHost(request, hosts)) return false;
    const params = new URLSearchParams(new URL(request.url()).search);
    const events = params.get('events');
    if (!events) return false;
    return (
      events.includes('"event":{"category":"viewability","action":"select"}') &&
      events.includes(`"name":"${component}`)
    );
  };
