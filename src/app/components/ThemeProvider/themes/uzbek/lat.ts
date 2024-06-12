import { mergeDeepLeft } from 'ramda';
import latinWithDiacriticsScript from '../../fontScripts/latinWithDiacritics';
import withThemeProvider from '../../withThemeProvider';
import baseUzbekTheme from './base';

const uzbekLatinTheme = mergeDeepLeft(
  {
    typography: {
      script: latinWithDiacriticsScript,
    },
  },
  baseUzbekTheme,
);

export default withThemeProvider(uzbekLatinTheme);
