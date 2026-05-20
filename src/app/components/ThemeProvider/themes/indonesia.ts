import type { ServiceTheme } from '#app/models/types/theming';
import brandSVG from '../chameleonLogos/indonesia';
import latinScript from '../fontScripts/latin';
import helmetFontVariants from '../fontVariants/helmet';
import { GHOST, POSTBOX, POSTBOX_30, WHITE } from '../palette';
import withThemeProvider from '../withThemeProvider';
import getPWATypographyTheme from './getPWATypographyTheme';

export const theme: ServiceTheme = {
  palette: {
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
  typography: {
    script: latinScript,
    fontVariants: helmetFontVariants,
    fontFaces: [],
  },
  brandSVG,
};

export const pwaTheme = getPWATypographyTheme();

export default withThemeProvider(theme, pwaTheme);
