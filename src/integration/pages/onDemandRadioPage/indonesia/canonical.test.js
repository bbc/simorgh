/**
 * @service indonesia
 * @pathname /indonesia/bbc_indonesian_radio/w172xh267fpn19l
 */

import runCrossPlatformTests from '../crossPlatformTests';
import runCanonicalTests from '../canonicalTests';

describe('Canonical', () => {
  describe(pageType, () => {
    runCrossPlatformTests(service);
    runCanonicalTests();
  });
});
