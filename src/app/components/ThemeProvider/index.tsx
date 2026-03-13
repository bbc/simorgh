/* eslint-disable no-param-reassign */
import type { ComponentType, PropsWithChildren } from 'react';
import nodeLogger from '#lib/logger.node';
import { THEME_PROVIDER_ERROR } from '#app/lib/logger.const';
import {
  LoadableTheme,
  ThemeWithNoVariant,
  ThemeWithVariant,
} from '#app/models/types/theming';
import defaultServiceVariants from '../../lib/config/services/defaultServiceVariants';
import {
  ServicesVariantsProps,
  ServicesWithVariants,
  ServicesWithNoVariants,
} from '../../models/types/global';
import themes from './themes/loadableConfig';
import fallBackTheme from './themes/news';

const logger = nodeLogger(__filename);

type FallbackThemeComponent = ComponentType<{
  children: PropsWithChildren['children'];
}>;

const nonVariantThemes = Object.fromEntries(
  Object.entries(themes).filter(([_service, theme]) =>
    Object.keys(theme).includes('render'),
  ),
) as ThemeWithNoVariant;

const variantThemes = Object.fromEntries(
  Object.entries(themes).filter(
    ([_service, theme]) => !Object.keys(theme).includes('render'),
  ),
) as ThemeWithVariant;

export const ThemeProvider = ({
  children,
  service,
  variant,
}: PropsWithChildren<ServicesVariantsProps>) => {
  let LoadableContextProvider: LoadableTheme | FallbackThemeComponent;

  variant = variant || defaultServiceVariants[service];

  let serviceVariants: LoadableTheme | undefined;
  let serviceNoVariants: LoadableTheme | undefined;

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
