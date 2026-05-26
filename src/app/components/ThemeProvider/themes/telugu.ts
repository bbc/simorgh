import type { ServiceTheme } from '#app/models/types/theming';
import brandSVG from '../chameleonLogos/telugu';
import { NOTO_SANS_TELUGU_BOLD, NOTO_SANS_TELUGU_REGULAR } from '../fontFaces';
import devanagariScript from '../fontScripts/devanagari';
import teluguFontVariants from '../fontVariants/telugu';
import { GHOST, POSTBOX, POSTBOX_30, WHITE } from '../palette';
import withThemeProvider from '../withThemeProvider';

export const theme: ServiceTheme = {
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

export default withThemeProvider(theme);
