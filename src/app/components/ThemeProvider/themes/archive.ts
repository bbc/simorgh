import { ARCHIVE_BLUE, WHITE } from '../palette';
import latinScript from '../typography/scripts/latin';
import {
  REITH_SANS_BOLD,
  REITH_SANS_REGULAR,
  REITH_SERIF_MEDIUM,
} from '../typography/fontFaces';
import { REITH_SANS, REITH_SERIF } from '../typography/fontFamilies';
import withThemeProvider from '../withThemeProvider';

const archiveTheme = {
  palette: {
    BRAND_BACKGROUND: ARCHIVE_BLUE,
    BRAND_LOGO: WHITE,
    BRAND_FOREGROUND: WHITE,
    BRAND_HIGHLIGHT: WHITE,
    BRAND_BORDER: WHITE,
  },
  typography: {
    script: latinScript,
    fontFamilies: {
      primary: REITH_SANS,
      secondary: REITH_SERIF,
    },
    fontFaces: [REITH_SANS_BOLD, REITH_SANS_REGULAR, REITH_SERIF_MEDIUM],
  },
};

export default withThemeProvider(archiveTheme);
