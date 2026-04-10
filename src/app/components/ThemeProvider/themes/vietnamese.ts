import { ServiceTheme } from '#app/models/types/theming';
import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../palette';
import latinWithDiacriticsScript from '../fontScripts/latinWithDiacritics';
import helmetFontVariants from '../fontVariants/helmet';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../chameleonLogos/vietnamese';

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
