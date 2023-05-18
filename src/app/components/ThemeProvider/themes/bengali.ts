import { GHOST, WHITE, NEWS_CORE } from '../palette';
import bengaliScript from '../fontScripts/bengali';
import {
  NOTO_SERIF_BENGALI_BOLD,
  NOTO_SERIF_BENGALI_REGULAR,
} from '../fontFaces';
import bengaliFontVariants from '../fontVariants/bengali';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../chameleonLogos/bangla';

const bengaliTheme = {
  palette: {
    BRAND_BACKGROUND: NEWS_CORE,
    BRAND_LOGO: WHITE,
  },
  typography: {
    script: bengaliScript,
    fontVariants: bengaliFontVariants,
    fontFaces: [NOTO_SERIF_BENGALI_BOLD, NOTO_SERIF_BENGALI_REGULAR],
  },
  brandSVG,
};

export default withThemeProvider(bengaliTheme);
