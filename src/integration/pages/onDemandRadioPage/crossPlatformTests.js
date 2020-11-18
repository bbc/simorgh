import {
  runCommonCrossPlatformTests,
  runMediaPlayerEmbedTests,
} from '../../common';
import runCommonEpisodeTests from './commonEpisodeTests';

export default service => {
  runCommonCrossPlatformTests(service);
  runCommonEpisodeTests();
  runMediaPlayerEmbedTests();
};
