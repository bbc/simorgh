/**
 * @service gahuza
 * @pathname /gahuza/bbc_gahuza_radio/w172x7rkcj6v0vz
 */

import runCrossPlatformTests from '../crossPlatformTests';
import runCanonicalTests from '../canonicalTests';

describe('Canonical', () => {
  describe(pageType, () => {
    runCrossPlatformTests();
    runCanonicalTests();
  });
});
