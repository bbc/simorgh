import { mergeDeepLeft } from 'ramda';

import latinWithDiacriticsScript from '../../fontScripts/latinWithDiacritics';
import withThemeProvider from '../../withThemeProvider';
import getPWATypographyTheme from '../getPWATypographyTheme';
import serbianTheme from './base';

export const theme = mergeDeepLeft(
  {
    typography: {
      script: latinWithDiacriticsScript,
    },
  },
  serbianTheme,
);

export const pwaTheme = getPWATypographyTheme(latinWithDiacriticsScript);

export default withThemeProvider(theme, pwaTheme);
