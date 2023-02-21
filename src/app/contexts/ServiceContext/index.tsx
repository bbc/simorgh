import React, { createContext, PropsWithChildren } from 'react';
import services from '../../lib/config/services/loadableConfig';
import { getVariant } from '../../lib/utilities/variantHandler';
import getLangOverride from '../../lib/utilities/langHandler';
import { Services, Variants } from '../../models/types/global';
import { ServiceConfig } from '../../models/types/serviceConfig';

export const ServiceContext = createContext<ServiceConfig>({} as ServiceConfig);

interface Props {
  service: Services;
  variant?: Variants | null;
  pageLang?: string;
}

export const ServiceContextProvider = ({
  children,
  service,
  variant,
  pageLang,
}: PropsWithChildren<Props>) => {
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
