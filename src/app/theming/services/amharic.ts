import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../colours';
import noAscOrDescScript from '../typography/scripts/noAscOrDesc';
import {
  NOTO_SANS_ETHIOPIC_BOLD,
  NOTO_SANS_ETHIOPIC_REGULAR,
} from '../typography/fontFaces';
import { NOTO_SANS_ETHIOPIC } from '../typography/fontFamilies';

const amharicTheme = {
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
      primary: NOTO_SANS_ETHIOPIC,
    },
    fontFaces: [NOTO_SANS_ETHIOPIC_BOLD, NOTO_SANS_ETHIOPIC_REGULAR],
  },
};

export default amharicTheme;
