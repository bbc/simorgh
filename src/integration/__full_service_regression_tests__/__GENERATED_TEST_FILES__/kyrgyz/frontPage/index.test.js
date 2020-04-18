/**
 * @service kyrgyz
 * @pathname /kyrgyz
 *
 * THIS TEST SUITE WAS GENERATED BY A BUILD SCRIPT. DO NOT EDIT THIS FILE.
 */

import runCrossPlatformTests from '../../../../pages/frontPage/crossPlatformTests';
import runAmpTests from '../../../../pages/frontPage/ampTests';
import runCanonicalTests from '../../../../pages/frontPage/canonicalTests';
describe(`Front Page -`, () => {
  runCrossPlatformTests();
  if (platform === 'amp') {
    runAmpTests();
  }
  if (platform === 'canonical') {
    runCanonicalTests();
  }
});
