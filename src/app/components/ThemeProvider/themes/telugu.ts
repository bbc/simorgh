import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../palette';
import devanagariScript from '../typography/scripts/devanagari';
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
    script: devanagariScript,
    fontFamilies: {
      primary: MALLANA_NOTO_SANS_TELUGU,
    },
    fontFaces: [MALLANNA_REGULAR],
  },
};

export default withThemeProvider(teluguTheme);
