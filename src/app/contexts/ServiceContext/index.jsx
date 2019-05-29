import React from 'react';
import { node, string } from 'prop-types';
import services from '../../lib/config/services';
import defaultService from '../../lib/config/services/default';
import createLoadableContext from '../utils/createLoadableContext';

/* Create ServiceContext using the default service */
export const ServiceContext = React.createContext(defaultService);

export const ServiceContextProvider = ({ children, service }) => {
  const dynamicService = services[service];

  if (!dynamicService) {
  	return null;
  }

  const LoadableServiceContextProvider = createLoadableContext(
    ServiceContext,
    dynamicService,
  );

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
