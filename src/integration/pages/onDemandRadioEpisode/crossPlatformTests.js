import {
  runCommonCrossPlatformTests,
  runMediaPlayerEmbedTests,
} from '../../common';
import runCommonEpisodeTests from './commonEpisodeTests';

export default () => {
  runCommonCrossPlatformTests();
  runCommonEpisodeTests();
  runMediaPlayerEmbedTests();
};
