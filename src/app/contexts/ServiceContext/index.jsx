import React from 'react';
import { node, string } from 'prop-types';
import services from '../../lib/config/services/loadableConfig';
import defaultService from '../../lib/config/services/default';
import createLoadableContext from '../utils/createLoadableContext';

/* Create ServiceContext using the default service */
export const ServiceContext = React.createContext(defaultService);

/*
 *
 * It's important that we declare all the loadableContexts when modules
 * are initialized rather than when the app is being rendered.
 *
 * This is why an object of loadableContexts is created on initialisation,
 * rather than dynamically creating them on demand.
 *
 * https://github.com/jamiebuilds/react-loadable#loadablepreloadall
 *
 */
const loadableContexts = {};

Object.keys(services).forEach(service => {
  loadableContexts[service] = createLoadableContext(
    ServiceContext,
    services[service],
  );
});

export const ServiceContextProvider = ({ children, service }) => {
  const LoadableServiceContextProvider = loadableContexts[service];

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
