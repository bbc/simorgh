import type { ServiceTheme } from '#app/models/types/theming';
import brandSVG from '../chameleonLogos/tamil';
import { NOTO_SANS_TAMIL_BOLD, NOTO_SANS_TAMIL_REGULAR } from '../fontFaces';
import tamilScript from '../fontScripts/tamil';
import tamilFontVariants from '../fontVariants/tamil';
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
    script: tamilScript,
    fontVariants: tamilFontVariants,
    fontFaces: [NOTO_SANS_TAMIL_REGULAR, NOTO_SANS_TAMIL_BOLD],
  },
  brandSVG,
};

export default withThemeProvider(theme);
