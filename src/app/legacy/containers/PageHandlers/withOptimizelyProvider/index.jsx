import React, { useContext } from 'react';
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
const TIMEOUT_INTERVAL = 5000;

if (isLive() || isInCypress) {
  setLogger(null);
}

const optimizely = createInstance({
  sdkKey: getEnvConfig().SIMORGH_OPTIMIZELY_SDK_KEY,
  eventBatchSize: 10,
  eventFlushInterval: 1000,
});

const withOptimizelyProvider = Component => {
  return props => {
    const { service } = useContext(ServiceContext);
    const isStoryBook = process.env.STORYBOOK;
    const disableOptimizely = isStoryBook || isInCypress;

    if (disableOptimizely) return <Component {...props} />;

    let mobile;

    const getUserId = () => {
      if (disableOptimizely || !onClient() || isOperaProxy()) {
        return null;
      }
      return Cookie.get('ckns_mvt') ?? null;
    };

    if (onClient()) {
      const matchMedia = window.matchMedia(
        `(max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX})`,
      );
      if (matchMedia.matches) {
        mobile = true;
      } else {
        mobile = false;
      }
    }

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
          },
        }}
      >
        <Component {...props} />
      </OptimizelyProvider>
    );
  };
};

export default withOptimizelyProvider;
