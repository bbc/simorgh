/**
 * @service ukrainian
 * @pathname /ukrainian/ukraine_in_russian
 */

import runCanonicalTests from '../canonicalTests';
import runHeaderTests from './header';
import runFooterTests from './footer';

describe('Canonical ukrainian/ukraine_in_russian IDX page', () => {
  runCanonicalTests(service);
  runHeaderTests();
  runFooterTests();
});
