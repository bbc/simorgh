import { mergeDeepLeft } from 'ramda';

import latinWithDiacriticsScript from '../../fontScripts/latinWithDiacritics';
import withThemeProvider from '../../withThemeProvider';
import getPWATypographyTheme from '../getPWATypographyTheme';
import uzbekTheme from './base';

export const theme = mergeDeepLeft(
  {
    typography: {
      script: latinWithDiacriticsScript,
    },
  },
  uzbekTheme,
);

export const pwaTheme = getPWATypographyTheme(latinWithDiacriticsScript);

export default withThemeProvider(theme, pwaTheme);
