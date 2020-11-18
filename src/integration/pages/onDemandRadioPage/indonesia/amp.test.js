/**
 * @service indonesia
 * @pathname /indonesia/bbc_indonesian_radio/w172xh267fpn19l
 */

import runCrossPlatformTests from '../crossPlatformTests';
import runAmpTests from '../ampTests';

describe('AMP', () => {
  describe(pageType, () => {
    runCrossPlatformTests(service);
    runAmpTests();
  });
});
