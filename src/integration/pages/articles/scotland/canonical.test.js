/**
 * @service scotland
 * @pathname /scotland/articles/czwj5l0n210o
 */

import runCrossPlatformTests from '../crossPlatformTests';
import runCanonicalTests from '../canonicalTests';

describe('Canonical', () => {
  describe(pageType, () => {
    runCrossPlatformTests('scotland');
    runCanonicalTests();
  });
});
