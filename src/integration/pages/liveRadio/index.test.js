/**
 * @service korean
 * @pathname /korean/bbc_korean_radio/liveradio
 */

import runCrossPlatformTests from './crossPlatformTests';
import runAmpTests from './ampTests';
import runCanonicalTests from './canonicalTests';

describe(platform, () => {
  describe('Live Radio Page', () => {
    runCrossPlatformTests();

    // eslint-disable-next-line no-unused-expressions
    platform === 'amp' ? runAmpTests() : runCanonicalTests();
  });
});
