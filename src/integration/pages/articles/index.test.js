/**
 * @service mundo
 * @pathname /mundo/articles/ce42wzqr2mko
 */

import runCrossPlatformTests from './crossPlatformTests';
import runAmpTests from './ampTests';
import runCanonicalTests from './canonicalTests';

describe(`Article Page - ${platform} -`, () => {
  runCrossPlatformTests();

  if (platform === 'amp') {
    runAmpTests();
  }
  if (platform === 'canonical') {
    runCanonicalTests();
  }
});
