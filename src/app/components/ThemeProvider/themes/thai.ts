import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../palette';
import thaiScript from '../fontScripts/thai';
import thaiFontVariants from '../fontVariants/thai';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../chameleonLogos/thai';

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
  brandSVG,
};

export default withThemeProvider(thaiTheme);
