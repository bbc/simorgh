import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../colours';
import withThemeProvider from '../withThemeProvider';

const gahuzaTheme = {
  colours: {
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
};

export default withThemeProvider(gahuzaTheme);
