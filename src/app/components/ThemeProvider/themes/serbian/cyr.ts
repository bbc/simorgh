import { mergeDeepLeft } from 'ramda';
import cyrillicScript from '../../fontScripts/cyrillic';
import withThemeProvider from '../../withThemeProvider';
import serbianTheme from './base';
import getPWATypographyTheme from '../getPWATypographyTheme';

export const theme = mergeDeepLeft(
  {
    typography: {
      script: cyrillicScript,
    },
  },
  serbianTheme,
);

export const pwaTheme = getPWATypographyTheme(cyrillicScript);

export default withThemeProvider(theme, pwaTheme);
