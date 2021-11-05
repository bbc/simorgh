/**
 * @service ukrainian
 * @pathname /ukrainian/ukraine_in_russian
 */

import runAmpTests from '../ampTests';
import runHeaderTests from './header';
import runFooterTests from './footer';

describe('AMP ukrainian/ukraine_in_russian IDX page', () => {
  runAmpTests(service);
  runHeaderTests();
  runFooterTests();
});
