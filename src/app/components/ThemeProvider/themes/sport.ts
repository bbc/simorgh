import {
  SPORT_YELLOW,
  BLACK,
  MIDNIGHT_BLACK,
  SPORT_YELLOW_30,
} from '../palette';
import withThemeProvider from '../withThemeProvider';

const sportTheme = {
  palette: {
    BRAND_BACKGROUND: SPORT_YELLOW,
    BRAND_LOGO: BLACK,
    BRAND_FOREGROUND: MIDNIGHT_BLACK,
    BRAND_HIGHLIGHT: SPORT_YELLOW_30,
    BRAND_BORDER: BLACK,
  },
};

export default withThemeProvider(sportTheme);
