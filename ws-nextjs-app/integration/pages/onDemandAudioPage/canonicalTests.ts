import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
  runRadioScheduleTests,
  runCommonCrossPlatformTests,
  runMediaPlayerAudioTests,
  runRecentEpisodesTests,
} from '../../common';
import runCommonEpisodeTests from './commonEpisodeTests';

export default (service: string) => {
  runCommonCrossPlatformTests(service);
  runCommonEpisodeTests();
  runRecentEpisodesTests();
  runMediaPlayerAudioTests();
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();
  runRadioScheduleTests();
};
