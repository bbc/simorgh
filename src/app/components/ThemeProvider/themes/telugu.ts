import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../palette';
import devanagariScript from '../fontScripts/devanagari';
import { MALLANNA_REGULAR } from '../fontFaces';
import teluguFontVariants from '../fontVariants/telugu';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../chameleonLogos/telugu';

const teluguTheme = {
  palette: {
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
  typography: {
    script: devanagariScript,
    fontVariants: teluguFontVariants,
    fontFaces: [MALLANNA_REGULAR],
  },
  brandSVG,
};

export default withThemeProvider(teluguTheme);
