import getTypeSizes from '../src/getTypeSizes';
import * as scripts from '../src/scripts';

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
