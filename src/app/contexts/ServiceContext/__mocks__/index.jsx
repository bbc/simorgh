import React from 'react';
import { node, string } from 'prop-types';
import services from '#server/utilities/serviceConfigs';
import { getVariant } from '#lib/utilities/variantHandler';
import getLangOverride from '#lib/utilities/langHandler';
/*
 * This file is mocked by default to avoid having to handle
 * async behavior in tests across the application when
 * using service contexts.
 */
export const ServiceContext = React.createContext({});
export const ServiceContextProvider = ({
  children,
  pageLang,
  service,
  variant,
}) => {
  const dataKey =
    getLangOverride({ service, pageLang }) || getVariant({ service, variant });
  return (
    <ServiceContext.Provider value={services[service][dataKey]}>
      {children}
    </ServiceContext.Provider>
  );
};
ServiceContextProvider.propTypes = {
  children: node.isRequired,
  service: string.isRequired,
  variant: string,
  pageLang: string,
};
ServiceContextProvider.defaultProps = {
  pageLang: null,
  variant: 'default',
};
