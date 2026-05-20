import type { ServiceTheme } from '#app/models/types/theming';
import brandSVG from '../chameleonLogos/dari';
import { REITH_QALAM_BOLD, REITH_QALAM_REGULAR } from '../fontFaces';
import arabicScript from '../fontScripts/arabic';
import reithQalamFontVariants from '../fontVariants/reithQalam';
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
    script: arabicScript,
    fontVariants: reithQalamFontVariants,
    fontFaces: [REITH_QALAM_REGULAR, REITH_QALAM_BOLD],
  },
  brandSVG,
};

export default withThemeProvider(theme);
