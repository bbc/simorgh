import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../palette';
import devanagariScript from '../fontScripts/devanagari';
import { NOTO_SANS_TELUGU_REGULAR, NOTO_SANS_TELUGU_BOLD } from '../fontFaces';
import teluguFontVariants from '../fontVariants/telugu';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../chameleonLogos/telugu';

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
    fontVariants: teluguFontVariants,
    fontFaces: [NOTO_SANS_TELUGU_REGULAR, NOTO_SANS_TELUGU_BOLD],
  },
  brandSVG,
};

export default withThemeProvider(teluguTheme);
