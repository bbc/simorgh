import { NEWSROUND_PURPLE, NEWSROUND_PURPLE_30, WHITE } from '../palette';
import withThemeProvider from '../withThemeProvider';

const newsroundTheme = {
  palette: {
    BRAND_BACKGROUND: NEWSROUND_PURPLE,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: WHITE,
    BRAND_HIGHLIGHT: NEWSROUND_PURPLE_30,
    BRAND_BORDER: WHITE,
  },
};

export default withThemeProvider(newsroundTheme);
