/**
 * @service arabic
 * @pathname /arabic
 */

import runCrossPlatformTests from './crossPlatformTests';
import runAmpTests from './ampTests';
import runCanonicalTests from './canonicalTests';

describe('Front Page', () => {
  describe(platform, () => {
    runCrossPlatformTests();

    // eslint-disable-next-line no-unused-expressions
    platform === 'amp' ? runAmpTests() : runCanonicalTests();
  });
});
