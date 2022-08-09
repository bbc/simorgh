import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../palette';
import withThemeProvider from '../withThemeProvider';

const pashtoTheme = {
  palette: {
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
};

export default withThemeProvider(pashtoTheme);
