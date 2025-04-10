/**
 * @service gahuza
 * @pathname /gahuza/bbc_gahuza_radio/w172x7rkcj6v0vz
 */

import runExpiredEpisodeTests from '../expiredEpisodeTests';
import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
  runRadioScheduleTests,
  runCommonCrossPlatformTests,
  runRecentEpisodesTests,
} from '../../../common';
import runCommonEpisodeTests from '../commonEpisodeTests';

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
