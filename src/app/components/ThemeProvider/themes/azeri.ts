import { GREY_1, WHITE, NEWS_CORE } from '../palette';
import latinWithDiacriticsScript from '../fontScripts/latinWithDiacritics';
import helmetFontVariants from '../fontVariants/helmet';
import withThemeProvider from '../withThemeProvider';
import brandSVG from '../chameleonLogos/azeri';

const azeriTheme = {
  palette: {
    BRAND_BACKGROUND: NEWS_CORE,
    BRAND_LOGO: WHITE,
  },
  typography: {
    script: latinWithDiacriticsScript,
    fontFaces: [],
    fontVariants: helmetFontVariants,
  },
  brandSVG,
};

export default withThemeProvider(azeriTheme);
