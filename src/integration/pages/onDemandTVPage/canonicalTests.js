import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
  runCommonCrossPlatformTests,
  runMediaPlayerTests,
  runRecentEpisodesTests,
} from '../../common';

import runCommonEpisodeTests from './commonEpisodeTests';

export default () => {
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();
  runCommonCrossPlatformTests(service);
  runCommonEpisodeTests();
  runMediaPlayerTests();
  runRecentEpisodesTests();
};
