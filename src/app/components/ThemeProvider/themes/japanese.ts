import type { ServiceTheme } from '#app/models/types/theming';
import brandSVG from '../chameleonLogos/japanese';
import noAscOrDescScript from '../fontScripts/noAscOrDesc';
import japaneseFontVariants from '../fontVariants/japanese';
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
    fontVariants: japaneseFontVariants,
    fontFaces: [],
  },
  brandSVG,
};

export default withThemeProvider(theme);
