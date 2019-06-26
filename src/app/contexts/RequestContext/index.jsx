import React from 'react';
import { bool, node, oneOf, string } from 'prop-types';

export const RequestContext = React.createContext('default');

export const RequestContextProvider = ({
  children,
  env,
  id,
  isUK,
  origin,
  pageType,
  platform,
  statsDestination,
  statsPageIdentifier,
  previousPath,
}) => {
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
  children: node.isRequired,
  env: string,
  id: string,
  pageType: oneOf(['article', 'frontPage']).isRequired,
  platform: string.isRequired,
  isUK: bool.isRequired,
  origin: string.isRequired,
  statsDestination: string.isRequired,
  statsPageIdentifier: string.isRequired,
  previousPath: string,
};

RequestContextProvider.defaultProps = {
  id: null,
  env: 'local',
  previousPath: null,
};
