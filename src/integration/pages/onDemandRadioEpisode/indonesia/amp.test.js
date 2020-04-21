/**
 * @service indonesia
 * @pathname /indonesia/bbc_indonesian_radio/w172x6r5000f38s
 */

import runCrossPlatformTests from '../crossPlatformTests';
import runAmpTests from '../ampTests';

describe('AMP', () => {
  describe(pageType, () => {
    runCrossPlatformTests();
    runAmpTests();
  });
});
