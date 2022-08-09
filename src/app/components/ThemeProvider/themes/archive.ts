import { ARCHIVE_BLUE, WHITE } from '../palette';
import withThemeProvider from '../withThemeProvider';

const archiveTheme = {
  palette: {
    BRAND_BACKGROUND: ARCHIVE_BLUE,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: WHITE,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: WHITE,
  },
};

export default withThemeProvider(archiveTheme);
