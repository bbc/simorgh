/**
 * @service persian
 * @pathname /persian/iran/2016/09/160907_tc2_testmap1
 */

import runCrossPlatformTests from './crossPlatformTests';
import runAmpTests from './ampTests';
import runCanonicalTests from './canonicalTests';

describe('Media Asset Page', () => {
  describe(platform, () => {
    runCrossPlatformTests();

    // eslint-disable-next-line no-unused-expressions
    platform === 'amp' ? runAmpTests() : runCanonicalTests();
  });
});
