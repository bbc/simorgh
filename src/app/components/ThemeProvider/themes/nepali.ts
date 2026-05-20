import type { ServiceTheme } from '#app/models/types/theming';
import brandSVG from '../chameleonLogos/nepali';
import devanagariScript from '../fontScripts/devanagari';
import nepaliFontVariants from '../fontVariants/nepali';
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
    fontVariants: nepaliFontVariants,
    fontFaces: [],
  },
  brandSVG,
};

export default withThemeProvider(theme);
