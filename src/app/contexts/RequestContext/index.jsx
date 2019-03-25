import React from 'react';
import { node, string, func } from 'prop-types';
import getOriginContext from './getOriginContext';

const RequestContext = React.createContext('default');

export const RequestContextProvider = ({ children, platform, bbcOrigin }) => {
  const value = {
    platform,
    ...getOriginContext(bbcOrigin),
  };

  return (
    <RequestContext.Provider value={value}>{children}</RequestContext.Provider>
  );
};

export const RequestContextConsumer = ({ children }) => (
  <RequestContext.Consumer>{children}</RequestContext.Consumer>
);

RequestContextProvider.propTypes = {
  children: node.isRequired,
  platform: string.isRequired,
  bbcOrigin: string,
};

RequestContextProvider.defaultProps = {
  bbcOrigin: null,
};

RequestContextConsumer.propTypes = {
  children: func.isRequired,
};
