import { GREY_1, WHITE, NEWS_CORE } from '../../palette';
import helmetFontVariants from '../../fontVariants/helmet';
import brandSVG from '../../chameleonLogos/serbian';

const baseSerbianTheme = {
  palette: {
    BRAND_BACKGROUND: NEWS_CORE,
    BRAND_LOGO: WHITE,
  },
  typography: {
    fontVariants: helmetFontVariants,
    fontFaces: [],
  },
  brandSVG,
};

export default baseSerbianTheme;
