import loadable, { LoadableComponent } from '@loadable/component';
import { PropsWithChildren } from 'react';
import { Services, Variants } from '../../models/types/global';
import defaultServiceVariants from './defaultServiceVariants';

interface Props {
  service: Services;
  variant: Variants;
}

// const getPathToTheme = (props: Props) => {
//   const variant = props.variant || defaultServiceVariants[props.service];

//   if (variant === 'default' || !variant) {
//     return props.service;
//   }

//   return `${props.service}/${variant}`;
// };

const loadTheme = /* #__LOADABLE__ */ (props: Props) =>
  import(`./themes/mundo`);

const ThemeProvider: LoadableComponent<PropsWithChildren<Props>> =
  loadable(loadTheme);

export default ThemeProvider;
