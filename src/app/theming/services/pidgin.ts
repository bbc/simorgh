import { GHOST, WHITE, BLUEJAY, POSTBOX_30 } from '../colours';
import latin from '../typography/scripts/latin';
import { REITH_SANS_BOLD, REITH_SANS_REGULAR } from '../typography/fontFaces';
import { REITH_SANS } from '../typography/fontFamilies';

const pidgin = {
  colours: {
    BRAND_BACKGROUND: BLUEJAY,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
  typography: {
    script: latin,
    fontFamilyVariants: {
      primary: REITH_SANS,
    },
    fontFaces: [REITH_SANS_BOLD, REITH_SANS_REGULAR],
  },
};

export default pidgin;
