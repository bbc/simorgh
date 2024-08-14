/**
 * @service pashto
 * @pathname /pashto/bbc_pashto_tv/tv/w172xcldhhrhmcf
 */

import runExpiredEpisodeTests from '../expiredEpisodeTests';
import runCommonEpisodeTests from '../commonEpisodeTests';
import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
  runCommonCrossPlatformTests,
  runRecentEpisodesTests,
} from '../../../common';

describe('Canonical Pashto On Demand TV Page', () => {
  runExpiredEpisodeTests();
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();
  runCommonCrossPlatformTests(service);
  runCommonEpisodeTests();
  runRecentEpisodesTests();
});
