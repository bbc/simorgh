import { WHITE, NEWS_CORE } from '../palette';
import cyrillicScript from '../fontScripts/cyrillic';
import {
  REITH_SANS_BOLD,
  REITH_SANS_REGULAR,
  REITH_SERIF_MEDIUM,
  REITH_SERIF_LIGHT,
} from '../fontFaces';
import reithFontVariants from '../fontVariants/reith';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../chameleonLogos/russian';

const russianTheme = {
  palette: {
    BRAND_BACKGROUND: NEWS_CORE,
    BRAND_LOGO: WHITE,
  },
  typography: {
    script: cyrillicScript,
    fontVariants: reithFontVariants,
    fontFaces: [
      REITH_SANS_BOLD,
      REITH_SANS_REGULAR,
      REITH_SERIF_MEDIUM,
      REITH_SERIF_LIGHT,
    ],
  },
  brandSVG,
};

export default withThemeProvider(russianTheme);
