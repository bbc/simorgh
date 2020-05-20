import {
  runCommonCrossPlatformTests,
  runMediaPlayerEmbedTests,
} from '../../common';
import runCommonBrandTests from './commonBrandTests';

export default () => {
  runCommonCrossPlatformTests();
  runCommonBrandTests();
  runMediaPlayerEmbedTests();
};
