/**
 * @service korean
 * @pathname /korean/bbc_korean_radio/liveradio
 */

import runCrossPlatformTests from './crossPlatformTests';
import runAmpTests from './ampTests';
import runCanonicalTests from './canonicalTests';

describe(`Live Radio Page -`, () => {
  runCrossPlatformTests();

  if (platform === 'amp') {
    runAmpTests();
  }

  if (platform === 'canonical') {
    runCanonicalTests();
  }
});
