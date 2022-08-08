import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../colours';
import latinScript from '../typography/scripts/latin';
import { HELMET } from '../typography/fontFamilies';
import withThemeProvider from '../withThemeProvider';

const afaanoromooTheme = {
  colours: {
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

export default withThemeProvider(afaanoromooTheme);
