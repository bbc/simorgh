import {
  runCoreAmpTests,
  runAmpAnalyticsTests,
  runSeoAmpTests,
} from '#src/integration/common';
import runCrossPlatformTests from './crossPlatformTests';

export default service => {
  runCrossPlatformTests(service);
  runCoreAmpTests();
  runAmpAnalyticsTests();
  runSeoAmpTests();
};
