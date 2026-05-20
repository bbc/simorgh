import type { ServiceTheme } from '#app/models/types/theming';
import brandSVG from '../chameleonLogos/bengali';
import {
  NOTO_SERIF_BENGALI_BOLD,
  NOTO_SERIF_BENGALI_REGULAR,
} from '../fontFaces';
import bengaliScript from '../fontScripts/bengali';
import bengaliFontVariants from '../fontVariants/bengali';
import { GHOST, POSTBOX, POSTBOX_30, WHITE } from '../palette';
import withThemeProvider from '../withThemeProvider';

export const theme: ServiceTheme = {
  palette: {
    BRAND_BACKGROUND: POSTBOX,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: GHOST,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: POSTBOX_30,
  },
  typography: {
    script: bengaliScript,
    fontVariants: bengaliFontVariants,
    fontFaces: [NOTO_SERIF_BENGALI_BOLD, NOTO_SERIF_BENGALI_REGULAR],
  },
  brandSVG,
};

export default withThemeProvider(theme);
