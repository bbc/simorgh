import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../palette';
import arabicScript from '../typography/scripts/arabic';
import { REITH_QALAM_REGULAR, REITH_QALAM_BOLD } from '../typography/fontFaces';
import { REITH_QALAM } from '../typography/fontFamilies';
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
    fontFamilyVariants: {
      primary: REITH_QALAM,
    },
    fontFaces: [REITH_QALAM_REGULAR, REITH_QALAM_BOLD],
  },
};

export default withThemeProvider(pashtoTheme);
