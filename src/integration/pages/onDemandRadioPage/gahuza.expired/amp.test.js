/**
 * @service gahuza
 * @pathname /gahuza/bbc_gahuza_radio/w172x7rkcj6v0vz
 */

import runExpiredEpisodeTests from '../expiredEpisodeTests';
import runAmpTests from '../ampTests';

describe('AMP', () => {
  describe(pageType, () => {
    runExpiredEpisodeTests();
    runAmpTests();
  });
});
