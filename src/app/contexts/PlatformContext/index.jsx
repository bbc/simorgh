import React from 'react';
import { node, string, func } from 'prop-types';
import getOriginContext from './getOriginContext';

const PlatformContext = React.createContext('default');

export const PlatformContextProvider = ({ children, platform, bbcOrigin }) => {
  const value = {
    platform,
    ...getOriginContext(bbcOrigin),
  };

  return (
    <PlatformContext.Provider value={value}>
      {children}
    </PlatformContext.Provider>
  );
};

export const PlatformContextConsumer = ({ children }) => (
  <PlatformContext.Consumer>{children}</PlatformContext.Consumer>
);

PlatformContextProvider.propTypes = {
  children: node.isRequired,
  platform: string.isRequired,
  bbcOrigin: string,
};

PlatformContextProvider.defaultProps = {
  bbcOrigin: null,
};

PlatformContextConsumer.propTypes = {
  children: func.isRequired,
};
