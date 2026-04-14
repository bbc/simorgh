import { ServiceTheme } from '#app/models/types/theming';
import {
  GHOST,
  WHITE,
  POSTBOX,
  SPORT_YELLOW,
  BLACK,
  MIDNIGHT_BLACK,
  SPORT_YELLOW_30,
} from '../palette';
import latinScript from '../fontScripts/latin';
import helmetFontVariants from '../fontVariants/helmet';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../chameleonLogos/swahili';
import brandSVGSport from '../chameleonLogos/swahiliSport';
import getPWATypographyTheme from './getPWATypographyTheme';

export const theme = {
  palette: {
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX,
  },
  typography: {
    script: latinScript,
    fontVariants: helmetFontVariants,
    fontFaces: [],
  },
  brandSVG,
};

export const sportTheme: ServiceTheme = {
  ...theme,
  palette: {
    BRAND_BACKGROUND: SPORT_YELLOW,
    BRAND_LOGO: BLACK,
    BRAND_FOREGROUND: MIDNIGHT_BLACK,
    BRAND_HIGHLIGHT: SPORT_YELLOW_30,
    BRAND_BORDER: BLACK,
  },
  brandSVG: brandSVGSport,
};

export const pwaTheme = getPWATypographyTheme();

export default withThemeProvider(theme, pwaTheme, sportTheme);
