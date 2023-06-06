import { GREY_1, WHITE, NEWS_CORE } from '../../palette';
import noAscOrDescScript from '../../fontScripts/noAscOrDesc';
import chineseFontVariants from '../../fontVariants/chinese';
import brandSVG from '../../chameleonLogos/zhongwen';

const ukChinaTheme = {
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

export default ukChinaTheme;
