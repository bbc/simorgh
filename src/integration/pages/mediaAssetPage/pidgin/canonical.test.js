/**
 * @service pidgin
 * @pathname /pidgin/23248703
 */

import runCrossPlatformTests from '../crossPlatformTests';
import runCanonicalTests from '../canonicalTests';

describe('Canonical', () => {
  describe(pageType, () => {
    runCrossPlatformTests();
    runCanonicalTests();
  });
});
