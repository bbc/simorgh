/**
 * @service indonesia
 * @pathname /indonesia/bbc_indonesian_radio/w172x6r5000f38s
 */

import runExpiredEpisodeTests from '../expiredEpisodeTests';
import runAmpTests from '../ampTests';

describe('AMP', () => {
  describe(pageType, () => {
    runExpiredEpisodeTests();
    runAmpTests(service);
  });
});
