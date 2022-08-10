import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../palette';
import gurmukhiScript from '../typography/scripts/gurmukhi';
import { MALLANNA_REGULAR } from '../typography/fontFaces';
import { MALLANA_NOTO_SANS_TELUGU } from '../typography/fontFamilies';
import withThemeProvider from '../withThemeProvider';

const teluguTheme = {
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
      primary: MALLANA_NOTO_SANS_TELUGU,
    },
    fontFaces: [MALLANNA_REGULAR],
  },
};

export default withThemeProvider(teluguTheme);
