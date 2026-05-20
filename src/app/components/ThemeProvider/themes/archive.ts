import type { ServiceTheme } from '#app/models/types/theming';
import brandSVG from '../chameleonLogos/archive';
import {
  REITH_SANS_BOLD,
  REITH_SANS_REGULAR,
  REITH_SERIF_LIGHT,
  REITH_SERIF_MEDIUM,
} from '../fontFaces';
import latinScript from '../fontScripts/latin';
import reithFontVariants from '../fontVariants/reith';
import { ARCHIVE_BLUE, WHITE } from '../palette';
import withThemeProvider from '../withThemeProvider';

export const theme: ServiceTheme = {
  palette: {
    BRAND_BACKGROUND: ARCHIVE_BLUE,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: WHITE,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: WHITE,
  },
  typography: {
    script: latinScript,
    fontVariants: reithFontVariants,
    fontFaces: [
      REITH_SANS_BOLD,
      REITH_SANS_REGULAR,
      REITH_SERIF_LIGHT,
      REITH_SERIF_MEDIUM,
    ],
  },
  brandSVG,
};

export default withThemeProvider(theme);
