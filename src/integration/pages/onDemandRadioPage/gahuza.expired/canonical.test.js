/**
 * @service gahuza
 * @pathname /gahuza/bbc_gahuza_radio/w172x7rkcj6v0vz
 */

import runExpiredEpisodeTests from '../expiredEpisodeTests';
import runCanonicalTests from '../canonicalTests';

describe('Canonical', () => {
  describe(pageType, () => {
    runExpiredEpisodeTests();
    runCanonicalTests('gahuza');
  });
});
