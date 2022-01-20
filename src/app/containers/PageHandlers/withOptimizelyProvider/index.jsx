import React, { useContext } from 'react';
import {
  createInstance,
  OptimizelyProvider,
  setLogger,
} from '@optimizely/react-sdk';
import { ServiceContext } from '#contexts/ServiceContext';
import { getAtUserId } from '#lib/analyticsUtils';
import isLive from '#lib/utilities/isLive';
import { GEL_GROUP_3_SCREEN_WIDTH_MAX } from '@bbc/gel-foundations/dist/breakpoints';
import onClient from '#lib/utilities/onClient';

if (isLive()) {
  setLogger(null);
}

const optimizely = createInstance({
  sdkKey: process.env.SIMORGH_OPTIMIZELY_SDK_KEY,
  eventBatchSize: 10,
  eventFlushInterval: 1000,
});

const withOptimizelyProvider = (Component, noUserId = false) => {
  return props => {
    const { service } = useContext(ServiceContext);
    let mobile;

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
        timeout={500}
        user={{
          id: noUserId ? null : getAtUserId(),
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
