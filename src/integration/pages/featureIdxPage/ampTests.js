import runCrossPlatformTests from './crossPlatformTests';
import {
  runCoreAmpTests,
  runAmpFooterTests,
  runAmpAnalyticsTests,
} from '../../common';

export default service => {
  runCrossPlatformTests(service);
  runAmpFooterTests();
  runCoreAmpTests();
  runAmpAnalyticsTests();
};
