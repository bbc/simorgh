import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../palette';
import latinWithDiacriticsScript from '../typography/scripts/latinWithDiacritics';
import {
  REITH_SANS_BOLD,
  REITH_SANS_REGULAR,
  REITH_SERIF_MEDIUM,
  REITH_SERIF_LIGHT,
} from '../typography/fontFaces';
import { REITH_SANS, REITH_SERIF } from '../typography/fontFamilies';
import withThemeProvider from '../withThemeProvider';

const mundoTheme = {
  palette: {
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
      secondary: REITH_SERIF,
    },
    fontFaces: [
      REITH_SANS_BOLD,
      REITH_SANS_REGULAR,
      REITH_SERIF_MEDIUM,
      REITH_SERIF_LIGHT,
    ],
  },
};

export default withThemeProvider(mundoTheme);
