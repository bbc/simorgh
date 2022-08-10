import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../palette';
import gurmukhiScript from '../typography/scripts/gurmukhi';
import { ARIAL } from '../typography/fontFamilies';
import withThemeProvider from '../withThemeProvider';

const hindiTheme = {
  palette: {
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
  typography: {
    script: gurmukhiScript,
    fontFamilyVariants: {
      primary: ARIAL,
    },
    fontFaces: [],
  },
};

export default withThemeProvider(hindiTheme);
