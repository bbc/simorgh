import { GREY_1, WHITE, NEWS_CORE } from '../palette';
import noAscOrDescScript from '../fontScripts/noAscOrDesc';
import japaneseFontVariants from '../fontVariants/japanese';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../chameleonLogos/japanese';

const japaneseTheme = {
  palette: {
    BRAND_BACKGROUND: NEWS_CORE,
    BRAND_LOGO: WHITE,
  },
  typography: {
    script: noAscOrDescScript,
    fontVariants: japaneseFontVariants,
    fontFaces: [],
  },
  brandSVG,
};

export default withThemeProvider(japaneseTheme);
