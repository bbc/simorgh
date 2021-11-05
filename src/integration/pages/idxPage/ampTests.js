import runCrossPlatformTests from './crossPlatformTests';
import {
  runCoreAmpTests,
  runAmpFooterTests,
  runAmpAnalyticsTests,
  runSeoAmpTests,
} from '../../common';

export default service => {
  runCrossPlatformTests(service);
  runAmpFooterTests();
  runCoreAmpTests();
  runAmpAnalyticsTests();
  runSeoAmpTests();
};
