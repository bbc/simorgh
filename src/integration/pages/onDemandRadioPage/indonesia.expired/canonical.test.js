/**
 * @service indonesia
 * @pathname /indonesia/bbc_indonesian_radio/w172x6r5000f38s
 */

import runExpiredEpisodeTests from '../expiredEpisodeTests';
import runCanonicalTests from '../canonicalTests';

describe('Canonical', () => {
  describe(pageType, () => {
    runExpiredEpisodeTests();
    runCanonicalTests(service);
  });
});
