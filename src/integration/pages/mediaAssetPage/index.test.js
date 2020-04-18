/**
 * @service pidgin
 * @pathname /pidgin/23248703
 */

import runCrossPlatformTests from './crossPlatformTests';
import runAmpTests from './ampTests';
import runCanonicalTests from './canonicalTests';

describe(`Media Asset Page - ${platform} -`, () => {
  runCrossPlatformTests();

  if (platform === 'amp') {
    runAmpTests();
  }
  if (platform === 'canonical') {
    runCanonicalTests();
  }
});
