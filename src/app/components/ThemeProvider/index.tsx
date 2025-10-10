import React, { PropsWithChildren } from 'react';
import type { LoadableComponent } from '@loadable/component';
import defaultServiceVariants from '../../lib/config/services/defaultServiceVariants';
import {
  ServicesVariantsProps,
  Variants,
  ServicesWithVariants,
  ServicesWithNoVariants,
  SERVICES_NO_VARIANTS,
  SERVICES_WITH_VARIANTS,
} from '../../models/types/global';
import themes from './themes/loadableConfig';
import fallBackTheme from './themes/news';

type ThemeComponentLoadable = LoadableComponent<{ children: React.ReactNode }>;
type FallbackThemeComponent = React.FC<{ children: React.ReactNode }>;

type NonVariantThemesType = {
  [_service in ServicesWithNoVariants['service']]: ThemeComponentLoadable;
};

type VariantThemesType = {
  [_service in ServicesWithVariants['service']]: {
    [_variant in Variants]?: ThemeComponentLoadable;
  };
};

const variantThemes = Object.fromEntries(
  Object.entries(themes).filter(([service]) =>
    SERVICES_WITH_VARIANTS.includes(service),
  ),
) as unknown as VariantThemesType;

const nonVariantThemes = Object.fromEntries(
  Object.entries(themes).filter(([service]) =>
    SERVICES_NO_VARIANTS.includes(service),
  ),
) as unknown as NonVariantThemesType;

console.log({ variantThemes, nonVariantThemes });

export const ThemeProvider = ({
  children,
  service,
  variant,
}: PropsWithChildren<ServicesVariantsProps>) => {
  let LoadableContextProvider: ThemeComponentLoadable | FallbackThemeComponent =
    fallBackTheme;

  const serviceVariant: Variants =
    variant || defaultServiceVariants[service as string];

  if (service in variantThemes) {
    const serviceVariants =
      variantThemes[service as ServicesWithVariants['service']][serviceVariant];

    if (serviceVariants) {
      LoadableContextProvider = serviceVariants;
    }
  } else {
    LoadableContextProvider =
      nonVariantThemes[service as ServicesWithNoVariants['service']];
  }

  if (!LoadableContextProvider) {
    return null;
  }

  return <LoadableContextProvider>{children}</LoadableContextProvider>;
};

export default ThemeProvider;
