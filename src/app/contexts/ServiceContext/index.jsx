import React from 'react';
import { node, string } from 'prop-types';
import services from '#lib/config/services/loadableConfig';
import variantPropType from '../../models/propTypes/variants';
import { getVariant, getVariantOverride } from '#lib/utilities/variantHandler';

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

  const variantOverride = getVariantOverride({ pathname });

  return (
    <LoadableContextProvider
      Context={ServiceContext}
      dataKey={variantOverride || getVariant({ service, variant })}
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
