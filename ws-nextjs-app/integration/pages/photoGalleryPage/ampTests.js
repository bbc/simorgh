import { runCoreAmpTests, runAmpAnalyticsTests } from '#src/integration/common';
import runCrossPlatformTests from './crossPlatformTests';

export default service => {
  runCrossPlatformTests(service, 'PGL');
  runCoreAmpTests();
  runAmpAnalyticsTests();
};
