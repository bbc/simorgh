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
