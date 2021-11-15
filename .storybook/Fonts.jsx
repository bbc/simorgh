/* eslint-disable react/jsx-filename-extension */

import React, { useEffect } from 'react';
import isChromatic from 'chromatic/isChromatic';
import GlobalStyles from '@bbc/psammead-styles/global-styles';
import * as fontFaces from '@bbc/psammead-styles/fonts';

const fontPaths = [
  'fonts/Mallanna/normal.eot',
  'fonts/Mallanna/normal.ttf',
  'fonts/Mallanna/normal.woff',
  'fonts/NotoSansEthiopic/bold.eot',
  'fonts/NotoSansEthiopic/bold.ttf',
  'fonts/NotoSansEthiopic/bold.woff',
  'fonts/NotoSansEthiopic/normal.eot',
  'fonts/NotoSansEthiopic/normal.ttf',
  'fonts/NotoSansEthiopic/normal.woff',
  'fonts/NotoSansTamil/bold.eot',
  'fonts/NotoSansTamil/bold.ttf',
  'fonts/NotoSansTamil/bold.woff',
  'fonts/NotoSansTamil/bold.woff2',
  'fonts/NotoSansTamil/normal.eot',
  'fonts/NotoSansTamil/normal.ttf',
  'fonts/NotoSansTamil/normal.woff',
  'fonts/NotoSansTamil/normal.woff2',
  'fonts/NotoSerifBengali/bold.eot',
  'fonts/NotoSerifBengali/bold.ttf',
  'fonts/NotoSerifBengali/bold.woff',
  'fonts/NotoSerifBengali/bold.woff2',
  'fonts/NotoSerifBengali/normal.eot',
  'fonts/NotoSerifBengali/normal.ttf',
  'fonts/NotoSerifBengali/normal.woff',
  'fonts/NotoSerifBengali/normal.woff2',
  'fonts/NotoSerifSinhala/bold.eot',
  'fonts/NotoSerifSinhala/bold.ttf',
  'fonts/NotoSerifSinhala/bold.woff',
  'fonts/NotoSerifSinhala/bold.woff2',
  'fonts/NotoSerifSinhala/normal.eot',
  'fonts/NotoSerifSinhala/normal.ttf',
  'fonts/NotoSerifSinhala/normal.woff',
  'fonts/NotoSerifSinhala/normal.woff2',
  'fonts/Padauk/bold.eot',
  'fonts/Padauk/bold.ttf',
  'fonts/Padauk/bold.woff',
  'fonts/Padauk/normal.eot',
  'fonts/Padauk/normal.ttf',
  'fonts/Padauk/normal.woff',
  'fonts/Reith/BBCReithSans_W_Bd.woff',
  'fonts/Reith/BBCReithSans_W_Bd.woff2',
  'fonts/Reith/BBCReithSans_W_BdIt.woff',
  'fonts/Reith/BBCReithSans_W_BdIt.woff2',
  'fonts/Reith/BBCReithSans_W_ExBd.woff',
  'fonts/Reith/BBCReithSans_W_ExBd.woff2',
  'fonts/Reith/BBCReithSans_W_ExBdIt.woff',
  'fonts/Reith/BBCReithSans_W_ExBdIt.woff2',
  'fonts/Reith/BBCReithSans_W_It.woff',
  'fonts/Reith/BBCReithSans_W_It.woff2',
  'fonts/Reith/BBCReithSans_W_Lt.woff',
  'fonts/Reith/BBCReithSans_W_LtIt.woff',
  'fonts/Reith/BBCReithSans_W_Md.woff',
  'fonts/Reith/BBCReithSans_W_Md.woff2',
  'fonts/Reith/BBCReithSans_W_MdIt.woff',
  'fonts/Reith/BBCReithSans_W_MdIt.woff2',
  'fonts/Reith/BBCReithSans_W_Rg.woff',
  'fonts/Reith/BBCReithSans_W_Rg.woff2',
  'fonts/Reith/BBCReithSansCd_W_Bd.woff',
  'fonts/Reith/BBCReithSansCd_W_Bd.woff2',
  'fonts/Reith/BBCReithSansCd_W_Rg.woff',
  'fonts/Reith/BBCReithSansCd_W_Rg.woff2',
  'fonts/Reith/BBCReithSerif_W_Bd.woff',
  'fonts/Reith/BBCReithSerif_W_Bd.woff2',
  'fonts/Reith/BBCReithSerif_W_BdIt.woff',
  'fonts/Reith/BBCReithSerif_W_BdIt.woff2',
  'fonts/Reith/BBCReithSerif_W_ExBd.woff',
  'fonts/Reith/BBCReithSerif_W_ExBdIt.woff',
  'fonts/Reith/BBCReithSerif_W_It.woff',
  'fonts/Reith/BBCReithSerif_W_It.woff2',
  'fonts/Reith/BBCReithSerif_W_Lt.woff',
  'fonts/Reith/BBCReithSerif_W_Lt.woff2',
  'fonts/Reith/BBCReithSerif_W_LtIt.woff',
  'fonts/Reith/BBCReithSerif_W_LtIt.woff2',
  'fonts/Reith/BBCReithSerif_W_Md.woff',
  'fonts/Reith/BBCReithSerif_W_Md.woff2',
  'fonts/Reith/BBCReithSerif_W_MdIt.woff',
  'fonts/Reith/BBCReithSerif_W_Rg.woff',
  'fonts/Reith/BBCReithSerif_W_Rg.woff2',
  'fonts/ReithQalam/bold.woff',
  'fonts/ReithQalam/bold.woff2',
  'fonts/ReithQalam/extrabold.woff',
  'fonts/ReithQalam/extrabold.woff2',
  'fonts/ReithQalam/light.woff',
  'fonts/ReithQalam/light.woff2',
  'fonts/ReithQalam/normal.woff',
  'fonts/ReithQalam/normal.woff2',
];

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

const Fonts = ({ onReady }) => {
  useEffect(() => {
    const preloadFonts = async () => {
      await Promise.all([
        document.fonts.load('1rem ReithSerif'),
        document.fonts.load('1rem ReithSans'),
        document.fonts.load('1rem ReithSansCondensed'),
        document.fonts.load('1rem Noto Serif Sinhala'),
        document.fonts.load('1rem Noto Sans Tamil'),
        document.fonts.load('1rem Mallanna'),
        document.fonts.load('1rem Noto Sans Ethiopic'),
        document.fonts.load('1rem Padauk'),
        document.fonts.load('1rem Noto Serif Bengali'),
        document.fonts.load('1rem BBC Reith Qalam'),
      ]);

      if (isChromatic() && document.fonts) {
        onReady();
      }
    };

    preloadFonts();
  }, []);

  return (
    <GlobalStyles
      fonts={Object.values(fontFaces).map(fontFace => {
        const fontMap =
          fontPathMap.find(map => fontFace.name.startsWith(map.prefix)) ||
          fontPathMap[0];

        return fontFace(fontMap.path);
      })}
    />
  );
};

export default Fonts;
