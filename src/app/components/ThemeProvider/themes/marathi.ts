import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../colours';
import devanagariScript from '../typography/scripts/devanagari';
import { NOTO_SANS_DEVANAGARI } from '../typography/fontFamilies';
import withThemeProvider from '../withThemeProvider';

const marathiTheme = {
  colours: {
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
  typography: {
    script: devanagariScript,
    fontFamilyVariants: {
      primary: NOTO_SANS_DEVANAGARI,
    },
    fontFaces: [],
  },
};

export default withThemeProvider(marathiTheme);
