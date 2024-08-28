import brandSVG from '#legacy/psammead/psammead-assets/src/svgs/newsround';
import { NEWSROUND_PURPLE, NEWSROUND_PURPLE_30, WHITE } from '../palette';
import latinScript from '../fontScripts/latin';
import {
  REITH_SANS_BOLD,
  REITH_SANS_REGULAR,
  REITH_SERIF_MEDIUM,
  REITH_SERIF_LIGHT,
} from '../fontFaces';
import reithFontVariants from '../fontVariants/reith';
import withThemeProvider from '../withThemeProvider';

const newsroundTheme = {
  palette: {
    BRAND_BACKGROUND: NEWSROUND_PURPLE,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: WHITE,
    BRAND_HIGHLIGHT: NEWSROUND_PURPLE_30,
    BRAND_BORDER: WHITE,
  },
  typography: {
    script: latinScript,
    fontVariants: reithFontVariants,
    fontFaces: [
      REITH_SANS_BOLD,
      REITH_SANS_REGULAR,
      REITH_SERIF_MEDIUM,
      REITH_SERIF_LIGHT,
    ],
  },
  brandSVG,
};

export default withThemeProvider(newsroundTheme);
