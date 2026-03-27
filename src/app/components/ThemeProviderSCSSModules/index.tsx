import type { PropsWithChildren } from 'react';
import defaultServiceVariants from '../../lib/config/services/defaultServiceVariants';
import {
  ServicesVariantsProps,
  ServicesWithVariants,
  Variants,
} from '../../models/types/global';
import { LoadableTheme } from '../../models/types/theming';
import themes from './themes/loadableConfig';

const isLoadableTheme = (theme: unknown): theme is LoadableTheme =>
  theme !== null && typeof theme === 'object' && 'render' in theme;

type Props = Omit<ServicesVariantsProps, 'variant'> & {
  variant?: Variants | null;
};

export const ThemeProvider = ({
  children,
  service,
  variant,
}: PropsWithChildren<Props>) => {
  let LoadableContextProvider: LoadableTheme | undefined;

  const serviceVariant: Variants = variant || defaultServiceVariants[service];
  const serviceTheme = themes[service];

  if (isLoadableTheme(serviceTheme)) {
    LoadableContextProvider = serviceTheme;
  } else if (serviceVariant !== 'default') {
    LoadableContextProvider =
      serviceTheme[serviceVariant as ServicesWithVariants['variant']];
  }

  if (!LoadableContextProvider) {
    return null;
  }

  return <LoadableContextProvider>{children}</LoadableContextProvider>;
};

export default ThemeProvider;
