import { mergeDeepLeft } from 'ramda';
import latinWithDiacriticsScript from '../../fontScripts/latinWithDiacritics';
import withThemeProvider from '../../withThemeProvider';
import uzbekTheme from './base';
import getPWATypographyTheme from '../getPWATypographyTheme';

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
