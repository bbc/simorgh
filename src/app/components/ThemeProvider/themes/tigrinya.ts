import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../palette';
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
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
  typography: {
    script: noAscOrDescScript,
    fontVariants: tigrinyaFontVariants,
    fontFaces: [NOTO_SANS_ETHIOPIC_BOLD, NOTO_SANS_ETHIOPIC_REGULAR],
  },
  brandSVG,
};

export default withThemeProvider(tigrinyaTheme);
