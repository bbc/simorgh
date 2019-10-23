import React from 'react';
import { node, string } from 'prop-types';
import services from '#server/utilities/serviceConfigs';

/*
 * This file is mocked by default to avoid having to handle
 * async behavior in tests across the application when
 * using service contexts.
 */
export const ServiceContext = React.createContext({});

export const ServiceContextProvider = ({ children, service, variant }) => (
  <ServiceContext.Provider value={services[service][variant || 'default']}>
    {children}
  </ServiceContext.Provider>
);

ServiceContextProvider.propTypes = {
  children: node.isRequired,
  service: string.isRequired,
  variant: string,
};

ServiceContextProvider.defaultProps = {
  variant: 'default',
};
