import { GHOST, WHITE, NEWS_CORE } from '../palette';
import burmeseScript from '../fontScripts/burmese';
import { PADAUK_BOLD, PADAUK_REGULAR } from '../fontFaces';
import burmeseFontVariants from '../fontVariants/burmese';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../chameleonLogos/burmese';

const burmeseTheme = {
  palette: {
    BRAND_BACKGROUND: NEWS_CORE,
    BRAND_LOGO: WHITE,
  },
  typography: {
    script: burmeseScript,
    fontVariants: burmeseFontVariants,
    fontFaces: [PADAUK_BOLD, PADAUK_REGULAR],
  },
  brandSVG,
};

export default withThemeProvider(burmeseTheme);
