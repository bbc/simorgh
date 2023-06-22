import { WHITE, NEWS_CORE } from '../palette';
import devanagariScript from '../fontScripts/devanagari';
import gujaratiFontVariants from '../fontVariants/gujarati';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../chameleonLogos/gujarati';

const gujaratiTheme = {
  palette: {
    BRAND_BACKGROUND: NEWS_CORE,
    BRAND_LOGO: WHITE,
  },
  typography: {
    script: devanagariScript,
    fontVariants: gujaratiFontVariants,
    fontFaces: [],
  },
  brandSVG,
};

export default withThemeProvider(gujaratiTheme);
