/**
 * @service sinhala
 * @pathname /sinhala/multimedia/2016/03/160323_si_test_audio_map
 *
 * THIS TEST SUITE WAS GENERATED BY A BUILD SCRIPT. DO NOT EDIT THIS FILE.
 */

import runCrossPlatformTests from '../../../../pages/mediaAssetPage/crossPlatformTests';
import runAmpTests from '../../../../pages/mediaAssetPage/ampTests';
import runCanonicalTests from '../../../../pages/mediaAssetPage/canonicalTests';
describe(`Media Asset Page -`, () => {
  runCrossPlatformTests();
  if (platform === 'amp') {
    runAmpTests();
  }
  if (platform === 'canonical') {
    runCanonicalTests();
  }
});
