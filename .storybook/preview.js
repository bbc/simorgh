/* eslint-disable import/prefer-default-export */

import React, { useEffect } from 'react';
import { addDecorator } from '@storybook/react';
import isChromatic from 'chromatic/isChromatic';
import { create } from '@storybook/theming';

import Fonts from './Fonts';
import clearAppStorage from './helpers/clearAppStorage';

addDecorator(story => {
  useEffect(() => {
    if (isChromatic()) {
      // prevent the consent banner introducing inconsistent Chromatic snapshots
      clearAppStorage();
    }
  }, []);

  return (
    /* eslint-disable react/jsx-filename-extension */
    <>
      <Fonts />
      {story()}
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
