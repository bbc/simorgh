import React from 'react';
import { bool, node, oneOf, string } from 'prop-types';
import getStatsDestination from './getStatsDestination';
import getStatsPageIdentifier from './getStatsPageIdentifier';
import getOriginContext from './getOriginContext';
import getEnv from './getEnv';

export const RequestContext = React.createContext('default');

export const RequestContextProvider = ({
  children,
  bbcOrigin,
  id,
  isAmp,
  pageType,
  service,
  previousPath,
}) => {
  const { isUK, origin } = getOriginContext(bbcOrigin);
  const env = getEnv(origin);
  const platform = isAmp ? 'amp' : 'canonical';
  const statsDestination = getStatsDestination({
    isUK,
    env,
    service,
  });
  const statsPageIdentifier = getStatsPageIdentifier({
    pageType,
    service,
    id,
  });

  const value = {
    env,
    id,
    isUK,
    origin,
    pageType,
    platform,
    statsDestination,
    statsPageIdentifier,
    previousPath,
  };

  return (
    <RequestContext.Provider value={value}>{children}</RequestContext.Provider>
  );
};

RequestContextProvider.propTypes = {
  bbcOrigin: string,
  children: node.isRequired,
  id: string,
  isAmp: bool.isRequired,
  pageType: oneOf(['article', 'frontPage', 'media']).isRequired,
  service: string.isRequired,
  previousPath: string,
};

RequestContextProvider.defaultProps = {
  bbcOrigin: null,
  id: null,
  previousPath: null,
};
