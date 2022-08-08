import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../colours';
import gurmukhiScript from '../typography/scripts/gurmukhi';
import { NOTO_SANS_GURMUKHI } from '../typography/fontFamilies';
import withThemeProvider from '../withThemeProvider';

const punjabiTheme = {
  colours: {
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
  typography: {
    script: gurmukhiScript,
    fontFamilyVariants: {
      primary: NOTO_SANS_GURMUKHI,
    },
    fontFaces: [],
  },
};

export default withThemeProvider(punjabiTheme);
