import React from 'react';
import { node, string } from 'prop-types';
import services from '../../lib/config/services';

/* Create ServiceContext using the default service */
const ServiceContext = React.createContext(services.default);

export const ServiceContextProvider = ({ children, service }) => (
  <ServiceContext.Provider value={services[service]}>
    {children}
  </ServiceContext.Provider>
);

export const ServiceContextConsumer = ({ children }) => (
  <ServiceContext.Consumer>{children}</ServiceContext.Consumer>
);

ServiceContextProvider.propTypes = {
  children: node.isRequired,
  service: string,
};

ServiceContextProvider.defaultProps = {
  service: 'default',
};

ServiceContextConsumer.propTypes = {
  children: node.isRequired,
};
