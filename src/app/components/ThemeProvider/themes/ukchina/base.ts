import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../../palette';
import noAscOrDescScript from '../../fontScripts/noAscOrDesc';
import chineseFontVariants from '../../fontVariants/chinese';

const ukChinaTheme = {
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
};

export default ukChinaTheme;
