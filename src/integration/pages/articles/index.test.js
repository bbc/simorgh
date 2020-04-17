/**
 * @service mundo
 * @pathname /mundo/articles/ce42wzqr2mko
 */

import runCrossPlatformTests from './crossPlatformTests';
import runAmpTests from './ampTests';
import runCanonicalTests from './canonicalTests';

describe('Article Page', () => {
  describe(platform, () => {
    runCrossPlatformTests();

    // eslint-disable-next-line no-unused-expressions
    platform === 'amp' ? runAmpTests() : runCanonicalTests();
  });
});
