import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../palette';
import thaiScript from '../typography/scripts/thai';
import { TAHOMA } from '../typography/fontFamilies';
import withThemeProvider from '../withThemeProvider';

const thaiTheme = {
  palette: {
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
  typography: {
    script: thaiScript,
    fontFamilies: {
      primary: TAHOMA,
    },
    fontFaces: [],
  },
};

export default withThemeProvider(thaiTheme);
