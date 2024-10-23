import { mergeDeepLeft } from 'rambda';
import cyrillicScript from '../../fontScripts/cyrillic';
import withThemeProvider from '../../withThemeProvider';
import baseSerbianTheme from './base';

const serbianCyrillicTheme = mergeDeepLeft(
  {
    typography: {
      script: cyrillicScript,
    },
  },
  baseSerbianTheme,
);

export default withThemeProvider(serbianCyrillicTheme);
