import React from 'react';
import { node, string } from 'prop-types';
import services from '../../lib/config/services';
import defaultService from '../../lib/config/services/default';
import createLoadableContext from '../utils/createLoadableContext';

/* Create ServiceContext using the default service */
export const ServiceContext = React.createContext(defaultService);

/*
*
* It's important to note that this requires that you declare all of your loadable
* components when modules are initialized rather than when your app is being rendered.
* https://github.com/jamiebuilds/react-loadable#loadablepreloadall
* 
*/
const loadableContexts = {};

Object.keys(services).map(service => {
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
