import { mergeDeepLeft } from 'rambda';
import latinWithDiacriticsScript from '../../fontScripts/latinWithDiacritics';
import withThemeProvider from '../../withThemeProvider';
import baseSerbianTheme from './base';

const serbianLatinTheme = mergeDeepLeft(
  {
    typography: {
      script: latinWithDiacriticsScript,
    },
  },
  baseSerbianTheme,
);

export default withThemeProvider(serbianLatinTheme);
