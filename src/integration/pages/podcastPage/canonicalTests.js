import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
  runCommonCrossPlatformTests,
  runMediaPlayerEmbedLegacyTests,
  runRecentEpisodesTests,
} from '../../common';
import runCommonEpisodeTests from './commonEpisodeTests';

export default service => {
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();
  runCommonCrossPlatformTests(service);
  runCommonEpisodeTests();
  runRecentEpisodesTests();
  runMediaPlayerEmbedLegacyTests();
};
