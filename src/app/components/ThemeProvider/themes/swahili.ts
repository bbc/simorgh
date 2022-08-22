import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../palette';
import latinScript from '../typography/scripts/latin';
import { HELMET } from '../typography/fontFamilies';
import withThemeProvider from '../withThemeProvider';

const swahiliTheme = {
  palette: {
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
  typography: {
    script: latinScript,
    fontFamilyVariants: {
      primary: HELMET,
    },
    fontFaces: [],
  },
};

export default withThemeProvider(swahiliTheme);
