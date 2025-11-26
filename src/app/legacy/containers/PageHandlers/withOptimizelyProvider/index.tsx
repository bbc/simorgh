import React, { use } from 'react';
import {
  createInstance,
  OptimizelyProvider,
  setLogger,
} from '@optimizely/react-sdk';
import isLive from '#lib/utilities/isLive';
import onClient from '#lib/utilities/onClient';
import { GEL_GROUP_3_SCREEN_WIDTH_MAX } from '#psammead/gel-foundations/src/breakpoints';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import Cookie from 'js-cookie';
import isOperaProxy from '#app/lib/utilities/isOperaProxy';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import isCypress from './isCypress';

const isInCypress = isCypress();
const isStoryBook = process.env.STORYBOOK;
const disableOptimizely = isStoryBook || isInCypress;

const TIMEOUT_INTERVAL = 1000;

if (isLive() || isInCypress) {
  setLogger(null);
}

const optimizely = createInstance({
  sdkKey: getEnvConfig().SIMORGH_OPTIMIZELY_SDK_KEY,
  eventBatchSize: 10,
  eventFlushInterval: 1000,
});

const getUserId = () => {
  if (disableOptimizely || !onClient() || isOperaProxy()) return null;

  return Cookie.get('ckns_mvt') ?? null;
};

const isMobile = () => {
  if (onClient()) {
    const matchMedia = window.matchMedia(
      `(max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX})`,
    );

    if (matchMedia.matches) return true;

    return false;
  }

  return false;
};

export const REFERRER_CATEGORIES = {
  DIRECT: ['bbc.com'],
  SEARCH: ['google', 'bing', 'msn', 'yahoo', 'duckduckgo', 'yandex', 'ecosia'],
  SOCIAL: ['facebook', 'instagram', 't.co', 'youtube', 'threads', 'linkin'],
  AT_PARAM_VALUES: ['social', 'social_flow', 'ws_whatsapp'],
};

const getReferrer = () => {
  if (onClient()) {
    const referrer = document?.referrer?.toLowerCase();

    const urlParams = new URLSearchParams(window.location.search);
    const atParam = urlParams.get('at_campaign') || urlParams.get('at_medium');

    if (REFERRER_CATEGORIES.SEARCH.some(domain => referrer.includes(domain)))
      return 'search';

    if (REFERRER_CATEGORIES.SOCIAL.some(domain => referrer.includes(domain)))
      return 'social';

    if (
      atParam &&
      REFERRER_CATEGORIES.AT_PARAM_VALUES.includes(atParam.toLowerCase())
    )
      return 'social';

    if (REFERRER_CATEGORIES.DIRECT.some(domain => referrer.includes(domain)))
      return 'direct';

    if (!referrer) return 'direct';
  }

  return null;
};

export const COUNTRY_CODES_TO_EXPERIMENT = [
  'es',
  'mx',
  'ar',
  'co',
  'us',
  'cl',
  've',
  'uy',
  'do',
];

const isCountryKnown = country => {
  if (!country) return false;

  return COUNTRY_CODES_TO_EXPERIMENT.includes(country.toLowerCase());
};

const withOptimizelyProvider = Component => {
  return props => {
    if (disableOptimizely) return <Component {...props} />;

    const { service } = use(ServiceContext);
    const { country } = use(RequestContext);

    const id = getUserId();
    const mobile = isMobile();
    const referrer = getReferrer();
    const countryKnown = isCountryKnown(country);

    return (
      <OptimizelyProvider
        optimizely={optimizely}
        isServerSide
        timeout={TIMEOUT_INTERVAL}
        user={{
          id,
          attributes: {
            service,
            mobile,
            referrer,
            countryKnown,
          },
        }}
      >
        <Component {...props} />
      </OptimizelyProvider>
    );
  };
};

export default withOptimizelyProvider;
