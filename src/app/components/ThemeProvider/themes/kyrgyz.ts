import { ServiceTheme } from '#app/models/types/theming';
import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../palette';
import cyrillicScript from '../fontScripts/cyrillic';
import helmetFontVariants from '../fontVariants/helmet';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../chameleonLogos/kyrgyz';
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
    script: cyrillicScript,
    fontVariants: helmetFontVariants,
    fontFaces: [],
  },
  brandSVG,
};

export const pwaTheme = getPWATypographyTheme(cyrillicScript);

export default withThemeProvider(theme, pwaTheme);
