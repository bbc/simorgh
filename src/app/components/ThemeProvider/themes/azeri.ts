import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../palette';
import latinWithDiacriticsScript from '../fontScripts/latinWithDiacritics';
import helmetFontVariants from '../fontVariants/helmet';
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
    script: latinWithDiacriticsScript,
    fontFaces: [],
    fontVariants: helmetFontVariants,
  },
};

export const pwaTheme = getPWATypographyTheme(latinWithDiacriticsScript);

export default withThemeProvider(theme, pwaTheme);
