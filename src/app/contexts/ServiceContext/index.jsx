import React from 'react';
import { node, string } from 'prop-types';
import services from '#lib/config/services/loadableConfig';
import { getVariant } from '../../lib/utilities/variantHandler';
import variantPropType from '../../models/propTypes/variants';

/* Create ServiceContext using the default service */
export const ServiceContext = React.createContext({});

export const withContext = data => {
  const LoadedServiceContextProvider = ({ configKey, children }) => (
    <ServiceContext.Provider value={data[configKey]}>
      {children}
    </ServiceContext.Provider>
  );

  LoadedServiceContextProvider.propTypes = {
    children: node.isRequired,
    configKey: string,
  };

  LoadedServiceContextProvider.defaultProps = {
    configKey: null,
  };

  return LoadedServiceContextProvider;
};

export const ServiceContextProvider = ({ children, service, variant }) => {
  const LoadableServiceContextProvider = services[service];

  if (!LoadableServiceContextProvider) {
    return null;
  }

  return (
    <LoadableServiceContextProvider
      configKey={getVariant({ service, variant })}
    >
      {children}
    </LoadableServiceContextProvider>
  );
};

ServiceContextProvider.propTypes = {
  children: node.isRequired,
  service: string,
  variant: variantPropType,
};

ServiceContextProvider.defaultProps = {
  service: 'default',
  variant: null,
};
