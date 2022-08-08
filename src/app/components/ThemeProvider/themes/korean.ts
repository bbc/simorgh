import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../colours';
import noAscOrDescScript from '../typography/scripts/noAscOrDesc';
import { APPLE_SD_GOTHIC_PRO } from '../typography/fontFamilies';
import withThemeProvider from '../withThemeProvider';

const koreanTheme = {
  colours: {
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
  typography: {
    script: noAscOrDescScript,
    fontFamilyVariants: {
      primary: APPLE_SD_GOTHIC_PRO,
    },
    fontFaces: [],
  },
};

export default withThemeProvider(koreanTheme);
