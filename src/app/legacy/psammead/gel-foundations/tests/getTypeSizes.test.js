import getTypeSizes from '../src/getTypeSizes';
import arabic from '../../../../components/ThemeProvider/fontScripts/arabic';
import bengali from '../../../../components/ThemeProvider/fontScripts/bengali';
import burmese from '../../../../components/ThemeProvider/fontScripts/burmese';
import cyrillic from '../../../../components/ThemeProvider/fontScripts/cyrillic';
import devanagari from '../../../../components/ThemeProvider/fontScripts/devanagari';
import gurmukhi from '../../../../components/ThemeProvider/fontScripts/gurmukhi';
import latin from '../../../../components/ThemeProvider/fontScripts/latin';
import latinWithDiacritics from '../../../../components/ThemeProvider/fontScripts/latinWithDiacritics';
import noAscOrDesc from '../../../../components/ThemeProvider/fontScripts/noAscOrDesc';
import sinhalese from '../../../../components/ThemeProvider/fontScripts/sinhalese';
import tamil from '../../../../components/ThemeProvider/fontScripts/tamil';
import thai from '../../../../components/ThemeProvider/fontScripts/thai';

const scripts = {
  arabic,
  bengali,
  burmese,
  cyrillic,
  devanagari,
  gurmukhi,
  latin,
  latinWithDiacritics,
  noAscOrDesc,
  sinhalese,
  tamil,
  thai,
};

describe('getTypeSizes', () => {
  Object.keys(scripts).forEach(scriptName => {
    it.each`
      typography
      ${'atlas'}
      ${'bodyCopy'}
      ${'brevier'}
      ${'canon'}
      ${'doublePica'}
      ${'elephant'}
      ${'foolscap'}
      ${'greatPrimer'}
      ${'imperial'}
      ${'longPrimer'}
      ${'minion'}
      ${'paragon'}
      ${'pica'}
      ${'royal'}
      ${'trafalgar'}
    `(`should match $typography for ${scriptName}`, ({ typography }) => {
      const script = scripts[scriptName];
      const styles = getTypeSizes(typography, script);

      expect(styles).toMatchSnapshot();
    });
  });
});
