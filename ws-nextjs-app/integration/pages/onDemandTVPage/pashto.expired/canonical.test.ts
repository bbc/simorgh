/**
 * @service pashto
 * @pathname /pashto/bbc_pashto_tv/tv/w172xtq7x8660m1
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
