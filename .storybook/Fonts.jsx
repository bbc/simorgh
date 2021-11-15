/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import isChromatic from 'chromatic/isChromatic';
import GlobalStyles from '@bbc/psammead-styles/global-styles';
import * as fontFaces from '@bbc/psammead-styles/fonts';

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

const Fonts = () =>
  !isChromatic() && (
    <GlobalStyles
      fonts={Object.values(fontFaces).map(fontFace => {
        const fontMap =
          fontPathMap.find(map => fontFace.name.startsWith(map.prefix)) ||
          fontPathMap[0];

        return fontFace(fontMap.path);
      })}
    />
  );

export default Fonts;
