import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../palette';
import gurmukhiScript from '../typography/scripts/gurmukhi';
import { NOTO_SANS_GURMUKHI } from '../typography/fontFamilies';
import withThemeProvider from '../withThemeProvider';

const punjabiTheme = {
  palette: {
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
  typography: {
    script: gurmukhiScript,
    fontFamilies: {
      primary: NOTO_SANS_GURMUKHI,
    },
    fontFaces: [],
  },
};

export default withThemeProvider(punjabiTheme);
