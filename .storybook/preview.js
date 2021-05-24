/* eslint-disable import/prefer-default-export */

import { addDecorator } from '@storybook/react';
import { create } from '@storybook/theming';
import isChromatic from 'chromatic/isChromatic';
import GlobalStyles from '@bbc/psammead-styles/global-styles';

import clearBrowserStorage from './helpers/clearBrowserStorage';

clearBrowserStorage();

addDecorator(story => {
  clearBrowserStorage();

  return (
    /* eslint-disable react/jsx-filename-extension */
    <>
      <GlobalStyles
        fonts={Object.values(fontFaces).map(fontFace => {
          const fontMap =
            fontPathMap.find(map => fontFace.name.startsWith(map.prefix)) ||
            fontPathMap[0];
          return fontFace(fontMap.path);
        })}
      />
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
