import React from 'react';
import getStatsDestination from '../../contexts/RequestContext/getStatsDestination';
import getStatsPageIdentifier from '../../contexts/RequestContext/getStatsPageIdentifier';
import getOriginContext from '../../contexts/RequestContext/getOriginContext';
import getEnv from '../../contexts/RequestContext/getEnv';
import FeatureFlagUpdater from '../FeatureFlagUpdater';

import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { FeatureFlagContextProvider } from '../../contexts/FeatureFlagContext';

const WithContexts = Component => {
  const WithContextsContainer = props => {
    const { bbcOrigin, service, id, isAmp } = props;
    const { isUK, origin } = getOriginContext(bbcOrigin);
    const env = getEnv(origin);
    const pageType = 'article';
    return (
      <FeatureFlagContextProvider>
        <ServiceContextProvider service={service}>
          <RequestContextProvider
            env={env}
            id={id}
            isUK={isUK}
            origin={origin}
            pageType={pageType}
            platform={isAmp ? 'amp' : 'canonical'}
            statsDestination={getStatsDestination({
              isUK,
              env,
              service,
            })}
            statsPageIdentifier={getStatsPageIdentifier({
              pageType,
              service,
              id,
            })}
          >
            <FeatureFlagUpdater />
            <Component {...props} />
          </RequestContextProvider>
        </ServiceContextProvider>
      </FeatureFlagContextProvider>
    );
  };

  return WithContextsContainer;
};

export default WithContexts;
