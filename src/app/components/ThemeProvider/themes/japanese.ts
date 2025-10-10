import { ServiceTheme } from '#app/models/types/theming';
import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../palette';
import noAscOrDescScript from '../fontScripts/noAscOrDesc';
import japaneseFontVariants from '../fontVariants/japanese';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../chameleonLogos/japanese';

const japaneseTheme: ServiceTheme = {
  palette: {
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
  typography: {
    script: noAscOrDescScript,
    fontVariants: japaneseFontVariants,
    fontFaces: [],
  },
  brandSVG,
  service: 'japanese',
};

export default withThemeProvider(japaneseTheme);
