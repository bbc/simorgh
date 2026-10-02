import Cookie from 'js-cookie';
import type { ReactSDKClient } from '@optimizely/react-sdk';
import onClient from '#lib/utilities/onClient';
import isOperaProxy from '#app/lib/utilities/isOperaProxy';
import { TOKEN_COOKIE_NAME } from '#app/lib/uasApi/tokenRefresh/tokenManager';
import registerVisitActivity from './visitTracking';

const PAGE_VIEW_EVENT_NAME = 'page-views';
const SIGNED_IN_PAGE_VIEW_EVENT_NAME = 'signed-in-page-views';
const VISIT_EVENT_NAME = 'visit';
let lastTrackedUrl: string | null = null;

const isSignedIn = () => {
  if (!onClient() || isOperaProxy()) return false;
  return Boolean(Cookie.get(TOKEN_COOKIE_NAME));
};

const trackPageEvents = (optimizely: ReactSDKClient) => {
  if (!onClient() || isOperaProxy()) return false;

  const currentUrl = window.location.pathname + window.location.search;
  if (currentUrl === lastTrackedUrl) return false;

  lastTrackedUrl = currentUrl;

  // The visit (denominator) must be sent before the page view (numerator).
  if (registerVisitActivity(Date.now())) {
    optimizely.track(VISIT_EVENT_NAME);
  }

  optimizely.track(PAGE_VIEW_EVENT_NAME);

  if (isSignedIn()) {
    optimizely.track(SIGNED_IN_PAGE_VIEW_EVENT_NAME);
  }

  return true;
};

const resetTrackedPageEvents = () => {
  lastTrackedUrl = null;
};

export default trackPageEvents;
export { resetTrackedPageEvents };
