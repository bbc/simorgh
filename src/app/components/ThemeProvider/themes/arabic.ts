import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../palette';
import arabicScript from '../fontScripts/arabic';
import { REITH_QALAM_BOLD, REITH_QALAM_REGULAR } from '../fontFaces';
import reithQalamFontVariants from '../fontVariants/reithQalam';
import withThemeProvider from '../withThemeProvider';

const arabicTheme = {
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
    fontFaces: [REITH_QALAM_BOLD, REITH_QALAM_REGULAR],
  },
};

export default withThemeProvider(arabicTheme);
