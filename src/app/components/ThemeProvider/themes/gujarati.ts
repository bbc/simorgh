import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../palette';
import devanagariScript from '../fontScripts/devanagari';
import gujaratiFontVariants from '../fontVariants/gujarati';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../chameleonLogos/gujarati';

const gujaratiTheme = {
  palette: {
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
  typography: {
    script: devanagariScript,
    fontVariants: gujaratiFontVariants,
    fontFaces: [],
  },
  brandSVG,
};

export default withThemeProvider(gujaratiTheme);
