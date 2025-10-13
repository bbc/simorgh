import { mergeDeepLeft } from 'ramda';
import latinWithDiacriticsScript from '../../fontScripts/latinWithDiacritics';
import withThemeProvider from '../../withThemeProvider';
import uzbekTheme from './base';
import getPWATypographyTheme from '../getPWATypographyTheme';
import mergeThemeWithPWATypography from '../mergeThemeWithPWATypography';

const baseTheme = mergeDeepLeft(
  {
    typography: {
      script: latinWithDiacriticsScript,
    },
  },
  uzbekTheme,
);

const pwaTheme = getPWATypographyTheme(latinWithDiacriticsScript);

export const theme = mergeThemeWithPWATypography({
  baseTheme,
  pwaTheme,
});

export default withThemeProvider(baseTheme, pwaTheme);
