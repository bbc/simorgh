import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../palette';
import latin from '../fontScripts/latin';
import helmetFontVariants from '../fontVariants/helmet';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../chameleonLogos/pidgin';
import getPWATypographyTheme from './getPWATypographyTheme';
import mergeThemeWithPWATypography from './mergeThemeWithPWATypography';

const baseTheme = {
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
  usePWATypography: true,
};

const pwaTheme = getPWATypographyTheme();

export const theme = mergeThemeWithPWATypography({
  baseTheme,
  pwaTheme,
});

export default withThemeProvider(baseTheme, pwaTheme);
