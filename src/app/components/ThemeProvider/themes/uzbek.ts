import { WHITE, NEWS_CORE } from '../palette';
import cyrillicScript from '../fontScripts/cyrillic';
import helmetFontVariants from '../fontVariants/helmet';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../chameleonLogos/uzbek';

const uzbekTheme = {
  palette: {
    BRAND_BACKGROUND: NEWS_CORE,
    BRAND_LOGO: WHITE,
  },
  typography: {
    script: cyrillicScript,
    fontVariants: helmetFontVariants,
    fontFaces: [],
  },
  brandSVG,
};

export default withThemeProvider(uzbekTheme);
