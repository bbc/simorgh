/**
 * @service afrique
 * @pathname /afrique/48465371
 */

import runCanonicalTests from '../canonicalTests';
import runHeaderTests from './header';
import runFooterTests from './footer';

describe('Canonical afrique/48465371 Feature Index page', () => {
  runCanonicalTests(service);
  runHeaderTests();
  runFooterTests();
});
