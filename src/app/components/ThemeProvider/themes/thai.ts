import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../palette';
import thaiScript from '../fontScripts/thai';
import thaiFontVariants from '../fontVariants/thai';
import withThemeProvider from '../withThemeProvider';

const thaiTheme = {
  palette: {
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
  typography: {
    script: thaiScript,
    fontVariants: thaiFontVariants,
    fontFaces: [],
  },
};

export default withThemeProvider(thaiTheme);
