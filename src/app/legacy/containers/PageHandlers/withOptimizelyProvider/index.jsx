import React, { useContext } from 'react';
import {
  createInstance,
  OptimizelyProvider,
  setLogger,
} from '@optimizely/react-sdk';
import isLive from '#lib/utilities/isLive';
import onClient from '#lib/utilities/onClient';
import { GEL_GROUP_3_SCREEN_WIDTH_MAX } from '#psammead/gel-foundations/src/breakpoints';
import { ServiceContext } from '../../../../contexts/ServiceContext';
import getOptimizelyUserId from './getOptimizelyUserId';

// 004_brasil_recommendations_experiment
const isCypress = onClient() && window.Cypress;

if (isLive() || isCypress) {
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
    const disableOptimizely = isStoryBook;
    let mobile;

    const getUserId = () => {
      if (disableOptimizely) {
        return null;
      }
      return getOptimizelyUserId();
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
        timeout={1000}
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
