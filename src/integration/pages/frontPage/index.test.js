/**
 * @service arabic
 * @pathname /arabic
 */

import runCrossPlatformTests from './crossPlatformTests';
import runAmpTests from './ampTests';
import runCanonicalTests from './canonicalTests';

describe(`Front Page -`, () => {
  runCrossPlatformTests();

  if (platform === 'amp') {
    runAmpTests();
  }
  if (platform === 'canonical') {
    runCanonicalTests();
  }
});
