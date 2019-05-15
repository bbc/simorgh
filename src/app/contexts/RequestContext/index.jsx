import React from 'react';
import { bool, node, number, string } from 'prop-types';

export const RequestContext = React.createContext('default');

export const RequestContextProvider = ({
  children,
  id,
  isUK,
  origin,
  platform,
  statsDestination,
  statsPageIdentifier,
}) => {
  const value = {
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
  id: string.isRequired,
  platform: string.isRequired,
  isUK: bool.isRequired,
  origin: string.isRequired,
  statsDestination: number.isRequired,
  statsPageIdentifier: string.isRequired,
};
