import type { ServiceTheme } from '#app/models/types/theming';
import brandSVG from '../chameleonLogos/sinhala';
import {
  NOTO_SERIF_SINHALA_BOLD,
  NOTO_SERIF_SINHALA_REGULAR,
} from '../fontFaces';
import sinhaleseScript from '../fontScripts/sinhalese';
import sinhalaFontVariants from '../fontVariants/sinhala';
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
    script: sinhaleseScript,
    fontVariants: sinhalaFontVariants,
    fontFaces: [NOTO_SERIF_SINHALA_REGULAR, NOTO_SERIF_SINHALA_BOLD],
  },
  brandSVG,
};

export default withThemeProvider(theme);
