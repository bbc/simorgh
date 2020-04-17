/**
 * @service pidgin
 * @pathname /pidgin
 */

import runCrossPlatformTests from './crossPlatformTests';
import runAmpTests from './ampTests';
import runCanonicalTests from './canonicalTests';

describe('Front Page', () => {
  describe(platform, () => {
    runCrossPlatformTests();
  });

  if (platform === 'amp') {
    describe(platform, () => {
      runAmpTests();
    });
  }

  if (platform === 'canonical') {
    describe(platform, () => {
      runCanonicalTests();
    });
  }
});
