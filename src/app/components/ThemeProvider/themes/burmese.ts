import { ServiceTheme } from '#app/models/types/theming';
import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../palette';
import burmeseScript from '../fontScripts/burmese';
import { PADAUK_BOLD, PADAUK_REGULAR } from '../fontFaces';
import burmeseFontVariants from '../fontVariants/burmese';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../chameleonLogos/burmese';

const burmeseTheme: ServiceTheme = {
  palette: {
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
  typography: {
    script: burmeseScript,
    fontVariants: burmeseFontVariants,
    fontFaces: [PADAUK_BOLD, PADAUK_REGULAR],
  },
  brandSVG,
  service: 'burmese',
};

export default withThemeProvider(burmeseTheme);
