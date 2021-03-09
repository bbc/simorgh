import {
  runCoreAmpTests,
  runAmpFooterTests,
  runAmpAnalyticsTests,
  runSeoAmpTests,
} from '../../common';
import runCrossPlatformTests from './crossPlatformTests';

export default service => {
  runCrossPlatformTests(service);
  runAmpFooterTests();
  runCoreAmpTests();
  runAmpAnalyticsTests();
  runSeoAmpTests();
};
