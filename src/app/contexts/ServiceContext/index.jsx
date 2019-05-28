import React from 'react';
import { node, string } from 'prop-types';
import services from '../../lib/config/services';

import GlobalStyle from '../../lib/globalStyles';
/* Create ServiceContext using the default service */
export const ServiceContext = React.createContext(services.default);

export const ServiceContextProvider = ({ children, service }) => {
  const { fonts } = services[service];

  return (
    <ServiceContext.Provider value={services[service]}>
      <GlobalStyle fonts={fonts} />
      {children}
    </ServiceContext.Provider>
  );
};

ServiceContextProvider.propTypes = {
  children: node.isRequired,
  service: string,
};

ServiceContextProvider.defaultProps = {
  service: 'default',
};
