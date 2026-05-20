import brandSVG from '../chameleonLogos/burmese';
import { PADAUK_BOLD, PADAUK_REGULAR } from '../fontFaces';
import burmeseScript from '../fontScripts/burmese';
import burmeseFontVariants from '../fontVariants/burmese';
import { GHOST, POSTBOX, POSTBOX_30, WHITE } from '../palette';
import withThemeProvider from '../withThemeProvider';

export const theme = {
  palette: {
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
  typography: {
    script: burmeseScript,
    fontVariants: burmeseFontVariants,
    fontFaces: [PADAUK_BOLD, PADAUK_REGULAR],
  },
  brandSVG,
};

export default withThemeProvider(theme);
