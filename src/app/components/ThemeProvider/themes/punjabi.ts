import { ServiceTheme } from '#app/models/types/theming';
import { GHOST, WHITE, POSTBOX, POSTBOX_30 } from '../palette';
import gurmukhiScript from '../fontScripts/gurmukhi';
import punjabiFontVariants from '../fontVariants/punjabi';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../chameleonLogos/punjabi';

export const theme: ServiceTheme = {
  palette: {
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
  typography: {
    script: gurmukhiScript,
    fontVariants: punjabiFontVariants,
    fontFaces: [],
  },
  brandSVG,
};

export default withThemeProvider(theme);
