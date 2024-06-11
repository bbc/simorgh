import { mergeDeepLeft } from 'ramda';
import cyrillicScript from '../../fontScripts/cyrillic';
import withThemeProvider from '../../withThemeProvider';
import baseUzbekTheme from './base';

const uzbekCyrillicTheme = mergeDeepLeft(
  {
    typography: {
      script: cyrillicScript,
    },
  },
  baseUzbekTheme,
);

export default withThemeProvider(uzbekCyrillicTheme);
