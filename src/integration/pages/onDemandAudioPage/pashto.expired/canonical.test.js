/**
 * @service pashto
 * @pathname /pashto/bbc_pashto_radio/w172x8nvf4bchz5
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
    runRadioScheduleTests({ isAmp: false });
  });
});
