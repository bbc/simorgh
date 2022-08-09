import {
  SPORT_YELLOW,
  BLACK,
  MIDNIGHT_BLACK,
  SPORT_YELLOW_30,
} from '../colours';
import withThemeProvider from '../withThemeProvider';

const sportTheme = {
  colours: {
    BRAND_BACKGROUND: SPORT_YELLOW,
    BRAND_LOGO: BLACK,
    BRAND_FOREGROUND: MIDNIGHT_BLACK,
    BRAND_HIGHLIGHT: SPORT_YELLOW_30,
    BRAND_BORDER: BLACK,
  },
};

export default withThemeProvider(sportTheme);
