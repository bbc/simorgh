import type { Request } from '@playwright/test';

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

export const getATIUrls = (env: AppEnv) => ({
  atiUrl: atiUrlByEnv[env],
  reverbAtiUrl: reverbAtiUrlByEnv[env],
});

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

export const COMPONENTS = {
  SCROLLABLE_NAVIGATION: 'scrollable-navigation',
  DROPDOWN_NAVIGATION: 'dropdown-navigation',
};

export const isPageViewRequest =
  (reverbAtiUrl: string) =>
  (request: Request): boolean => {
    const { url } = request;
    if (!url().includes(new URL(reverbAtiUrl).hostname)) return false;
    const params = new URLSearchParams(new URL(url()).search);
    return params.get('x8') === 'simorgh';
  };

export const isViewabilityViewRequest =
  (reverbAtiUrl: string, component: string) =>
  (request: Request): boolean => {
    const { url } = request;
    if (!url().includes(new URL(reverbAtiUrl).hostname)) return false;
    const params = new URLSearchParams(new URL(url()).search);
    const events = params.get('events');
    if (!events) return false;
    return (
      events.includes('"event":{"category":"viewability","action":"view"}') &&
      events.includes(`"name":"${component}`)
    );
  };

export const isViewabilityClickRequest =
  (reverbAtiUrl: string, component: string) =>
  (request: Request): boolean => {
    const { url } = request;
    if (!url().includes(new URL(reverbAtiUrl).hostname)) return false;
    const params = new URLSearchParams(new URL(url()).search);
    const events = params.get('events');
    if (!events) return false;
    return (
      events.includes('"event":{"category":"viewability","action":"select"}') &&
      events.includes(`"name":"${component}`)
    );
  };
