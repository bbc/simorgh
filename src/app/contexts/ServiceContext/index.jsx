import React, { Fragment } from 'react';
import { node, string } from 'prop-types';
import services from '../../lib/config/services';

import GlobalStyle from '../../lib/globalStyles';
/* Create ServiceContext using the default service */
export const ServiceContext = React.createContext(services.default);

export const ServiceContextProvider = ({ children, service }) => {
  const { fonts } = services[service];

  return (
    <Fragment>
      <GlobalStyle fonts={fonts} />
      <ServiceContext.Provider value={services[service]}>
        {children}
      </ServiceContext.Provider>
    </Fragment>
  );
};

ServiceContextProvider.propTypes = {
  children: node.isRequired,
  service: string,
};

ServiceContextProvider.defaultProps = {
  service: 'default',
};
