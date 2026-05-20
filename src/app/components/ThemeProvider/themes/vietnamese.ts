import type { ServiceTheme } from '#app/models/types/theming';
import brandSVG from '../chameleonLogos/vietnamese';
import latinWithDiacriticsScript from '../fontScripts/latinWithDiacritics';
import helmetFontVariants from '../fontVariants/helmet';
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
    script: latinWithDiacriticsScript,
    fontVariants: helmetFontVariants,
    fontFaces: [],
  },
  brandSVG,
};

export default withThemeProvider(theme);
