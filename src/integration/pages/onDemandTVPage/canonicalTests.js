import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
  runCommonCrossPlatformTests,
  runMediaPlayerEmbedLegacyTests,
  runRecentEpisodesTests,
} from '../../common';

import runCommonEpisodeTests from './commonEpisodeTests';

export default () => {
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();
  runCommonCrossPlatformTests(service);
  runCommonEpisodeTests();
  runMediaPlayerEmbedLegacyTests();
  runRecentEpisodesTests();
};
