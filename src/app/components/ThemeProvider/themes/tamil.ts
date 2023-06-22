import { WHITE, NEWS_CORE } from '../palette';
import tamilScript from '../fontScripts/tamil';
import { NOTO_SANS_TAMIL_BOLD, NOTO_SANS_TAMIL_REGULAR } from '../fontFaces';
import tamilFontVariants from '../fontVariants/tamil';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../chameleonLogos/tamil';

const tamilTheme = {
  palette: {
    BRAND_BACKGROUND: NEWS_CORE,
    BRAND_LOGO: WHITE,
  },
  typography: {
    script: tamilScript,
    fontVariants: tamilFontVariants,
    fontFaces: [NOTO_SANS_TAMIL_BOLD, NOTO_SANS_TAMIL_REGULAR],
  },
  brandSVG,
};

export default withThemeProvider(tamilTheme);
