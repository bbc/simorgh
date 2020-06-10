/**
 * @service pashto
 * @pathname /pashto/bbc_pashto_tv/tv/w172xcldhhrhmcf
 */

import runExpiredEpisodeTests from '../expiredEpisodeTests';
import runAmpTests from '../ampTests';

describe('AMP', () => {
  describe(pageType, () => {
    runExpiredEpisodeTests();
    runAmpTests();
  });
});
