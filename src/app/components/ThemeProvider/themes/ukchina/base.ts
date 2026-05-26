import brandSVG from '../../chameleonLogos/ukchina';
import noAscOrDescScript from '../../fontScripts/noAscOrDesc';
import chineseFontVariants from '../../fontVariants/chinese';
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
    script: noAscOrDescScript,
    fontVariants: chineseFontVariants,
    fontFaces: [],
  },
  brandSVG,
};
