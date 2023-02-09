import React, { createContext, PropsWithChildren } from 'react';
import translations from './services/loadableConfig';
import { Services, Variants } from '../../models/types/global';
import { getVariant } from '../../lib/utilities/variantHandler';
import getLangOverride from '../../lib/utilities/langHandler';
import { Translations } from '../../models/types/translations';

interface Props {
  service: Services;
  variant?: Variants | null;
  pageLang?: string;
}

export const TranslationContext = createContext<Translations>(
  {} as Translations,
);

export const TranslationContextProvider = ({
  children,
  service,
  variant,
  pageLang,
}: PropsWithChildren<Props>) => {
  const LoadableContextProvider = translations[service];

  if (!LoadableContextProvider) {
    return null;
  }

  return (
    <LoadableContextProvider
      Context={TranslationContext}
      dataKey={
        getLangOverride({ service, pageLang }) ||
        getVariant({ service, variant })
      }
    >
      {children}
    </LoadableContextProvider>
  );
};
