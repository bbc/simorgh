import { mergeDeepLeft } from 'ramda';

import cyrillicScript from '../../fontScripts/cyrillic';
import withThemeProvider from '../../withThemeProvider';
import getPWATypographyTheme from '../getPWATypographyTheme';
import serbianTheme from './base';

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
