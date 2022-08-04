import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../colours';
import latinWithDiacriticsScript from '../typography/scripts/latinWithDiacritics';
import { HELMET } from '../typography/fontFamilies';

const azeriTheme = {
  colours: {
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
  typography: {
    script: latinWithDiacriticsScript,
    fontFamilyVariants: {
      primary: HELMET,
    },
    fontFaces: [],
  },
};

export default azeriTheme;
