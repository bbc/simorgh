import React from 'react';
import { func, node, string } from 'prop-types';

export const PlatformContext = React.createContext(/* services.default */);

export const PlatformContextProvider = ({ children, platform }) => (
  <PlatformContext.Provider value={{ platform }}>
    {children}
  </PlatformContext.Provider>
);

export const PlatformContextConsumer = ({ children }) => (
  <PlatformContext.Consumer>{children}</PlatformContext.Consumer>
);

PlatformContextProvider.propTypes = {
  children: node.isRequired,
  platform: string,
};

PlatformContextProvider.defaultProps = {
  platform: 'canonical',
};

PlatformContextConsumer.propTypes = {
  children: func.isRequired,
};
