import type { ServiceTheme } from '#app/models/types/theming';
import brandSVG from '../chameleonLogos/sport';
import {
  REITH_SANS_BOLD,
  REITH_SANS_REGULAR,
  REITH_SERIF_LIGHT,
  REITH_SERIF_MEDIUM,
} from '../fontFaces';
import latinScript from '../fontScripts/latin';
import reithFontVariants from '../fontVariants/reith';
import {
  BLACK,
  MIDNIGHT_BLACK,
  SPORT_YELLOW,
  SPORT_YELLOW_30,
} from '../palette';
import withThemeProvider from '../withThemeProvider';

export const theme: ServiceTheme = {
  palette: {
    BRAND_BACKGROUND: SPORT_YELLOW,
    BRAND_LOGO: BLACK,
    BRAND_FOREGROUND: MIDNIGHT_BLACK,
    BRAND_HIGHLIGHT: SPORT_YELLOW_30,
    BRAND_BORDER: BLACK,
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

export default withThemeProvider(theme);
