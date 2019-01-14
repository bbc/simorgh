import React from 'react';
import { node, string, func } from 'prop-types';

const PlatformContext = React.createContext('default');

export const PlatformContextProvider = ({ children, platform }) => (
  <PlatformContext.Provider value={platform}>
    {children}
  </PlatformContext.Provider>
);

export const PlatformContextConsumer = ({ children }) => (
  <PlatformContext.Consumer>{children}</PlatformContext.Consumer>
);

PlatformContextProvider.propTypes = {
  children: node.isRequired,
  platform: string.isRequired,
};

PlatformContextConsumer.propTypes = {
  children: func.isRequired,
};
