import brandSVG from '../../chameleonLogos/serbian';
import helmetFontVariants from '../../fontVariants/helmet';
import { GHOST, POSTBOX, POSTBOX_30, WHITE } from '../../palette';

export default {
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
