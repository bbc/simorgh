/**
 * @service indonesia
 * @pathname /indonesia/bbc_indonesian_radio/w172x6r5000f38s
 */

import runCrossPlatformTests from '../crossPlatformTests';
import runCanonicalTests from '../canonicalTests';

describe('Canonical', () => {
  describe(pageType, () => {
    runCrossPlatformTests();
    runCanonicalTests();
  });
});
