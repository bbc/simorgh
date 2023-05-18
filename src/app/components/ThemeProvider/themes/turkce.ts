import { GHOST, WHITE, NEWS_CORE } from '../palette';
import latinWithDiacriticsScript from '../fontScripts/latinWithDiacritics';
import {
  REITH_SANS_BOLD,
  REITH_SANS_REGULAR,
  REITH_SERIF_MEDIUM,
  REITH_SERIF_LIGHT,
} from '../fontFaces';
import reithFontVariants from '../fontVariants/reith';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../chameleonLogos/turkish';

const turkceTheme = {
  palette: {
    BRAND_BACKGROUND: NEWS_CORE,
    BRAND_LOGO: WHITE,
  },
  typography: {
    script: latinWithDiacriticsScript,
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

export default withThemeProvider(turkceTheme);
