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
      dataKey={getLangOverride(pageLang) || getVariant({ service, variant })}
    >
      {children}
    </LoadableContextProvider>
  );
};

ServiceContextProvider.propTypes = {
  children: node.isRequired,
  service: string,
  variant: variantPropType,
  pageLang: string,
};

ServiceContextProvider.defaultProps = {
  service: 'default',
  variant: 'default',
  pageLang: null,
};
