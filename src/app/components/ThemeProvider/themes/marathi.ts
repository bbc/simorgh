import { GHOST, WHITE, NEWS_CORE } from '../palette';
import devanagariScript from '../fontScripts/devanagari';
import marathiFontVariants from '../fontVariants/marathi';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../chameleonLogos/marathi';

const marathiTheme = {
  palette: {
    BRAND_BACKGROUND: NEWS_CORE,
    BRAND_LOGO: WHITE,
  },
  typography: {
    script: devanagariScript,
    fontVariants: marathiFontVariants,
    fontFaces: [],
  },
  brandSVG,
};

export default withThemeProvider(marathiTheme);
