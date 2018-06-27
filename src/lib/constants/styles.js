import { injectGlobal } from 'styled-components';

// Note - this file should only include standard constants,
// agreed to by UX and Engineering

// Colours
export const C_EBON = '#222222';
export const C_POSTBOX = '#BB1919';
export const C_STORM = '#404040';
export const C_WHITE = '#FFFFFF';

// Font family
export const FF_NEWS = 'ReithSansNewsRegular, Arial, Helvetica, freesans, sans-serif';

// GEL Spacing
export const GEL_SPACING = '8px';
export const GEL_SPACING_DBL = '16px';

// Start defining Reith fonts.
/* eslint-disable no-unused-expressions */
injectGlobal`
  @font-face {
    font-display: optional;
    font-family: ReithSansNewsRegular;
    src: url('https://gel.files.bbci.co.uk/r2.302/BBCReithSans_W_Rg.woff') format('woff'), url('https://gel.files.bbci.co.uk/r2.302/BBCReithSans_W_Rg.woff2') format('woff2');  }
`
