import React, { PropsWithChildren } from 'react';
import { node, string } from 'prop-types';
import getLangOverride from '../../../lib/utilities/langHandler';
import { getVariant } from '../../../lib/utilities/variantHandler';
import services from '../../../../server/utilities/serviceConfigs';
import { Services, Variants } from '../../../models/types/global';

interface Props {
  service: Services;
  variant?: Variants | null;
  pageLang?: string;
}

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
}: PropsWithChildren<Props>) => {
  const dataKey: Variants =
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
