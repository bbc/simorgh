import { GREY_1, WHITE, NEWS_CORE } from '../palette';
import thaiScript from '../fontScripts/thai';
import thaiFontVariants from '../fontVariants/thai';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../chameleonLogos/thai';

const thaiTheme = {
  palette: {
    BRAND_BACKGROUND: NEWS_CORE,
    BRAND_LOGO: WHITE,
  },
  typography: {
    script: thaiScript,
    fontVariants: thaiFontVariants,
    fontFaces: [],
  },
  brandSVG,
};

export default withThemeProvider(thaiTheme);
