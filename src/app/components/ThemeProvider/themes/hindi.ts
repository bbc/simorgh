import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../palette';
import devanagariScript from '../fontScripts/devanagari';
import hindiFontVariants from '../fontVariants/hindi';
import withThemeProvider from '../withThemeProvider';

const hindiTheme = {
  palette: {
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
  typography: {
    script: devanagariScript,
    fontVariants: hindiFontVariants,
    fontFaces: [],
  },
};

export default withThemeProvider(hindiTheme);
