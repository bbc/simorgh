import React from 'react';
import { func, node, string } from 'prop-types';
import services from '../../lib/config/services';

/* Create ServiceContext using the default service */
export const ServiceContext = React.createContext(services.default);

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
  children: func.isRequired,
};
