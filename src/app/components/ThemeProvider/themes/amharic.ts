import { WHITE, NEWS_CORE } from '../palette';
import noAscOrDescScript from '../fontScripts/noAscOrDesc';
import {
  NOTO_SANS_ETHIOPIC_BOLD,
  NOTO_SANS_ETHIOPIC_REGULAR,
} from '../fontFaces';
import amharicFontVariants from '../fontVariants/amharic';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../chameleonLogos/amharic';

const amharicTheme = {
  palette: {
    BRAND_BACKGROUND: NEWS_CORE,
    BRAND_LOGO: WHITE,
  },
  typography: {
    script: noAscOrDescScript,
    fontVariants: amharicFontVariants,
    fontFaces: [NOTO_SANS_ETHIOPIC_BOLD, NOTO_SANS_ETHIOPIC_REGULAR],
  },
  brandSVG,
};

export default withThemeProvider(amharicTheme);
