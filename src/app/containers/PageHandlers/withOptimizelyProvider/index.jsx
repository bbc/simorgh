import React, { useState, useContext } from 'react';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/dist/breakpoints';
import { createInstance, OptimizelyProvider } from '@optimizely/react-sdk';
import { ServiceContext } from '#contexts/ServiceContext';
import { getAtUserId } from '#lib/analyticsUtils';
import useMediaQuery from '#app/hooks/useMediaQuery';

const optimizely = createInstance({
  sdkKey: process.env.SIMORGH_OPTIMIZELY_SDK_KEY,
  eventBatchSize: 100,
  eventFlushInterval: 1000,
});

const mobileHelper = async (setIsMobile, x) => {
  x(`(max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN})`, event => {
    console.log('WITHIN EVENT:', event);
    setIsMobile(event.matches);
  });
};

const withOptimizelyProvider = Component => {
  return async props => {
    const { service } = useContext(ServiceContext);
    const [isMobile, setIsMobile] = useState(false);
    await mobileHelper(setIsMobile, useMediaQuery);
    console.log('MOBILE:', isMobile);

    return (
      <OptimizelyProvider
        optimizely={optimizely}
        isServerSide
        timeout={500}
        user={{
          id: getAtUserId(),
          attributes: {
            service,
            mobile: isMobile,
          },
        }}
      >
        <Component {...props} />
      </OptimizelyProvider>
    );
  };
};

export default withOptimizelyProvider;
