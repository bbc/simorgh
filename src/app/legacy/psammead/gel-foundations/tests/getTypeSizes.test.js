import getTypeSizes from '../src/getTypeSizes';
import arabic from '../../../../components/ThemeProvider/typography/scripts/arabic';
import bengali from '../../../../components/ThemeProvider/typography/scripts/bengali';
import burmese from '../../../../components/ThemeProvider/typography/scripts/burmese';
import cyrillic from '../../../../components/ThemeProvider/typography/scripts/cyrillic';
import devanagari from '../../../../components/ThemeProvider/typography/scripts/devanagari';
import gurmukhi from '../../../../components/ThemeProvider/typography/scripts/gurmukhi';
import latin from '../../../../components/ThemeProvider/typography/scripts/latin';
import latinWithDiacritics from '../../../../components/ThemeProvider/typography/scripts/latinWithDiacritics';
import noAscOrDesc from '../../../../components/ThemeProvider/typography/scripts/noAscOrDesc';
import sinhalese from '../../../../components/ThemeProvider/typography/scripts/sinhalese';
import tamil from '../../../../components/ThemeProvider/typography/scripts/tamil';
import thai from '../../../../components/ThemeProvider/typography/scripts/thai';

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
