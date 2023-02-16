import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../palette';
import devanagariScript from '../fontScripts/devanagari';
import marathiFontVariants from '../fontVariants/marathi';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../chameleonLogos/marathi';

const marathiTheme = {
  palette: {
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
  typography: {
    script: devanagariScript,
    fontVariants: marathiFontVariants,
    fontFaces: [],
  },
  brandSVG,
};

export default withThemeProvider(marathiTheme);
