import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
  runRadioScheduleTests,
  runCommonCrossPlatformTests,
  runMediaPlayerAudioTests,
  runRecentEpisodesTests,
} from '../../common';
import runCommonEpisodeTests from './commonEpisodeTests';

export default ({ service, pageType }) => {
  runCommonCrossPlatformTests(service);
  runCommonEpisodeTests();
  runRecentEpisodesTests();
  runMediaPlayerAudioTests();
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();
  runRadioScheduleTests(pageType);
};
