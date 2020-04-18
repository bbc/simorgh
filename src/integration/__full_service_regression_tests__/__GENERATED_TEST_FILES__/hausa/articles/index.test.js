/**
 * @service hausa
 * @pathname /hausa/articles/c2nr6xqmnewo
 *
 * THIS TEST SUITE WAS GENERATED BY A BUILD SCRIPT. DO NOT EDIT THIS FILE.
 */

import runCrossPlatformTests from '../../../../pages/articles/crossPlatformTests';
import runAmpTests from '../../../../pages/articles/ampTests';
import runCanonicalTests from '../../../../pages/articles/canonicalTests';
describe(`Article Page -`, () => {
  runCrossPlatformTests();
  if (platform === 'amp') {
    runAmpTests();
  }
  if (platform === 'canonical') {
    runCanonicalTests();
  }
});
