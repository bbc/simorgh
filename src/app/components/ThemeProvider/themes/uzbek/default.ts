import { mergeDeepLeft } from 'ramda';
import cyrillicScript from '../../fontScripts/cyrillic';
import withThemeProvider from '../../withThemeProvider';
import baseUzbekTheme from './base';

const uzbekDefaultTheme = mergeDeepLeft(
  {
    typography: {
      script: cyrillicScript,
    },
  },
  baseUzbekTheme,
);

export default withThemeProvider(uzbekDefaultTheme);
