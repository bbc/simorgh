import { create } from '@storybook/theming/create';
import logo from './logo.svg';

export default create({
  base: 'light',

  colorPrimary: '#B80000',
  colorSecondary: '#B80000',

  // UI
  appBg: '#fff',
  appContentBg: '#fff',
  appBorderColor: '#B80000',
  appBorderRadius: 5,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#000',
  textInverseColor: '#fff',

  // Toolbar default and active colors
  barTextColor: '#B80000',
  barSelectedColor: '#B80000',
  barBg: '#fff',

  // Form colors
  inputBg: '#fff',
  inputBorder: '#fff',
  inputTextColor: '#B80000',
  inputBorderRadius: 4,

  brandTitle: 'BBC Simorgh',
  brandUrl: 'https://https://github.com/bbc/simorgh.com',
  brandImage: logo,
});
