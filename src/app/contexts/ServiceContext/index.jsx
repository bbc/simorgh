import React from 'react';
import { node, string } from 'prop-types';
import services from '#lib/config/services/loadableConfig';
import variantPropType from '../../models/propTypes/variants';
import { getPreferredVariant } from '#contexts/UserContext/cookies';
import { getVariant, getOtherVariant } from '#lib/utilities/variantHandler';

export const ServiceContext = React.createContext({});

export const ServiceContextProvider = ({ children, service, variant }) => {
  const LoadableContextProvider = services[service];

  if (!LoadableContextProvider) {
    return null;
  }
  const preferredServiceVariant = getPreferredVariant(service);
  const otherVariant = getOtherVariant(service, preferredServiceVariant);

  return (
    <LoadableContextProvider
      Context={ServiceContext}
      dataKey={getVariant({ service, variant })}
      preferredServiceVariant={preferredServiceVariant}
      otherVariant={otherVariant}
    >
      {children}
    </LoadableContextProvider>
  );
};

ServiceContextProvider.propTypes = {
  children: node.isRequired,
  service: string,
  variant: variantPropType,
};

ServiceContextProvider.defaultProps = {
  service: 'default',
  variant: 'default',
};
