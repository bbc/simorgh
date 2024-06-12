import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../../palette';
import helmetFontVariants from '../../fontVariants/helmet';
import brandSVG from '../../chameleonLogos/uzbek';

const baseUzbekTheme = {
  palette: {
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
  typography: {
    fontVariants: helmetFontVariants,
    fontFaces: [],
  },
  brandSVG,
};

export default baseUzbekTheme;
