/**
 * @service hausa
 * @pathname /hausa/bbc_hausa_radio/liveradio
 *
 * THIS TEST SUITE WAS GENERATED BY A BUILD SCRIPT. DO NOT EDIT THIS FILE.
 */

import runCrossPlatformTests from '../../../../pages/liveRadio/crossPlatformTests';
import runAmpTests from '../../../../pages/liveRadio/ampTests';
import runCanonicalTests from '../../../../pages/liveRadio/canonicalTests';
describe(`Live Radio Page -`, () => {
  runCrossPlatformTests();
  if (platform === 'amp') {
    runAmpTests();
  }
  if (platform === 'canonical') {
    runCanonicalTests();
  }
});
