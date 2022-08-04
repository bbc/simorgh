import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../colours';
import latinWithDiacriticsScript from '../typography/scripts/latinWithDiacritics';
import {
  REITH_SANS_BOLD,
  REITH_SANS_REGULAR,
  REITH_SERIF_MEDIUM,
} from '../typography/fontFaces';
import { REITH_SANS } from '../typography/fontFamilies';

const naidheachdanTheme = {
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
      primary: REITH_SANS,
    },
    fontFaces: [REITH_SANS_BOLD, REITH_SANS_REGULAR, REITH_SERIF_MEDIUM],
  },
};

export default naidheachdanTheme;
