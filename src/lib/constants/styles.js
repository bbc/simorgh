import { injectGlobal } from 'styled-components';

// Note - this file should only include standard constants,
// agreed to by UX and Engineering

// Colours
export const C_EBON = '#222222';
export const C_POSTBOX = '#BB1919';
export const C_STORM = '#404040';
export const C_WHITE = '#FFFFFF';

// Font family
export const FF_NEWS_SANS_LIT = 'ReithSansNewsLight, Arial, Helvetica, freesans, sans-serif';
export const FF_NEWS_SANS_REG = 'ReithSansNewsRegular, Arial, Helvetica, freesans, sans-serif';
export const FF_NEWS_SANS_MDM = 'ReithSansNewsMedium, Arial, Helvetica, freesans, sans-serif';
export const FF_NEWS_SANS_BLD = 'ReithSansNewsBold, Arial, Helvetica, freesans, sans-serif';

export const FF_NEWS_SERIF_LIT = 'ReithSerifNewsLight, Arial, Helvetica, freesans, sans-serif';
export const FF_NEWS_SERIF_REG = 'ReithSerifNewsRegular, Arial, Helvetica, freesans, sans-serif';
export const FF_NEWS_SERIF_MDM = 'ReithSerifNewsMedium, Arial, Helvetica, freesans, sans-serif';
export const FF_NEWS_SERIF_BLD = 'ReithSerifNewsMedium, Arial, Helvetica, freesans, sans-serif';

// GEL Spacing
export const GEL_SPACING = '8px';
export const GEL_SPACING_DBL = '16px';

// Start defining Reith fonts.
/* eslint-disable no-unused-expressions */
injectGlobal`
  @font-face {
    font-display: optional;
    font-family: ReithSansNewsLight;
    font-style: normal;
    font-weight: 300;
    src: url('https://gel.files.bbci.co.uk/r2.302/BBCReithSans_W_Lt.woff') format('woff'), url('https://gel.files.bbci.co.uk/r2.302/BBCReithSans_W_Lt.woff2') format('woff2');
  }
  @font-face {
    font-display: optional;
    font-family: ReithSansNewsRegular;
    font-style: normal;
    font-weight: 400;
    src: url('https://gel.files.bbci.co.uk/r2.302/BBCReithSans_W_Rg.woff') format('woff'), url('https://gel.files.bbci.co.uk/r2.302/BBCReithSans_W_Rg.woff2') format('woff2');
  }
  @font-face {
    font-display: optional;
    font-family: ReithSansNewsMedium;
    font-style: normal;
    font-weight: bold;
    src: url('https://gel.files.bbci.co.uk/r2.302/BBCReithSans_W_Md.woff') format('woff'), url('https://gel.files.bbci.co.uk/r2.302/BBCReithSans_W_Md.woff2') format('woff2');
  }
  @font-face {
    font-display: optional;
    font-family: ReithSansNewsBold;
    font-style: normal;
    font-weight: bold;
    src: url('https://gel.files.bbci.co.uk/r2.302/BBCReithSans_W_Bd.woff') format('woff'), url('https://gel.files.bbci.co.uk/r2.302/BBCReithSans_W_Bd.woff2') format('woff2');
  }
  @font-face {
    font-display: optional;
    font-family: ReithSerifNewsLight;
    font-style: normal;
    font-weight: 300;
    src: url('https://gel.files.bbci.co.uk/r2.302/BBCReithSerif_W_Lt.woff') format('woff'), url('https://gel.files.bbci.co.uk/r2.302/BBCReithSerif_W_Lt.woff2') format('woff2');
  }
  @font-face {
    font-display: optional;
    font-family: ReithSerifNewsRegular;
    font-style: normal;
    font-weight: 400;
    src: url('https://gel.files.bbci.co.uk/r2.302/BBCReithSerif_W_Rg.woff') format('woff'), url('https://gel.files.bbci.co.uk/r2.302/BBCReithSerif_W_Rg.woff2') format('woff2');
  }
  @font-face {
    font-display: optional;
    font-family: ReithSerifNewsMedium;
    font-style: normal;
    font-weight: bold;
    src: url('https://gel.files.bbci.co.uk/r2.302/BBCReithSerif_W_Md.woff') format('woff'), url('https://gel.files.bbci.co.uk/r2.302/BBCReithSerif_W_Md.woff2') format('woff2');
  }
  @font-face {
    font-display: optional;
    font-family: ReithSerifNewsBold;
    font-style: normal;
    font-weight: bold;
    src: url('https://gel.files.bbci.co.uk/r2.302/BBCReithSerif_W_Bd.woff') format('woff'), url('https://gel.files.bbci.co.uk/r2.302/BBCReithSerif_W_Bd.woff2') format('woff2');
  }
`
