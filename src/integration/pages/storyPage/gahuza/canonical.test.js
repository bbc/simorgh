/**
 * @service gahuza
 * @pathname /gahuza/23313911
 */

import runCrossPlatformIncludeTests from '../crossPlatformIncludeTests';
import runCanonicalIncludeTests from '../canonicalIncludeTests';

describe('Canonical', () => {
  describe(pageType, () => {
    runCrossPlatformIncludeTests();
    runCanonicalIncludeTests();
  });
});
