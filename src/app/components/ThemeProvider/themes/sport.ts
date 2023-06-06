import { SPORT_CORE, BLACK, GREY_10 } from '../palette';
import latinScript from '../fontScripts/latin';
import {
  REITH_SANS_BOLD,
  REITH_SANS_REGULAR,
  REITH_SERIF_MEDIUM,
  REITH_SERIF_LIGHT,
} from '../fontFaces';
import reithFontVariants from '../fontVariants/reith';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../chameleonLogos/sport';

const sportTheme = {
  palette: {
    BRAND_BACKGROUND: SPORT_CORE,
    BRAND_LOGO: BLACK,
  },
  typography: {
    script: latinScript,
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

export default withThemeProvider(sportTheme);
