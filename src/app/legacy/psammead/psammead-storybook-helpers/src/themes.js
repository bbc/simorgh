import { create } from '@storybook/theming';

const createTheme = props =>
  create({
    brandTitle: 'BBC Psammead',
    brandUrl: 'https://github.com/bbc/psammead',
    brandImage:
      'https://user-images.githubusercontent.com/11341355/54079666-af202780-42d8-11e9-9108-e47ea27fddc5.png',
    ...props,
  });

export default {
  light: createTheme({ base: 'light' }),
  dark: createTheme({ base: 'dark' }),
};
