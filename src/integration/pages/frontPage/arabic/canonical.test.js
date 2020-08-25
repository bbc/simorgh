/**
 * @service arabic
 * @pathname /arabic
 * @displayAds true
 */

import runCrossPlatformTests from '../crossPlatformTests';
import runCanonicalTests from '../canonicalTests';

describe('Canonical', () => {
  describe(pageType, () => {
    runCrossPlatformTests();
    runCanonicalTests();
  });
});
