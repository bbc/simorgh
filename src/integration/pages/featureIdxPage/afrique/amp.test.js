/**
 * @service afrique
 * @pathname /afrique/48465371
 */

import runAmpTests from '../ampTests';
import runHeaderTests from './header';
import runFooterTests from './footer';

describe('AMP afrique/48465371 Feature Index page', () => {
  runAmpTests(service);
  runHeaderTests();
  runFooterTests();
});
