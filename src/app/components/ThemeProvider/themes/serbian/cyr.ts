import { mergeDeepLeft } from 'ramda';
import cyrillicScript from '../../fontScripts/cyrillic';
import withThemeProvider from '../../withThemeProvider';
import baseSerbianTheme from './base';
import getPWATypographyTheme from '../getPWATypographyTheme';

const serbianCyrillicTheme = mergeDeepLeft(
  {
    typography: {
      script: cyrillicScript,
    },
  },
  baseSerbianTheme,
);

export default withThemeProvider(
  serbianCyrillicTheme,
  getPWATypographyTheme(cyrillicScript),
);
