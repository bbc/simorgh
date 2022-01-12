import React, { useContext } from 'react';
import {
  createInstance,
  OptimizelyProvider,
  setLogger,
} from '@optimizely/react-sdk';
import { ServiceContext } from '#contexts/ServiceContext';
import isLive from '#lib/utilities/isLive';
import getOptimizelyUserId from './getOptimizelyUserId';

if (isLive()) {
  setLogger(null);
}

const optimizely = createInstance({
  sdkKey: process.env.SIMORGH_OPTIMIZELY_SDK_KEY,
  eventBatchSize: 10,
  eventFlushInterval: 1000,
});

const withOptimizelyProvider = Component => {
  return props => {
    const { service } = useContext(ServiceContext);
    const isStoryBook = process.env.STORYBOOK;
    const disableOptimizely = isStoryBook || isLive();

    const getUserId = () => {
      if (disableOptimizely) {
        return null;
      }
      return getOptimizelyUserId();
    };

    return (
      <OptimizelyProvider
        optimizely={optimizely}
        isServerSide
        timeout={500}
        user={{
          id: getUserId(),
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
