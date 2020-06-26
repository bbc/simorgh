/**
 * @service ukrainian
 * @pathname /ukrainian/ukraine_in_russian
 */

import runAmpTests from '../ampTests';
import runHeaderTests from './header.test';
import runFooterTests from './footer.test';

describe('AMP ukrainian/ukraine_in_russian IDX page', () => {
  runAmpTests();
  runHeaderTests();
  runFooterTests();
});
