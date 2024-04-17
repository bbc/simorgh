import {
  runCommonCrossPlatformTests,
  runMediaPlayerEmbedLegacyTests,
  runRecentEpisodesTests,
} from '../../common';
import runCommonEpisodeTests from './commonEpisodeTests';

export default service => {
  runCommonCrossPlatformTests(service);
  runCommonEpisodeTests();
  runMediaPlayerEmbedLegacyTests();
  runRecentEpisodesTests();
};
