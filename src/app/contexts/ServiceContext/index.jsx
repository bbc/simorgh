import React from 'react';
import { node, string, oneOf } from 'prop-types';
import services from '../../lib/config/services/loadableConfig';
import createLoadableContext from '../utils/createLoadableContext';

/* Create ServiceContext using the default service */
export const ServiceContext = React.createContext({});

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

export const ServiceContextProvider = ({ children, service, variant }) => {
  const LoadableServiceContextProvider = loadableContexts[service];

  if (!LoadableServiceContextProvider) {
    return null;
  }

  return (
    <LoadableServiceContextProvider configKey={variant || 'default'}>
      {children}
    </LoadableServiceContextProvider>
  );
};

ServiceContextProvider.propTypes = {
  children: node.isRequired,
  service: string,
  variant: oneOf(['simp', 'trad', 'lat', 'cyr']),
};

ServiceContextProvider.defaultProps = {
  service: 'default',
  variant: null,
};
