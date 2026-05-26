import brandSVG from '../chameleonLogos/pidgin';
import latin from '../fontScripts/latin';
import helmetFontVariants from '../fontVariants/helmet';
import { GHOST, POSTBOX, POSTBOX_30, WHITE } from '../palette';
import withThemeProvider from '../withThemeProvider';
import getPWATypographyTheme from './getPWATypographyTheme';

export const theme = {
  palette: {
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
  typography: {
    script: latin,
    fontVariants: helmetFontVariants,
    fontFaces: [],
  },
  brandSVG,
};

export const pwaTheme = getPWATypographyTheme();

export default withThemeProvider(theme, pwaTheme);
