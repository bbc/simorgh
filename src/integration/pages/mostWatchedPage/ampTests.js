import {
  runCoreAmpTests,
  runAmpFooterTests,
  runAmpAnalyticsTests,
} from '../../common';
import runCrossPlatformTests from './crossPlatformTests';

export default () => {
  runCrossPlatformTests();
  runAmpFooterTests();
  runCoreAmpTests();
  runAmpAnalyticsTests();
};
