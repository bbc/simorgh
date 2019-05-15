import React from 'react';
import { node, number, string } from 'prop-types';
import getOriginContext from './getOriginContext';

export const RequestContext = React.createContext('default');

export const RequestContextProvider = ({
  id,
  children,
  platform,
  bbcOrigin,
  statsDestination,
  statsPageIdentifier,
}) => {
  const { isUK, origin } = getOriginContext(bbcOrigin);

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
  bbcOrigin: string,
  statsDestination: number.isRequired,
  statsPageIdentifier: string.isRequired,
};

RequestContextProvider.defaultProps = {
  bbcOrigin: null,
};
