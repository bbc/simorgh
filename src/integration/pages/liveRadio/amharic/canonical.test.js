/**
 * @service amharic
 * @pathname /amharic/bbc_amharic_radio/liveradio
 */

import runCrossPlatformTests from '../crossPlatformTests';
import runCanonicalTests from '../canonicalTests';

describe('Canonical', () => {
  describe(pageType, () => {
    runCrossPlatformTests();
    runCanonicalTests();
  });
});
