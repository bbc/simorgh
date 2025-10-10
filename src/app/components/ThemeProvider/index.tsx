import React, { PropsWithChildren } from 'react';
import type { LoadableComponent } from '@loadable/component';
import defaultServiceVariants from '../../lib/config/services/defaultServiceVariants';
import {
  ServicesVariantsProps,
  Variants,
  ServicesWithVariants,
  ServicesWithNoVariants,
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

const nonVariantThemes = Object.fromEntries(
  Object.entries(themes).filter(([_service, theme]) =>
    Object.keys(theme).includes('render'),
  ),
) as unknown as NonVariantThemesType;

const variantThemes = Object.fromEntries(
  Object.entries(themes).filter(
    ([_service, theme]) => !Object.keys(theme).includes('render'),
  ),
) as unknown as VariantThemesType;

export const ThemeProvider = ({
  children,
  service,
  variant,
}: PropsWithChildren<ServicesVariantsProps>) => {
  let LoadableContextProvider: ThemeComponentLoadable | FallbackThemeComponent =
    fallBackTheme;

  const serviceVariant: Variants = variant || defaultServiceVariants[service];

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
