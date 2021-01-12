import {
  runCommonCrossPlatformTests,
  runMediaPlayerEmbedTests,
  runRecentEpisodesTests,
} from '../../common';
import runCommonEpisodeTests from './commonEpisodeTests';

export default service => {
  runCommonCrossPlatformTests(service);
  runCommonEpisodeTests();
  runRecentEpisodesTests();
  runMediaPlayerEmbedTests();
};
