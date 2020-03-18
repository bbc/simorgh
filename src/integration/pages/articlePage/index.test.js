import runCommonTests from './common';
import runCanonicalTests from './canonical';
import runAmpTests from './amp';

describe('Given I am on an article page', () => {
  runCommonTests();
  runCanonicalTests();
  runAmpTests();
});
