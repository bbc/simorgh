import React, { useContext } from 'react';
import { createInstance, OptimizelyProvider } from '@optimizely/react-sdk';

const optimizely = createInstance({
  sdkKey: process.env.SIMORGH_OPTIMIZELY_SDK_KEY,
  eventBatchSize: 100,
  eventFlushInterval: 1000,
});

const withOptimizely = Component => {
  // const { service } = useContext(ServiceContext);
  return props => (
    <OptimizelyProvider
      optimizely={optimizely}
      user={{
        id: 'default_user',
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
