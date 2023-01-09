import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../palette';
import devanagariScript from '../fontScripts/devanagari';
import nepaliFontVariants from '../fontVariants/nepali';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../chameleonLogos/nepali';

const nepaliTheme = {
  palette: {
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
  typography: {
    script: devanagariScript,
    fontVariants: nepaliFontVariants,
    fontFaces: [],
  },
  brandSVG,
};

export default withThemeProvider(nepaliTheme);
