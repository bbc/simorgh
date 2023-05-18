import { GHOST, WHITE, NEWS_CORE } from '../palette';
import latinWithDiacriticsScript from '../fontScripts/latinWithDiacritics';
import {
  REITH_SANS_BOLD,
  REITH_SANS_REGULAR,
  REITH_SERIF_MEDIUM,
} from '../fontFaces';
import reithFontVariants from '../fontVariants/reith';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../../../legacy/psammead/psammead-assets/src/svgs/cymrufyw';

const cymrufywTheme = {
  palette: {
    BRAND_BACKGROUND: NEWS_CORE,
    BRAND_LOGO: WHITE,
  },
  typography: {
    script: latinWithDiacriticsScript,
    fontVariants: reithFontVariants,
    fontFaces: [REITH_SANS_BOLD, REITH_SANS_REGULAR, REITH_SERIF_MEDIUM],
  },
  brandSVG,
};

export default withThemeProvider(cymrufywTheme);
