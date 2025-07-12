import React, { PropsWithChildren } from 'react';
import { Services, Variants } from '../../app/models/types/global';

interface Props {
  service: Services;
  variant?: Variants | null;
  pageLang?: string | null;
}

/*
 * This file is mocked by default to avoid having to handle
 * async behavior in tests across the application when
 * using service contexts.
 */
export const ServiceContext = React.createContext({});

const mockServiceData = {
  lang: 'en',
  dir: 'ltr',
  product: 'BBC News',
  serviceName: 'Mock Service',
  brandName: 'BBC',
  useReverb: false,
  service: 'news',
  atiAnalyticsAppName: 'news',
  atiAnalyticsProducerId: '64',
  atiAnalyticsProducerName: 'BBC News',
};

export const ServiceContextProvider = ({
  children,
}: PropsWithChildren<Props>) => {
  return (
    <ServiceContext.Provider value={mockServiceData}>
      {children}
    </ServiceContext.Provider>
  );
};
