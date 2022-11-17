import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../palette';
import latinScript from '../fontScripts/latin';
import helmetFontVariants from '../fontVariants/helmet';
import withThemeProvider from '../withThemeProvider';

const igboTheme = {
  palette: {
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
  typography: {
    script: latinScript,
    fontVariants: helmetFontVariants,
    fontFaces: [],
  },
};

export default withThemeProvider(igboTheme);
