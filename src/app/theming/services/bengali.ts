import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../colours';
import bengaliScript from '../typography/scripts/bengali';
import {
  NOTO_SERIF_BENGALI_BOLD,
  NOTO_SERIF_BENGALI_REGULAR,
} from '../typography/fontFaces';
import { NOTO_SANS_BENGALI } from '../typography/fontFamilies';

const bengaliTheme = {
  colours: {
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
  typography: {
    script: bengaliScript,
    fontFamilyVariants: {
      primary: NOTO_SANS_BENGALI,
    },
    fontFaces: [NOTO_SERIF_BENGALI_BOLD, NOTO_SERIF_BENGALI_REGULAR],
  },
};

export default bengaliTheme;
