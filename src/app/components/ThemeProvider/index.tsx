import React, { PropsWithChildren } from 'react';
import loadable, { LoadableComponent } from '@loadable/component';
import { Services, Variants } from '../../models/types/global';
import defaultServiceVariants from './defaultServiceVariants';

interface Props {
  service: Services;
  variant: Variants;
}

const getPathToTheme = (props: Props) => {
  const variant = props.variant || defaultServiceVariants[props.service];

  if (variant === 'default' || !variant) {
    return props.service;
  }

  return `${props.service}/${variant}`;
};

const loadTheme = /* #__LOADABLE__ */ (props: Props) =>
  import(`./themes/${getPathToTheme(props)}`);

// TODO: Remove this when we find a better way to get the props to the loadable component from NextJS next/dynamic
export const ThemeProviderNextJs = (props: PropsWithChildren<Props>) => {
  const { children, service, variant } = props;

  const LoadableTheme = loadable(() =>
    loadTheme({ service, variant }),
  ) as LoadableComponent<PropsWithChildren>;

  return <LoadableTheme>{children}</LoadableTheme>;
};

export const ThemeProvider: LoadableComponent<PropsWithChildren<Props>> =
  loadable(loadTheme);

export default ThemeProvider;
