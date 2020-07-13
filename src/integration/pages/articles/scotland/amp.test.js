/**
 * @service scotland
 * @pathname /scotland/articles/czwj5l0n210o
 */

import runCrossPlatformTests from '../crossPlatformTests';
import runAmpTests from '../ampTests';

describe('AMP', () => {
  describe(pageType, () => {
    runCrossPlatformTests('scotland');
    runAmpTests();
  });
});
