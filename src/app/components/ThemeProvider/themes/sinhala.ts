import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../palette';
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
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
  typography: {
    script: sinhaleseScript,
    fontVariants: sinhalaFontVariants,
    fontFaces: [NOTO_SERIF_SINHALA_BOLD, NOTO_SERIF_SINHALA_REGULAR],
  },
  brandSVG,
};

export default withThemeProvider(sinhalaTheme);
