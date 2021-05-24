/* eslint-disable import/prefer-default-export */
import React, { useEffect } from 'react';
import { addDecorator } from '@storybook/react';
import { create } from '@storybook/theming';
import isChromatic from 'chromatic/isChromatic';
import Fonts from './Fonts';

import clearBrowserStorage from './helpers/clearBrowserStorage';

addDecorator(story => {
  useEffect(clearBrowserStorage, []);

  return (
    <>
      <Fonts />
      {story()}
    </>
  );
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
