/**
 * @service indonesia
 * @pathname /indonesia/bbc_indonesian_radio/w172x6r5000f38s
 */
import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
  runRadioScheduleTests,
  runCommonCrossPlatformTests,
  runRecentEpisodesTests,
} from '../../../common';
import runCommonEpisodeTests from '../commonEpisodeTests';
import runExpiredEpisodeTests from '../expiredEpisodeTests';

describe('Canonical', () => {
  describe(pageType, () => {
    runExpiredEpisodeTests();
    runCommonCrossPlatformTests(service);
    runCommonEpisodeTests();
    runRecentEpisodesTests();
    runCoreCanonicalTests();
    runCanonicalAnalyticsTests();
    runRadioScheduleTests(pageType);
  });
});
