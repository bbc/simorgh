import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../palette';
import latinScript from '../fontScripts/latin';
import helmetFontVariants from '../fontVariants/helmet';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../chameleonLogos/afrique';
import reithVariants from '../fontVariants/reith';
import {
  REITH_SANS_BOLD,
  REITH_SANS_REGULAR,
  REITH_SERIF_MEDIUM,
  REITH_SERIF_LIGHT,
} from '../fontFaces';

const afriqueTheme = {
  palette: {
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
  typography: {
    script: latinScript,
    fontVariants: helmetFontVariants,
    fontFaces: [],
  },
  brandSVG,
};

const pwaTheme = {
  typography: {
    script: latinScript,
    fontFaces: [
      REITH_SANS_BOLD,
      REITH_SANS_REGULAR,
      REITH_SERIF_MEDIUM,
      REITH_SERIF_LIGHT,
    ],
    fontVariants: reithVariants,
  },
};

export default withThemeProvider(afriqueTheme, pwaTheme);
