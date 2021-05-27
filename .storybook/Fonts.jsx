import React from 'react';
import isChromatic from 'chromatic/isChromatic';

import GlobalStyles from '@bbc/psammead-styles/global-styles';
import * as fontFaces from '@bbc/psammead-styles/fonts';

const fontPaths = [
  'fonts/IskoolaPota/bold.eot',
  'fonts/IskoolaPota/bold.ttf',
  'fonts/IskoolaPota/bold.woff',
  'fonts/IskoolaPota/normal.eot',
  'fonts/IskoolaPota/normal.ttf',
  'fonts/IskoolaPota/normal.woff',
  'fonts/Latha/bold.eot',
  'fonts/Latha/bold.ttf',
  'fonts/Latha/bold.woff',
  'fonts/Latha/normal.eot',
  'fonts/Latha/normal.ttf',
  'fonts/Latha/normal.woff',
  'fonts/Mallanna/normal.eot',
  'fonts/Mallanna/normal.ttf',
  'fonts/Mallanna/normal.woff',
  'fonts/NotoSansEthiopic/bold.eot',
  'fonts/NotoSansEthiopic/bold.ttf',
  'fonts/NotoSansEthiopic/bold.woff',
  'fonts/NotoSansEthiopic/normal.eot',
  'fonts/NotoSansEthiopic/normal.ttf',
  'fonts/NotoSansEthiopic/normal.woff',
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
  'fonts/ShonarBangla/bold.eot',
  'fonts/ShonarBangla/bold.ttf',
  'fonts/ShonarBangla/bold.woff',
  'fonts/ShonarBangla/normal.eot',
  'fonts/ShonarBangla/normal.ttf',
  'fonts/ShonarBangla/normal.woff',
];

const fontPathMap = [
  { prefix: 'F_ISKOOLA_POTA_BBC', path: 'fonts/IskoolaPota/' },
  { prefix: 'F_LATHA', path: 'fonts/Latha/' },
  { prefix: 'F_MALLANNA', path: 'fonts/Mallanna/' },
  { prefix: 'F_NOTO_SANS_ETHIOPIC', path: 'fonts/NotoSansEthiopic/' },
  { prefix: 'F_PADAUK', path: 'fonts/Padauk/' },
  { prefix: 'F_REITH_QALAM', path: 'fonts/ReithQalam/' },
  { prefix: 'F_REITH_SANS', path: 'fonts/Reith/' },
  { prefix: 'F_REITH_SERIF', path: 'fonts/Reith/' },
  { prefix: 'F_SHONAR_BANGLA', path: 'fonts/ShonarBangla/' },
];

const FontPreloads = () =>
  fontPaths.map(fontPath => (
    <link
      rel="preload"
      href={fontPath}
      as="font"
      type={`font/${fontPath.split('.')[1]}`}
      crossorigin="anonymous"
    />
  ));

const Fonts = () => (
  <>
    <GlobalStyles
      fonts={Object.values(fontFaces).map(fontFace => {
        const fontMap =
          fontPathMap.find(map => fontFace.name.startsWith(map.prefix)) ||
          fontPathMap[0];
        return fontFace(fontMap.path);
      })}
    />
    {isChromatic() && <FontPreloads />}
  </>
);

export default Fonts;
