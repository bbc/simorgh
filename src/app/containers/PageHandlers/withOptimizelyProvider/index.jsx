import React, { useContext } from 'react';
import {
  createInstance,
  OptimizelyProvider,
  setLogger,
} from '@optimizely/react-sdk';
import { v4 as uuid } from 'uuid';
import Cookie from 'js-cookie';
import { ServiceContext } from '#contexts/ServiceContext';
import isLive from '#lib/utilities/isLive';
import onClient from '#lib/utilities/onClient';
import isOperaProxy from '#lib/utilities/isOperaProxy';

if (isLive()) {
  setLogger(null);
}

const getCknsMvt = () => {
  // Users accessing the site on opera "extreme data saving mode" have the pages rendered by an intermediate service
  // Attempting to track these users is just tracking that proxy, causing all opera mini visitors to have the same id
  if (!onClient() || isOperaProxy()) return null;

  const cookieName = 'ckns_mvt';
  const cookieValue = Cookie.get(cookieName);
  const expires = 365; // expires in 12 Months

  if (!cookieValue) {
    const cookieUuid = uuid();
    Cookie.set(cookieName, uuid(), { expires, path: '/' });
    return cookieUuid;
  }

  return cookieValue;
};

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
      return getCknsMvt();
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
