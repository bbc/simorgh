import { GHOST, WHITE, NEWS_CORE } from '../palette';
import noAscOrDescScript from '../fontScripts/noAscOrDesc';
import {
  NOTO_SANS_ETHIOPIC_BOLD,
  NOTO_SANS_ETHIOPIC_REGULAR,
} from '../fontFaces';
import tigrinyaFontVariants from '../fontVariants/tigrinya';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../chameleonLogos/tigrinya';

const tigrinyaTheme = {
  palette: {
    BRAND_BACKGROUND: NEWS_CORE,
    BRAND_LOGO: WHITE,
  },
  typography: {
    script: noAscOrDescScript,
    fontVariants: tigrinyaFontVariants,
    fontFaces: [NOTO_SANS_ETHIOPIC_BOLD, NOTO_SANS_ETHIOPIC_REGULAR],
  },
  brandSVG,
};

export default withThemeProvider(tigrinyaTheme);
