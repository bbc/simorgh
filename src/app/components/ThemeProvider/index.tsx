import React, { PropsWithChildren } from 'react';
import { Services, Variants } from '../../models/types/global';
import defaultServiceVariants from './defaultServiceVariants';
import themes from './themes/loadableConfig';
import fallBackTheme from './themes/news';

interface Props {
  service: Services;
  variant?: Variants | null;
}

export const ThemeProvider = ({
  children,
  service,
  variant,
}: PropsWithChildren<Props>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let LoadableContextProvider: any = fallBackTheme;

  const serviceVariant: Variants = variant || defaultServiceVariants[service];

  if (
    (serviceVariant === 'default' && service !== 'uzbek') ||
    (!serviceVariant && service !== 'uzbek')
  ) {
    LoadableContextProvider = themes[service];
  } else {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - TODO: come back to this
    LoadableContextProvider = themes[service][serviceVariant];
  }

  if (!LoadableContextProvider) {
    return null;
  }

  return <LoadableContextProvider>{children}</LoadableContextProvider>;
};

export default ThemeProvider;
