/* eslint-disable import/prefer-default-export */

import React, { useEffect } from 'react';
import { addDecorator } from '@storybook/react';
import { create } from '@storybook/theming';
import isChromatic from 'chromatic';
import { forceVisible } from 'react-lazyload';
import * as fontFaces from '../src/app/legacy/psammead-styles/src/fonts';
import GlobalStyles from '../src/app/legacy/psammead-styles/src/global-styles';

const fontPathMap = [
  { prefix: 'F_MALLANNA', path: 'fonts/Mallanna/' },
  { prefix: 'F_NOTO_SANS_ETHIOPIC', path: 'fonts/NotoSansEthiopic/' },
  { prefix: 'F_NOTO_SANS_TAMIL', path: 'fonts/NotoSansTamil/' },
  { prefix: 'F_NOTO_SERIF_BENGALI', path: 'fonts/NotoSerifBengali/' },
  { prefix: 'F_NOTO_SERIF_SINHALA', path: 'fonts/NotoSerifSinhala/' },
  { prefix: 'F_PADAUK', path: 'fonts/Padauk/' },
  { prefix: 'F_REITH_QALAM', path: 'fonts/ReithQalam/' },
  { prefix: 'F_REITH_SANS', path: 'fonts/Reith/' },
  { prefix: 'F_REITH_SERIF', path: 'fonts/Reith/' },
];

addDecorator(story => {
  useEffect(() => {
    if (isChromatic()) {
      forceVisible();
    }
  }, []);

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
