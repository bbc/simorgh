/**
 * @service pidgin
 * @pathname /pidgin/23248703
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
