import { GHOST, WHITE, NEWS_CORE } from '../palette';
import devanagariScript from '../fontScripts/devanagari';
import { MALLANNA_REGULAR } from '../fontFaces';
import teluguFontVariants from '../fontVariants/telugu';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../chameleonLogos/telugu';

const teluguTheme = {
  palette: {
    BRAND_BACKGROUND: NEWS_CORE,
    BRAND_LOGO: WHITE,
  },
  typography: {
    script: devanagariScript,
    fontVariants: teluguFontVariants,
    fontFaces: [MALLANNA_REGULAR],
  },
  brandSVG,
};

export default withThemeProvider(teluguTheme);
