import React, { PropsWithChildren } from 'react';
import { Services, Variants } from '../../models/types/global';
import defaultServiceVariants from './defaultServiceVariants';
import themes from './themes/loadableConfig';

interface Props {
  service: Services;
  variant?: Variants | null;
}

export const ThemeProvider = ({
  children,
  service,
  variant,
}: PropsWithChildren<Props>) => {
  let LoadableContextProvider;

  const serviceVariant: Variants = variant || defaultServiceVariants[service];

  if (serviceVariant === 'default' || !serviceVariant) {
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
