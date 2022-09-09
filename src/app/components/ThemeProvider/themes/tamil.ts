import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../palette';
import tamilScript from '../typography/scripts/tamil';
import {
  NOTO_SANS_TAMIL_BOLD,
  NOTO_SANS_TAMIL_REGULAR,
} from '../typography/fontFaces';
import { NOTO_SANS_TAMIL } from '../typography/fontFamilies';
import withThemeProvider from '../withThemeProvider';

const tamilTheme = {
  palette: {
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
  typography: {
    script: tamilScript,
    fontFamilies: {
      primary: NOTO_SANS_TAMIL,
    },
    fontFaces: [NOTO_SANS_TAMIL_BOLD, NOTO_SANS_TAMIL_REGULAR],
  },
};

export default withThemeProvider(tamilTheme);
