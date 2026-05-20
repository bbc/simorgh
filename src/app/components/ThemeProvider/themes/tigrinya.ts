import type { ServiceTheme } from '#app/models/types/theming';
import brandSVG from '../chameleonLogos/tigrinya';
import {
  NOTO_SANS_ETHIOPIC_BOLD,
  NOTO_SANS_ETHIOPIC_REGULAR,
} from '../fontFaces';
import noAscOrDescScript from '../fontScripts/noAscOrDesc';
import tigrinyaFontVariants from '../fontVariants/tigrinya';
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
    script: noAscOrDescScript,
    fontVariants: tigrinyaFontVariants,
    fontFaces: [NOTO_SANS_ETHIOPIC_REGULAR, NOTO_SANS_ETHIOPIC_BOLD],
  },
  brandSVG,
};

export default withThemeProvider(theme);
