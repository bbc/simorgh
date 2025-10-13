import { mergeDeepLeft } from 'ramda';
import cyrillicScript from '../../fontScripts/cyrillic';
import withThemeProvider from '../../withThemeProvider';
import serbianTheme from './base';
import getPWATypographyTheme from '../getPWATypographyTheme';
import mergeThemeWithPWATypography from '../mergeThemeWithPWATypography';

const baseTheme = mergeDeepLeft(
  {
    typography: {
      script: cyrillicScript,
    },
  },
  serbianTheme,
);

const pwaTheme = getPWATypographyTheme(cyrillicScript);

export const theme = mergeThemeWithPWATypography({
  baseTheme,
  pwaTheme,
});

export default withThemeProvider(baseTheme, pwaTheme);
