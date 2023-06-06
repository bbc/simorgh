import { GREY_1, WHITE, NEWS_CORE } from '../palette';
import latinWithDiacriticsScript from '../fontScripts/latinWithDiacritics';
import {
  REITH_SANS_BOLD,
  REITH_SANS_REGULAR,
  REITH_SERIF_MEDIUM,
  REITH_SERIF_LIGHT,
} from '../fontFaces';
import withThemeProvider from '../withThemeProvider';
import reithVariants from '../fontVariants/reith';
import brandSVG from '../chameleonLogos/mundo';

const mundoTheme = {
  palette: {
    BRAND_BACKGROUND: NEWS_CORE,
    BRAND_LOGO: WHITE,
  },
  typography: {
    script: latinWithDiacriticsScript,
    fontFaces: [
      REITH_SANS_BOLD,
      REITH_SANS_REGULAR,
      REITH_SERIF_MEDIUM,
      REITH_SERIF_LIGHT,
    ],
    fontVariants: reithVariants,
  },
  brandSVG,
};

export default withThemeProvider(mundoTheme);
