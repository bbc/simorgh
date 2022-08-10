import {
  SPORT_YELLOW,
  BLACK,
  MIDNIGHT_BLACK,
  SPORT_YELLOW_30,
} from '../palette';
import latinScript from '../typography/scripts/latin';
import {
  REITH_SANS_BOLD,
  REITH_SANS_REGULAR,
  REITH_SERIF_MEDIUM,
  REITH_SERIF_LIGHT,
} from '../typography/fontFaces';
import { REITH_SANS, REITH_SERIF } from '../typography/fontFamilies';
import withThemeProvider from '../withThemeProvider';

const sportTheme = {
  palette: {
    BRAND_BACKGROUND: SPORT_YELLOW,
    BRAND_LOGO: BLACK,
    BRAND_FOREGROUND: MIDNIGHT_BLACK,
    BRAND_HIGHLIGHT: SPORT_YELLOW_30,
    BRAND_BORDER: BLACK,
  },
  typography: {
    script: latinScript,
    fontFamilyVariants: {
      primary: REITH_SANS,
      secondary: REITH_SERIF,
    },
    fontFaces: [
      REITH_SANS_BOLD,
      REITH_SANS_REGULAR,
      REITH_SERIF_MEDIUM,
      REITH_SERIF_LIGHT,
    ],
  },
};

export default withThemeProvider(sportTheme);
