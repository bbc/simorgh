import { mergeDeepLeft } from 'ramda';
import latinWithDiacriticsScript from '../../fontScripts/latinWithDiacritics';
import withThemeProvider from '../../withThemeProvider';
import serbianTheme from './base';
import getPWATypographyTheme from '../getPWATypographyTheme';

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
