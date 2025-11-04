import { mergeDeepLeft } from 'ramda';
import cyrillicScript from '../../fontScripts/cyrillic';
import withThemeProvider from '../../withThemeProvider';
import uzbekTheme from './base';
import getPWATypographyTheme from '../getPWATypographyTheme';

export const theme = mergeDeepLeft(
  {
    typography: {
      script: cyrillicScript,
    },
  },
  uzbekTheme,
);

export const pwaTheme = getPWATypographyTheme(cyrillicScript);

export default withThemeProvider(theme, pwaTheme);
