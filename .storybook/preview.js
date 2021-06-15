/* eslint-disable import/prefer-default-export */

import React, { useEffect } from 'react';
import { addDecorator } from '@storybook/react';
import { create } from '@storybook/theming';
import isChromatic from 'chromatic/isChromatic';
import { forceVisible } from 'react-lazyload';

import Fonts from './Fonts';

addDecorator(Story => {
  useEffect(() => {
    if (isChromatic()) {
      forceVisible();
    }
  }, []);

  return (
    /* eslint-disable react/jsx-filename-extension */
    <>
      <Fonts />
      <Story />
    </>
    /* eslint-enable react/jsx-filename-extension */
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
