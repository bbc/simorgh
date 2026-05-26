import { createContext, type PropsWithChildren } from 'react';

import servicesLoadableConfig from '../../lib/config/services/loadableConfig';
import getLangOverride from '../../lib/utilities/langHandler';
import { getVariant } from '../../lib/utilities/variantHandler';
import type { Services, Variants } from '../../models/types/global';
import type { ServiceConfig } from '../../models/types/serviceConfig';

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
  const LoadableContextProvider = servicesLoadableConfig[service];

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
