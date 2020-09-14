/**
 * @service pashto
 * @pathname /pashto/bbc_pashto_tv/tv/w172xcldhhrhmcf
 */

import runExpiredEpisodeTests from '../expiredEpisodeTests';
import runCanonicalTests from '../canonicalTests';

describe('Canonical Pashto On Demand TV Page', () => {
  runExpiredEpisodeTests();
  runCanonicalTests(service);
});
