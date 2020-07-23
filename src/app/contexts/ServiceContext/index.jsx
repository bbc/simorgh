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
  pageLang,
}) => {
  const LoadableContextProvider = services[service];

  if (!LoadableContextProvider) {
    return null;
  }

  return (
    <LoadableContextProvider
      Context={ServiceContext}
      dataKey={
        getLangOverride({ service, pageLang }) ||
        getVariant({ service, variant })
      }
    >
      {children}
    </LoadableContextProvider>
  );
};

ServiceContextProvider.propTypes = {
  children: node.isRequired,
  pageLang: string,
  service: string,
  variant: variantPropType,
};

ServiceContextProvider.defaultProps = {
  pageLang: null,
  service: 'default',
  variant: 'default',
};
