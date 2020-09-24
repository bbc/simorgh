import runCrossPlatformTests from './crossPlatformTests';
import { runCoreAmpTests, runAmpAnalyticsTests } from '../../common';

export default service => {
  runCrossPlatformTests(service);
  runCoreAmpTests();
  runAmpAnalyticsTests();
};
