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

  return undefined;
};

const getReferrer = () => {
  if (onClient()) {
    // TODO: Will be implemented in https://bbc.atlassian.net/browse/WS-947
  }

  return undefined;
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
