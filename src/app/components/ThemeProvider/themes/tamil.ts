import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../palette';
import tamilScript from '../fontScripts/tamil';
import { NOTO_SANS_TAMIL_BOLD, NOTO_SANS_TAMIL_REGULAR } from '../fontFaces';
import tamilFontVariants from '../fontVariants/tamil';
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
    fontVariants: tamilFontVariants,
    fontFaces: [NOTO_SANS_TAMIL_BOLD, NOTO_SANS_TAMIL_REGULAR],
  },
};

export default withThemeProvider(tamilTheme);
