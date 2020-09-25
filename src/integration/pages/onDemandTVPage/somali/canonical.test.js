/**
 * @service somali
 * @pathname /somali/bbc_somali_tv/tv_programmes/w13xttqt
 */

import runCanonicalTests from '../canonicalTests';
import runCrossPlatformTests from '../crossPlatformTests';

describe('Canonical', () => {
  describe(pageType, () => {
    runCanonicalTests();
    runCrossPlatformTests(service);
  });
});
