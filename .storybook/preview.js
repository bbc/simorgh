/* eslint-disable import/prefer-default-export */

import React, { useEffect } from 'react';
import { Global } from '@emotion/react';
import { addDecorator } from '@storybook/react';
import { create } from '@storybook/theming';
import isChromatic from 'chromatic';
import { forceVisible } from 'react-lazyload';
import GlobalStyles from '../src/app/legacy/psammead/psammead-styles/src/global-styles';

const REITH_SERIF_REGULAR = {
  '@font-face': {
    fontFamily: 'ReithSerif',
    src: `url("fonts/Reith/BBCReithSerif_W_Rg.woff2") format("woff2"), url("fonts/Reith/BBCReithSerif_W_Rg.woff") format("woff")`,
    fontDisplay: 'optional',
  },
};

const REITH_SERIF_BOLD = {
  '@font-face': {
    fontFamily: 'ReithSerif',
    src: `url("fonts/Reith/BBCReithSerif_W_Bd.woff2") format("woff2"), url("fonts/Reith/BBCReithSerif_W_Bd.woff") format("woff")`,
    fontWeight: 700,
    fontDisplay: 'optional',
  },
};

const REITH_SERIF_LIGHT = {
  '@font-face': {
    fontFamily: 'ReithSerif',
    src: `url("fonts/Reith/subsets/BBCReithSerif_WNumbers_Lt.woff2") format("woff2"), url("fonts/Reith/subsets/BBCReithSerif_WNumbers_Lt.woff") format("woff")`,
    fontWeight: 300,
    fontDisplay: 'optional',
  },
};

const REITH_SERIF_MEDIUM = {
  '@font-face': {
    fontFamily: 'ReithSerif',
    src: `url("fonts/Reith/BBCReithSerif_W_Md.woff2") format("woff2"), url("fonts/Reith/BBCReithSerif_W_Md.woff") format("woff")`,
    fontWeight: 500,
    fontDisplay: 'optional',
  },
};

const REITH_SERIF_EXTRA_BOLD = {
  '@font-face': {
    fontFamily: 'ReithSerif',
    src: `url("fonts/Reith/BBCReithSerif_W_ExBd.woff2") format("woff2"), url("fonts/Reith/BBCReithSerif_W_ExBd.woff") format("woff")`,
    fontWeight: 800,
    fontDisplay: 'optional',
  },
};

const REITH_SANS_REGULAR = {
  '@font-face': {
    fontFamily: 'ReithSans',
    src: `url("fonts/Reith/BBCReithSans_W_Rg.woff2") format("woff2"), url("fonts/Reith/BBCReithSans_W_Rg.woff") format("woff")`,
    fontDisplay: 'optional',
  },
};

const REITH_SANS_BOLD = {
  '@font-face': {
    fontFamily: 'ReithSans',
    src: `url("fonts/Reith/BBCReithSans_W_Bd.woff2") format("woff2"), url("fonts/Reith/BBCReithSans_W_Bd.woff") format("woff")`,
    fontWeight: 700,
    fontDisplay: 'optional',
  },
};

const REITH_SANS_LIGHT = {
  '@font-face': {
    fontFamily: 'ReithSans',
    src: `url("fonts/Reith/BBCReithSans_W_Lt.woff2") format("woff2"), url("fonts/Reith/BBCReithSans_W_Lt.woff") format("woff")`,
    fontWeight: 300,
    fontDisplay: 'optional',
  },
};

const REITH_SANS_LIGHT_ITALIC = {
  '@font-face': {
    fontFamily: 'ReithSans',
    src: `url("fonts/Reith/BBCReithSans_W_LtIt.woff2") format("woff2"), url("fonts/Reith/BBCReithSans_W_LtIt.woff") format("woff")`,
    fontWeight: 300,
    fontStyle: 'italic',
    fontDisplay: 'optional',
  },
};

const REITH_SANS_MEDIUM = {
  '@font-face': {
    fontFamily: 'ReithSans',
    src: `url("fonts/Reith/BBCReithSans_W_Md.woff2") format("woff2"), url("fonts/Reith/BBCReithSans_W_Md.woff") format("woff")`,
    fontWeight: 500,
    fontDisplay: 'optional',
  },
};

const REITH_SANS_EXTRA_BOLD = {
  '@font-face': {
    fontFamily: 'ReithSans',
    src: `url("fonts/Reith/BBCReithSans_W_ExBd.woff2") format("woff2"), url("fonts/Reith/BBCReithSans_W_ExBd.woff") format("woff")`,
    fontWeight: 800,
    fontDisplay: 'optional',
  },
};

const REITH_SANS_EXTRA_BOLD_ITALIC = {
  '@font-face': {
    fontFamily: 'ReithSans',
    src: `url("fonts/Reith/BBCReithSans_W_ExBdIt.woff2") format("woff2"), url("fonts/Reith/BBCReithSans_W_ExBdIt.woff") format("woff")`,
    fontWeight: 800,
    fontStyle: 'italic',
    fontDisplay: 'optional',
  },
};

const REITH_SANS_CONDENSED_REGULAR = {
  '@font-face': {
    fontFamily: 'ReithSansCondensed',
    src: `url("fonts/Reith/BBCReithSansCd_W_Rg.woff2") format("woff2"), url("fonts/Reith/BBCReithSansCd_W_Rg.woff") format("woff")`,
    fontDisplay: 'optional',
  },
};

const REITH_SANS_CONDENSED_BOLD = {
  '@font-face': {
    fontFamily: 'ReithSansCondensed',
    fontWeight: 700,
    src: `url("fonts/Reith/BBCReithSansCd_W_Bd.woff2") format("woff2"), url("fonts/Reith/BBCReithSansCd_W_Bd.woff") format("woff")`,
    fontDisplay: 'optional',
  },
};

const NOTO_SERIF_SINHALA_REGULAR = {
  '@font-face': {
    fontFamily: 'Noto Serif Sinhala',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('fonts/NotoSerifBengali/normal.woff2') format('woff2'), url('fonts/NotoSerifBengali/normal.woff') format('woff'), url('fonts/NotoSerifBengali/normal.eot') format('eot'), url('fonts/NotoSerifBengali/normal.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

const NOTO_SERIF_SINHALA_BOLD = {
  '@font-face': {
    fontFamily: 'Noto Serif Sinhala',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `url('fonts/NotoSerifBengali/bold.woff2') format('woff2'), url('fonts/NotoSerifBengali/bold.woff') format('woff'), url('fonts/NotoSerifBengali/bold.eot') format('eot'), url('fonts/NotoSerifBengali/bold.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

const NOTO_SANS_TAMIL_REGULAR = {
  '@font-face': {
    fontFamily: 'Noto Sans Tamil',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('fonts/NotoSansTamil/normal.woff2') format('woff2'), url('fonts/NotoSansTamil/normal.woff') format('woff'), url('fonts/NotoSansTamil/normal.eot') format('eot'), url('fonts/NotoSansTamil/normal.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

const NOTO_SANS_TAMIL_BOLD = {
  '@font-face': {
    fontFamily: 'Noto Sans Tamil',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `url('fonts/NotoSansTamil/bold.woff2') format('woff2'), url('fonts/NotoSansTamil/bold.woff') format('woff'), url('fonts/NotoSansTamil/normal.eot') format('eot'), url('fonts/NotoSansTamil/bold.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

const MALLANNA_REGULAR = {
  '@font-face': {
    fontFamily: 'Mallanna',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('fonts/Mallanna/normal.woff') format('woff'), url('fonts/Mallanna/normal.eot') format('eot'), url('fonts/Mallanna/normal.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

const NOTO_SANS_ETHIOPIC_REGULAR = {
  '@font-face': {
    fontFamily: 'Noto Sans Ethiopic',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('fonts/NotoSansEthiopic/normal.woff') format('woff'), url('fonts/NotoSansEthiopic/normal.eot') format('eot'), url('fonts/NotoSansEthiopic/normal.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

const NOTO_SANS_ETHIOPIC_BOLD = {
  '@font-face': {
    fontFamily: 'Noto Sans Ethiopic',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `url('fonts/NotoSansEthiopic/bold.woff') format('woff'), url('fonts/NotoSansEthiopic/bold.eot') format('eot'), url('fonts/NotoSansEthiopic/bold.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

const PADAUK_REGULAR = {
  '@font-face': {
    fontFamily: 'Padauk',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('fonts/Padauk/normal.woff') format('woff'), url('fonts/Padauk/normal.eot') format('eot'), url('fonts/Padauk/normal.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

const PADAUK_BOLD = {
  '@font-face': {
    fontFamily: 'Padauk',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `url('fonts/Padauk/bold.woff') format('woff'), url('fonts/Padauk/bold.eot') format('eot'), url('fonts/Padauk/bold.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

const NOTO_SERIF_BENGALI_REGULAR = {
  '@font-face': {
    fontFamily: 'Noto Serif Bengali',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('fonts/NotoSerifBengali/normal.woff2') format('woff2'), url('fonts/NotoSerifBengali/normal.woff') format('woff'), url('fonts/NotoSerifBengali/normal.eot') format('eot'), url('fonts/NotoSerifBengali/normal.ttf') format('ttf')`,
    fontDisplay: 'optional',
  },
};

const NOTO_SERIF_BENGALI_BOLD = {
  '@font-face': {
    fontFamily: 'Noto Serif Bengali',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `url('fonts/NotoSerifBengali/bold.woff2') format('woff2'), url('fonts/NotoSerifBengali/bold.woff') format('woff'), url('fonts/NotoSerifBengali/normal.eot') format('eot'), url('fonts/NotoSerifBengali/bold.ttf') format('ttf')`,
    fontDisplay: 'optional',
  },
};

const REITH_QALAM_REGULAR = {
  '@font-face': {
    fontFamily: 'BBC Reith Qalam',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('fonts/ReithQalam/normal.woff2') format('woff2'), url('fonts/ReithQalam/normal.woff') format('woff')`,
    fontDisplay: 'optional',
  },
};

const REITH_QALAM_BOLD = {
  '@font-face': {
    fontFamily: 'BBC Reith Qalam',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `url('fonts/ReithQalam/bold.woff2') format('woff2'), url('fonts/ReithQalam/bold.woff') format('woff')`,
    fontDisplay: 'optional',
  },
};

addDecorator(story => {
  useEffect(() => {
    if (isChromatic()) {
      forceVisible();
    }
  }, []);

  return (
    /* eslint-disable react/jsx-filename-extension */
    <>
      <Global
        styles={[
          REITH_SERIF_REGULAR,
          REITH_SERIF_BOLD,
          REITH_SERIF_LIGHT,
          REITH_SERIF_MEDIUM,
          REITH_SERIF_EXTRA_BOLD,
          REITH_SANS_REGULAR,
          REITH_SANS_BOLD,
          REITH_SANS_LIGHT,
          REITH_SANS_LIGHT_ITALIC,
          REITH_SANS_MEDIUM,
          REITH_SANS_EXTRA_BOLD,
          REITH_SANS_EXTRA_BOLD_ITALIC,
          REITH_SANS_CONDENSED_REGULAR,
          REITH_SANS_CONDENSED_BOLD,
          NOTO_SERIF_SINHALA_REGULAR,
          NOTO_SERIF_SINHALA_BOLD,
          NOTO_SANS_TAMIL_REGULAR,
          NOTO_SANS_TAMIL_BOLD,
          MALLANNA_REGULAR,
          NOTO_SANS_ETHIOPIC_REGULAR,
          NOTO_SANS_ETHIOPIC_BOLD,
          PADAUK_REGULAR,
          PADAUK_BOLD,
          NOTO_SERIF_BENGALI_REGULAR,
          NOTO_SERIF_BENGALI_BOLD,
          REITH_QALAM_REGULAR,
          REITH_QALAM_BOLD,
        ]}
      />
      <GlobalStyles />
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
