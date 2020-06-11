/**
 * @service somali
 * @pathname /somali/bbc_somali_tv/tv_programmes/w13xttqt
 */

import runCrossPlatformTests from '../crossPlatformTests';
import runCanonicalTests from '../canonicalTests';

describe('Canonical', () => {
  describe(pageType, () => {
    runCrossPlatformTests();
    runCanonicalTests();
  });
});
