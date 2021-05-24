/* eslint-disable import/prefer-default-export */

import { addDecorator } from '@storybook/react';
import { create } from '@storybook/theming';
import isChromatic from 'chromatic/isChromatic';

import clearBrowserStorage from './helpers/clearBrowserStorage';
import loadFonts from './helpers/loadFonts';

// loadFonts();
clearBrowserStorage();

addDecorator(story => {
  if (isChromatic()) {
    // loadFonts();
    clearBrowserStorage();
  }

  return story();
});

const theme = create({
  base: 'light',
  brandTitle: 'BBC Simorgh',
  brandUrl: 'https://github.com/bbc/simorgh',
});

export const parameters = {
  passArgsFirst: false,
  options: {
    panelPosition: 'right',
    sidebarAnimcations: true,
    theme,
  },
};
