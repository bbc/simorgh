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
import { ServiceContext } from '../../../../contexts/ServiceContext';
import isCypress from './isCypress';

const isInCypress = isCypress();
const TIMEOUT_INTERVAL = 1000;

if (isLive() || isInCypress) {
  setLogger(null);
}

const optimizely = createInstance({
  sdkKey: getEnvConfig().SIMORGH_OPTIMIZELY_SDK_KEY,
  eventBatchSize: 10,
  eventFlushInterval: 1000,
});

const isMobile = () => {
  if (onClient()) {
    const matchMedia = window.matchMedia(
      `(max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX})`,
    );

    if (matchMedia.matches) return true;

    return false;
  }

  return null;
};

export const DIRECT_DOMAINS = ['bbc.com'];

export const SEARCH_DOMAINS = [
  'google',
  'bing',
  'msn',
  'yahoo',
  'duckduckgo',
  'yandex',
  'ecosia',
];

export const SOCIAL_DOMAINS = [
  'facebook',
  'instagram',
  't.co',
  'youtube',
  'threads',
  'linkin',
];

export const SOCIAL_AT_PARAM_VALUES = ['social', 'social_flow', 'ws_whatsapp'];

const getReferrer = () => {
  if (onClient()) {
    const referrer = document?.referrer?.toLowerCase();

    const urlParams = new URLSearchParams(window.location.search);
    const atParam = urlParams.get('at_campaign') || urlParams.get('at_medium');

    if (SEARCH_DOMAINS.some(domain => referrer.includes(domain)))
      return 'search';

    if (SOCIAL_DOMAINS.some(domain => referrer.includes(domain)))
      return 'social';

    if (atParam && SOCIAL_AT_PARAM_VALUES.includes(atParam.toLowerCase()))
      return 'social';

    if (DIRECT_DOMAINS.some(domain => referrer.includes(domain)))
      return 'direct';

    if (!referrer) return 'direct';
  }

  return null;
};

const withOptimizelyProvider = Component => {
  return props => {
    const { service } = use(ServiceContext);
    const isStoryBook = process.env.STORYBOOK;
    const disableOptimizely = isStoryBook || isInCypress;

    if (disableOptimizely) return <Component {...props} />;

    const mobile = isMobile();
    const referrer = getReferrer();

    const getUserId = () => {
      if (disableOptimizely || !onClient() || isOperaProxy()) {
        return null;
      }
      return Cookie.get('ckns_mvt') ?? null;
    };

    return (
      <OptimizelyProvider
        optimizely={optimizely}
        isServerSide
        timeout={TIMEOUT_INTERVAL}
        user={{
          id: getUserId(),
          attributes: {
            service,
            mobile,
            referrer,
          },
        }}
      >
        <Component {...props} />
      </OptimizelyProvider>
    );
  };
};

export default withOptimizelyProvider;
