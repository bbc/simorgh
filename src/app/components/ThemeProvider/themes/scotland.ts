import { GHOST, WHITE, NEWS_CORE } from '../palette';
import latinScript from '../fontScripts/latin';
import {
  REITH_SANS_BOLD,
  REITH_SANS_REGULAR,
  REITH_SERIF_MEDIUM,
} from '../fontFaces';
import reithFontVariants from '../fontVariants/reith';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../../../legacy/psammead/psammead-assets/src/svgs/scotland';

const scotlandTheme = {
  palette: {
    BRAND_BACKGROUND: NEWS_CORE,
    BRAND_LOGO: WHITE,
  },
  typography: {
    script: latinScript,
    fontVariants: reithFontVariants,
    fontFaces: [REITH_SANS_BOLD, REITH_SANS_REGULAR, REITH_SERIF_MEDIUM],
  },
  brandSVG,
};

export default withThemeProvider(scotlandTheme);
