import React from 'react';
import { node, string } from 'prop-types';
import getOriginContext from './getOriginContext';
import getStatsDestination from './getStatsDestination';
import getStatsPageIdentifier from './getStatsPageIdentifier';

export const RequestContext = React.createContext('default');

export const RequestContextProvider = ({
  id,
  children,
  platform,
  bbcOrigin,
}) => {
  const { isUK, origin } = getOriginContext(bbcOrigin);
  const env = process.env.APP_ENV;
  const pageType = 'article'; // should get value from page path
  const service = 'news'; // should get value from page path

  const value = {
    id,
    isUK,
    origin,
    platform,
    statsDestination: getStatsDestination(isUK, env, service),
    statsPageIdentifier: getStatsPageIdentifier(service, pageType),
  };

  return (
    <RequestContext.Provider value={value}>{children}</RequestContext.Provider>
  );
};

RequestContextProvider.propTypes = {
  children: node.isRequired,
  id: string.isRequired,
  platform: string.isRequired,
  bbcOrigin: string,
};

RequestContextProvider.defaultProps = {
  bbcOrigin: null,
};
