import { ARCHIVE_BLUE, WHITE } from '../colours';
import withThemeProvider from '../withThemeProvider';

const archiveTheme = {
  colours: {
    BRAND_BACKGROUND: ARCHIVE_BLUE,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: WHITE,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: WHITE,
  },
};

export default withThemeProvider(archiveTheme);
