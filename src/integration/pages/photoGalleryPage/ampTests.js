import {
  runCoreAmpTests,
  runAmpFooterTests,
  runAmpAnalyticsTests,
} from '../../common';
import runCrossPlatformTests from './crossPlatformTests';

export default service => {
  runCrossPlatformTests(service);
  runAmpFooterTests();
  runCoreAmpTests();
  runAmpAnalyticsTests();
};
