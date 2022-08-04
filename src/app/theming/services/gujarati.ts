import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../colours';
import gurmukhiScript from '../typography/scripts/gurmukhi';
import {
  REITH_SANS_BOLD,
  REITH_SANS_REGULAR,
  REITH_SERIF_MEDIUM,
  REITH_SERIF_LIGHT,
} from '../typography/fontFaces';
import { MUKTA_VAANI } from '../typography/fontFamilies';

const gujarati = {
  colours: {
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
  typography: {
    script: gurmukhiScript,
    fontFamilyVariants: {
      primary: MUKTA_VAANI,
    },
    fontFaces: [
      REITH_SANS_BOLD,
      REITH_SANS_REGULAR,
      REITH_SERIF_MEDIUM,
      REITH_SERIF_LIGHT,
    ],
  },
};

export default gujarati;
