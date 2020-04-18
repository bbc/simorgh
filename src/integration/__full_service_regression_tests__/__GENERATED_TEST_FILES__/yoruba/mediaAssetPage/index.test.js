/**
 * @service yoruba
 * @pathname /yoruba/media-23256797
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
