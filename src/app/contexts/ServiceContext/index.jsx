import React from 'react';
import { node, string } from 'prop-types';
import services from '../../lib/config/services';

/* Create ServiceContext using the default service */
export const ServiceContext = React.createContext(services.default);

export const ServiceContextProvider = ({ children, service }) => (
  <ServiceContext.Provider value={services[service]}>
    {children}
  </ServiceContext.Provider>
);

ServiceContextProvider.propTypes = {
  children: node.isRequired,
  service: string,
};

ServiceContextProvider.defaultProps = {
  service: 'default',
};
