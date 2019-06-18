import React from 'react';
import { bool, node, string } from 'prop-types';

export const RequestContext = React.createContext('default');

export const RequestContextProvider = ({
  children,
  env,
  id,
  isUK,
  origin,
  platform,
  statsDestination,
  statsPageIdentifier,
}) => {
  const value = {
    env,
    id,
    isUK,
    origin,
    platform,
    statsDestination,
    statsPageIdentifier,
  };

  return (
    <RequestContext.Provider value={value}>{children}</RequestContext.Provider>
  );
};

RequestContextProvider.propTypes = {
  children: node.isRequired,
  env: string,
  id: string,
  platform: string.isRequired,
  isUK: bool.isRequired,
  origin: string.isRequired,
  statsDestination: string.isRequired,
  statsPageIdentifier: string.isRequired,
};

RequestContextProvider.defaultProps = {
  id: null,
  env: 'local',
};
