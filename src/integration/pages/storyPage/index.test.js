/**
 * @service mundo
 * @pathname /mundo/noticias-internacional-51266689
 */
import runCrossPlatformTests from './crossPlatformTests';
import runAmpTests from './ampTests';
import runCanonicalTests from './canonicalTests';

describe('Story Page', () => {
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
