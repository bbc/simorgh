import { GHOST, WHITE, NEWS_CORE } from '../palette';
import sinhaleseScript from '../fontScripts/sinhalese';
import {
  NOTO_SERIF_SINHALA_BOLD,
  NOTO_SERIF_SINHALA_REGULAR,
} from '../fontFaces';
import sinhalaFontVariants from '../fontVariants/sinhala';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../chameleonLogos/sinhala';

const sinhalaTheme = {
  palette: {
    BRAND_BACKGROUND: NEWS_CORE,
    BRAND_LOGO: WHITE,
  },
  typography: {
    script: sinhaleseScript,
    fontVariants: sinhalaFontVariants,
    fontFaces: [NOTO_SERIF_SINHALA_BOLD, NOTO_SERIF_SINHALA_REGULAR],
  },
  brandSVG,
};

export default withThemeProvider(sinhalaTheme);
