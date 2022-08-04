import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../colours';
import sinhaleseScript from '../typography/scripts/sinhalese';
import {
  NOTO_SERIF_SINHALA_BOLD,
  NOTO_SERIF_SINHALA_REGULAR,
} from '../typography/fontFaces';
import { NOTO_SANS_SINHALA } from '../typography/fontFamilies';

const sinhalaTheme = {
  colours: {
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
  typography: {
    script: sinhaleseScript,
    fontFamilyVariants: {
      primary: NOTO_SANS_SINHALA,
    },
    fontFaces: [NOTO_SERIF_SINHALA_BOLD, NOTO_SERIF_SINHALA_REGULAR],
  },
};

export default sinhalaTheme;
