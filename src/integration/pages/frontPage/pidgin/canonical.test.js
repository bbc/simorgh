/**
 * @service pidgin
 * @pathname /pidgin
 */

import runCrossPlatformTests from '../crossPlatformTests';
import runCanonicalTests from '../canonicalTests';

describe(platform.toUpperCase(), () => {
  describe(pageType, () => {
    runCrossPlatformTests();
    runCanonicalTests();
  });
});
