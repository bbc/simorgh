import React from 'react';
import { node, string } from 'prop-types';
import services from '#lib/config/services/loadableConfig';
import variantPropType from '../../models/propTypes/variants';
import { getVariant } from '#lib/utilities/variantHandler';
import getLangOverride from '#lib/utilities/langHandler';

export const ServiceContext = React.createContext({});

export const ServiceContextProvider = ({
  children,
  service,
  variant,
  pathname,
}) => {
  const LoadableContextProvider = services[service];

  if (!LoadableContextProvider) {
    return null;
  }

  // This override is for ukrainian service with a different lang/locale config
  const serviceLang = getLangOverride({ pathname });

  return (
    <LoadableContextProvider
      Context={ServiceContext}
      dataKey={serviceLang || getVariant({ service, variant })}
    >
      {children}
    </LoadableContextProvider>
  );
};

ServiceContextProvider.propTypes = {
  children: node.isRequired,
  pathname: string,
  service: string,
  variant: variantPropType,
};

ServiceContextProvider.defaultProps = {
  pathname: null,
  service: 'default',
  variant: 'default',
};
