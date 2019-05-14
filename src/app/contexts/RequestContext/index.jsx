import React from 'react';
import { node, string } from 'prop-types';
import getOriginContext from './getOriginContext';

export const RequestContext = React.createContext('default');

export const RequestContextProvider = ({ children, platform, bbcOrigin }) => {
  const value = {
    platform,
    ...getOriginContext(bbcOrigin),
  };

  return (
    <RequestContext.Provider value={value}>{children}</RequestContext.Provider>
  );
};

RequestContextProvider.propTypes = {
  children: node.isRequired,
  platform: string.isRequired,
  bbcOrigin: string,
};

RequestContextProvider.defaultProps = {
  bbcOrigin: null,
};
