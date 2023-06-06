import { WHITE, NEWS_CORE } from '../palette';
import devanagariScript from '../fontScripts/devanagari';
import nepaliFontVariants from '../fontVariants/nepali';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../chameleonLogos/nepali';

const nepaliTheme = {
  palette: {
    BRAND_BACKGROUND: NEWS_CORE,
    BRAND_LOGO: WHITE,
  },
  typography: {
    script: devanagariScript,
    fontVariants: nepaliFontVariants,
    fontFaces: [],
  },
  brandSVG,
};

export default withThemeProvider(nepaliTheme);
