/**
 * @service somali
 * @pathname /somali/bbc_somali_tv/tv_programmes/w13xttqt
 */

import runCanonicalTests from '../canonicalTests';
import runCrossPlatformTests from '../crossPlatformTests';
import runMediaPlaceholderTests from '../mediaPlaceholderTests';

describe('Canonical', () => {
  describe(pageType, () => {
    runCanonicalTests();
    runCrossPlatformTests(service);
    runMediaPlaceholderTests();
  });
});
