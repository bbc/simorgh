import React, { useState, useEffect } from 'react';
import { func, node, string } from 'prop-types';
import services from '../../lib/config/services';
import nodeLogger from '../../helpers/logger.node';

const logger = nodeLogger(__filename);

/* Create ServiceContext using the default service */
export const ServiceContext = React.createContext(services.default);

export const ServiceContextProvider = ({ children, service }) => {
  const [value, setValue] = useState(services.default);

  useEffect(() => {
    services[service]()
      .then(newValue => newValue.default)
      .then(setValue)
      .catch(e => logger.error(e));
  }, []);

  return (
    <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>
  );
};

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
