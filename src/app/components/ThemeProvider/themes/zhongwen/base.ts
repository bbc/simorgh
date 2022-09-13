import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../../palette';
import noAscOrDescScript from '../../typography/scripts/noAscOrDesc';
import { HELVETICA_CHINESE } from '../../typography/fontFamilies';

const zhongwenTheme = {
  palette: {
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
  typography: {
    script: noAscOrDescScript,
    fontFamilies: {
      primary: HELVETICA_CHINESE,
    },
    fontFaces: [],
  },
};

export default zhongwenTheme;
