import { WHITE, NEWS_CORE } from '../../palette';
import noAscOrDescScript from '../../fontScripts/noAscOrDesc';
import chineseFontVariants from '../../fontVariants/chinese';
import brandSVG from '../../chameleonLogos/zhongwen';

const zhongwenTheme = {
  palette: {
    BRAND_BACKGROUND: NEWS_CORE,
    BRAND_LOGO: WHITE,
  },
  typography: {
    script: noAscOrDescScript,
    fontVariants: chineseFontVariants,
    fontFaces: [],
  },
  brandSVG,
};

export default zhongwenTheme;
