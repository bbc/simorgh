import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
  runCommonCrossPlatformTests,
  runMediaPlayerEmbedTests,
  runRecentEpisodesTests,
} from '../../common';

import runCommonEpisodeTests from './commonEpisodeTests';

export default () => {
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();
  runCommonCrossPlatformTests(service);
  runCommonEpisodeTests();
  runMediaPlayerEmbedTests();
  runRecentEpisodesTests();
};
