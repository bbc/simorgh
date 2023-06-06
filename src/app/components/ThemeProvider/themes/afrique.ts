import { WHITE, NEWS_CORE } from '../palette';
import latinScript from '../fontScripts/latin';
import helmetFontVariants from '../fontVariants/helmet';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../chameleonLogos/afrique';

const afriqueTheme = {
  palette: {
    BRAND_BACKGROUND: NEWS_CORE,
    BRAND_LOGO: WHITE,
  },
  typography: {
    script: latinScript,
    fontVariants: helmetFontVariants,
    fontFaces: [],
  },
  brandSVG,
};

export default withThemeProvider(afriqueTheme);
