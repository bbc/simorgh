/**
 * @service pidgin
 * @pathname /pidgin/tori-51745682
 */

import runCrossPlatformTests from '../crossPlatformTests';
import runCanonicalTests from '../canonicalTests';

describe(platform.toUpperCase(), () => {
  describe(pageType, () => {
    runCrossPlatformTests();
    runCanonicalTests();
  });
});
