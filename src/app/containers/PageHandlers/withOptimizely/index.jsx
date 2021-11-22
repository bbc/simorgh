import React from 'react';
import { createInstance, OptimizelyProvider } from '@optimizely/react-sdk';

const optimizely = createInstance({
  sdkKey: process.env.SIMORGH_OPTIMIZELY_SDK_KEY,
  eventBatchSize: 100,
  eventFlushInterval: 1000,
});

const withOptimizely = Component => {
  return props => (
    <OptimizelyProvider
      isServerSide
      optimizely={optimizely}
      user={{
        id: 'default_user1',
        attributes: {
          service: 'mundo',
        },
      }}
    >
      <Component {...props} />
    </OptimizelyProvider>
  );
};

export default withOptimizely;
