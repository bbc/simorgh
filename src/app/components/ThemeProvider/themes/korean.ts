import { GREY_1, WHITE, NEWS_CORE } from '../palette';
import noAscOrDescScript from '../fontScripts/noAscOrDesc';
import koreanFontVariants from '../fontVariants/korean';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../chameleonLogos/korean';

const koreanTheme = {
  palette: {
    BRAND_BACKGROUND: NEWS_CORE,
    BRAND_LOGO: WHITE,
  },
  typography: {
    script: noAscOrDescScript,
    fontVariants: koreanFontVariants,
    fontFaces: [],
  },
  brandSVG,
};

export default withThemeProvider(koreanTheme);
