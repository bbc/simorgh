import { GREY_1, WHITE, NEWS_CORE } from '../palette';
import gurmukhiScript from '../fontScripts/gurmukhi';
import punjabiFontVariants from '../fontVariants/punjabi';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../chameleonLogos/punjabi';

const punjabiTheme = {
  palette: {
    BRAND_BACKGROUND: NEWS_CORE,
    BRAND_LOGO: WHITE,
  },
  typography: {
    script: gurmukhiScript,
    fontVariants: punjabiFontVariants,
    fontFaces: [],
  },
  brandSVG,
};

export default withThemeProvider(punjabiTheme);
