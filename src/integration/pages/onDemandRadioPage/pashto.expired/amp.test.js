/**
 * @service pashto
 * @pathname /pashto/bbc_pashto_radio/w172x8nvf4bchz5
 */

import runExpiredEpisodeTests from '../expiredEpisodeTests';
import runAmpTests from '../ampTests';

describe('AMP', () => {
  describe(pageType, () => {
    runExpiredEpisodeTests();
    runAmpTests(service);
  });
});
