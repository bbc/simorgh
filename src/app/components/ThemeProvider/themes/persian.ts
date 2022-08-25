import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../palette';
import arabicScript from '../typography/scripts/arabic';
import { REITH_QALAM_REGULAR, REITH_QALAM_BOLD } from '../typography/fontFaces';
import reithQalamFontVariants from '../typography/fontVariants/reithQalam';
import withThemeProvider from '../withThemeProvider';

const persianTheme = {
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

export default withThemeProvider(persianTheme);
