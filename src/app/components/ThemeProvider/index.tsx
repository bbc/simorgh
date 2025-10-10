import React, { PropsWithChildren } from 'react';
import type { LoadableComponent } from '@loadable/component';
import nodeLogger from '#lib/logger.node';
import { THEME_PROVIDER_ERROR } from '#app/lib/logger.const';
import defaultServiceVariants from '../../lib/config/services/defaultServiceVariants';
import {
  ServicesVariantsProps,
  Variants,
  ServicesWithVariants,
  ServicesWithNoVariants,
} from '../../models/types/global';
import themes from './themes/loadableConfig';
import fallBackTheme from './themes/news';

const logger = nodeLogger(__filename);

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
  ...rest
}: PropsWithChildren<ServicesVariantsProps>) => {
  let LoadableContextProvider:
    | ThemeComponentLoadable
    | FallbackThemeComponent
    | null = null;

  const variant: Variants = rest.variant || defaultServiceVariants[service];

  let serviceVariants;
  let serviceNoVariants;

  if (service in variantThemes) {
    serviceVariants =
      variantThemes[service as ServicesWithVariants['service']][variant];
  } else {
    serviceNoVariants =
      nonVariantThemes[service as ServicesWithNoVariants['service']];
  }

  if (serviceNoVariants || serviceVariants) {
    LoadableContextProvider =
      serviceNoVariants || serviceVariants || fallBackTheme;
  } else {
    logger.error(
      THEME_PROVIDER_ERROR,
      `Unable to find a theme provider for ${service} with variant ${variant}, therefore using fallback theme provider (news)`,
    );
    LoadableContextProvider = fallBackTheme;
  }

  return <LoadableContextProvider>{children}</LoadableContextProvider>;
};

export default ThemeProvider;
