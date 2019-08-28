import React from 'react';
import { node, string } from 'prop-types';
import services from '../../../lib/config/services';

/*
 * This file is mocked by default to avoid having to handle
 * async behavior in tests across the application when
 * using service contexts.
 */
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
