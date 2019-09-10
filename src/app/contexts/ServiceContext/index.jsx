import React from 'react';
import { node, string } from 'prop-types';
import services from '../../lib/config/services/loadableConfig';

/* Create ServiceContext using the default service */
export const ServiceContext = React.createContext({});

export const withContext = data => ({ children }) => (
  <ServiceContext.Provider value={data}>{children}</ServiceContext.Provider>
);

export const ServiceContextProvider = ({ children, service }) => {
  const LoadableServiceContextProvider = services[service];

  if (!LoadableServiceContextProvider) {
    return null;
  }

  return (
    <LoadableServiceContextProvider>{children}</LoadableServiceContextProvider>
  );
};

ServiceContextProvider.propTypes = {
  children: node.isRequired,
  service: string,
};

ServiceContextProvider.defaultProps = {
  service: 'default',
};
