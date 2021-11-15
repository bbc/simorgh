/* eslint-disable import/prefer-default-export */

import React, { useEffect, useState } from 'react';
import { addDecorator } from '@storybook/react';
import { create } from '@storybook/theming';
import isChromatic from 'chromatic/isChromatic';
import { forceVisible } from 'react-lazyload';

import Fonts from './Fonts';

const Story = ({ story }) => {
  const [fontsReady, setFontsReady] = useState(false);
  const handleFontsReady = () => setFontsReady(true);

  return (
    <>
      <Fonts onReady={handleFontsReady} />
      {fontsReady && story()}
    </>
  );
};

addDecorator(story => <Story story={story} />);

const theme = create({
  base: 'light',
  brandTitle: 'BBC Simorgh',
  brandUrl: 'https://github.com/bbc/simorgh',
});

export const parameters = {
  passArgsFirst: false,
  layout: 'fullscreen',
  options: {
    panelPosition: 'right',
    sidebarAnimcations: true,
    theme,
  },
};
