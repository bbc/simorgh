import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../palette';
import cyrillicScript from '../typography/scripts/cyrillic';
import { HELMET } from '../typography/fontFamilies';
import withThemeProvider from '../withThemeProvider';

const ukrainianTheme = {
  palette: {
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
  typography: {
    script: cyrillicScript,
    fontFamilyVariants: {
      primary: HELMET,
    },
    fontFaces: [],
  },
};

export default withThemeProvider(ukrainianTheme);
