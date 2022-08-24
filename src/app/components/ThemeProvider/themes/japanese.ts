import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../palette';
import noAscOrDescScript from '../typography/scripts/noAscOrDesc';
import { HIRAGINO_KAGU_GOTHIC_PRO } from '../typography/fontFamilies';
import withThemeProvider from '../withThemeProvider';

const japaneseTheme = {
  palette: {
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
  typography: {
    script: noAscOrDescScript,
    fontFamilies: {
      primary: HIRAGINO_KAGU_GOTHIC_PRO,
    },
    fontFaces: [],
  },
};

export default withThemeProvider(japaneseTheme);
