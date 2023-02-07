import React, { createContext, PropsWithChildren } from 'react';
import translations from './services/loadableConfig';
import { Services } from '../../models/types/global';

interface Props {
  service: Services;
}

export const TranslationContext = createContext({});

export const TranslationContextProvider = ({
  children,
  service,
}: PropsWithChildren<Props>) => {
  const LoadableContextProvider = translations[service];

  if (!LoadableContextProvider) {
    return null;
  }

  return (
    <LoadableContextProvider Context={TranslationContext}>
      {children}
    </LoadableContextProvider>
  );
};
