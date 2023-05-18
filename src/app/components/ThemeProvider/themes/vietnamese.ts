import { GHOST, WHITE, NEWS_CORE } from '../palette';
import latinWithDiacriticsScript from '../fontScripts/latinWithDiacritics';
import helmetFontVariants from '../fontVariants/helmet';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../chameleonLogos/vietnamese';

const vietnameseTheme = {
  palette: {
    BRAND_BACKGROUND: NEWS_CORE,
    BRAND_LOGO: WHITE,
  },
  typography: {
    script: latinWithDiacriticsScript,
    fontVariants: helmetFontVariants,
    fontFaces: [],
  },
  brandSVG,
};

export default withThemeProvider(vietnameseTheme);
