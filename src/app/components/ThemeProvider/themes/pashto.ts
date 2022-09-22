import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../palette';
import arabicScript from '../fontScripts/arabic';
import { REITH_QALAM_REGULAR, REITH_QALAM_BOLD } from '../fontFaces';
import reithQalamFontVariants from '../fontVariants/reithQalam';
import withThemeProvider from '../withThemeProvider';

const pashtoTheme = {
  palette: {
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
  typography: {
    script: arabicScript,
    fontVariants: reithQalamFontVariants,
    fontFaces: [REITH_QALAM_REGULAR, REITH_QALAM_BOLD],
  },
};

export default withThemeProvider(pashtoTheme);
