import React, { PropsWithChildren } from 'react';
import defaultServiceVariants from '../../lib/config/services/defaultServiceVariants';
import { ServicesVariantsProps, Variants } from '../../models/types/global';
import themes from './themes/loadableConfig';
import fallBackTheme from './themes/news';

const nonVariantThemes = Object.fromEntries(
  Object.entries(themes).filter(([_service, theme]) => {
    return Object.keys(theme).includes('load');
  }),
);

const variantThemes = Object.fromEntries(
  Object.entries(themes).filter(
    ([service]) => !Object.keys(nonVariantThemes).includes(service),
  ),
);

export const ThemeProvider = ({
  children,
  service,
  variant,
}: PropsWithChildren<ServicesVariantsProps>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let LoadableContextProvider: any = fallBackTheme;

  const serviceVariant: Variants = variant || defaultServiceVariants[service];

  if (serviceVariant && service in variantThemes) {
    LoadableContextProvider = variantThemes[service];
  } else {
    LoadableContextProvider = nonVariantThemes[service];
  }

  if (!LoadableContextProvider) {
    return null;
  }

  return <LoadableContextProvider>{children}</LoadableContextProvider>;
};

export default ThemeProvider;
