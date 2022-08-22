import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../palette';
import devanagariScript from '../typography/scripts/devanagari';
import { MUKTA_VAANI } from '../typography/fontFamilies';
import withThemeProvider from '../withThemeProvider';

const gujaratiTheme = {
  palette: {
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
  typography: {
    script: devanagariScript,
    fontFamilyVariants: {
      primary: MUKTA_VAANI,
    },
    fontFaces: [],
  },
};

export default withThemeProvider(gujaratiTheme);
