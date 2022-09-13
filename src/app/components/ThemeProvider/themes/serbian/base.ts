import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../../palette';
import { HELMET } from '../../typography/fontFamilies';

const baseSerbianTheme = {
  palette: {
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
  typography: {
    fontFamilies: {
      primary: HELMET,
    },
    fontFaces: [],
  },
};

export default baseSerbianTheme;
