import { WHITE, NEWS_CORE } from '../palette';
import devanagariScript from '../fontScripts/devanagari';
import hindiFontVariants from '../fontVariants/hindi';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../chameleonLogos/hindi';

const hindiTheme = {
  palette: {
    BRAND_BACKGROUND: NEWS_CORE,
    BRAND_LOGO: WHITE,
  },
  typography: {
    script: devanagariScript,
    fontVariants: hindiFontVariants,
    fontFaces: [],
  },
  brandSVG,
};

export default withThemeProvider(hindiTheme);
