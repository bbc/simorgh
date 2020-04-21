/**
 * @service mundo
 * @pathname /mundo/articles/ce42wzqr2mko
 */

import runCrossPlatformTests from '../crossPlatformTests';
import runAmpTests from '../ampTests';

describe('AMP', () => {
  describe(pageType, () => {
    runCrossPlatformTests();
    runAmpTests();
  });
});
