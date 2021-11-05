/**
 * @service pashto
 * @pathname /pashto/bbc_pashto_tv/tv_programmes/w13xttn4
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
