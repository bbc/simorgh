/**
 * @service news
 * @pathname /news/articles/c5jje4ejkqvo
 */

import runCrossPlatformTests from '../crossPlatformTests';
import runCanonicalTests from '../canonicalTests';

describe('Canonical', () => {
  describe(pageType, () => {
    runCrossPlatformTests('news');
    runCanonicalTests();
  });
});
