import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../colours';
import thaiScript from '../typography/scripts/thai';
import { TAHOMA } from '../typography/fontFamilies';

const thaiTheme = {
  colours: {
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
  typography: {
    script: thaiScript,
    fontFamilyVariants: {
      primary: TAHOMA,
    },
    fontFaces: [],
  },
};

export default thaiTheme;
