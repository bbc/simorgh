import { ServiceTheme } from '#app/models/types/theming';
import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../palette';
import tamilScript from '../fontScripts/tamil';
import { NOTO_SANS_TAMIL_BOLD, NOTO_SANS_TAMIL_REGULAR } from '../fontFaces';
import tamilFontVariants from '../fontVariants/tamil';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../chameleonLogos/tamil';

const tamilTheme: ServiceTheme = {
  palette: {
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
  typography: {
    script: tamilScript,
    fontVariants: tamilFontVariants,
    fontFaces: [NOTO_SANS_TAMIL_BOLD, NOTO_SANS_TAMIL_REGULAR],
  },
  brandSVG,
  service: 'tamil',
};

export default withThemeProvider(tamilTheme);
