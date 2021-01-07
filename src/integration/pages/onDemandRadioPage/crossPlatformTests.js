import {
  runCommonCrossPlatformTests,
  runMediaPlayerEmbedTests,
} from '../../common';
import runCommonEpisodeTests from './commonEpisodeTests';
import runCommonRecentEpisodesTests from './commonRecentEpisodesTests';

export default service => {
  runCommonCrossPlatformTests(service);
  runCommonEpisodeTests();
  runCommonRecentEpisodesTests();
  runMediaPlayerEmbedTests();
};
