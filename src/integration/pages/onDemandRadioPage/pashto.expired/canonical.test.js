/**
 * @service pashto
 * @pathname /pashto/bbc_pashto_radio/w172x8nvf4bchz5
 */

import runExpiredEpisodeTests from '../expiredEpisodeTests';
import runCanonicalTests from '../canonicalTests';

describe('Canonical', () => {
  describe(pageType, () => {
    runExpiredEpisodeTests();
    runCanonicalTests(service);
  });
});
