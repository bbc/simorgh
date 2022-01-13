import React, { useContext } from 'react';
import {
  createInstance,
  OptimizelyProvider,
  setLogger,
} from '@optimizely/react-sdk';
import { ServiceContext } from '#contexts/ServiceContext';
import { getAtUserId } from '#lib/analyticsUtils';
import isLive from '#lib/utilities/isLive';
import onClient from '#lib/utilities/onClient';

if (isLive()) {
  setLogger(null);
}

const optimizely = onClient
  ? null
  : createInstance({
      sdkKey: process.env.SIMORGH_OPTIMIZELY_SDK_KEY,
      eventBatchSize: 10,
      eventFlushInterval: 1000,
    });

const withOptimizelyProvider = (Component, noUserId = false) => {
  return props => {
    const { service } = useContext(ServiceContext);
    if (optimizely != null) {
      return (
        <OptimizelyProvider
          optimizely={optimizely}
          isServerSide
          timeout={500}
          user={{
            id: noUserId ? null : getAtUserId(),
            attributes: {
              service,
            },
          }}
        >
          <Component {...props} />
        </OptimizelyProvider>
      );
    }
    return <Component {...props} />;
  };
};

export default withOptimizelyProvider;
