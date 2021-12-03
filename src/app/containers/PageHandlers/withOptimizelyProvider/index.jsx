import React, { useContext } from 'react';
import { createInstance, OptimizelyProvider } from '@optimizely/react-sdk';
import { ServiceContext } from '#contexts/ServiceContext';
import { getAtUserId } from '#lib/analyticsUtils';

const optimizely = createInstance({
  sdkKey: process.env.SIMORGH_OPTIMIZELY_SDK_KEY,
  eventBatchSize: 100,
  eventFlushInterval: 1000,
});

const withOptimizelyProvider = Component => {
  return props => {
    const { service } = useContext(ServiceContext);

    return (
      <OptimizelyProvider
        optimizely={optimizely}
        isServerSide
        timeout={500}
        user={{
          id: getAtUserId(),
          attributes: {
            service,
          },
        }}
      >
        <Component {...props} />
      </OptimizelyProvider>
    );
  };
};

export default withOptimizelyProvider;
