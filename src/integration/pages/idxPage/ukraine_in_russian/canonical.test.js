/**
 * @service ukrainian
 * @pathname /ukrainian/ukraine_in_russian
 */

import runCanonicalTests from '../canonicalTests';
import runHeaderTests from './header.test';
import runFooterTests from './footer.test';

describe('Canonical ukrainian/ukraine_in_russian IDX page', () => {
  runCanonicalTests();
  runHeaderTests();
  runFooterTests();
});
