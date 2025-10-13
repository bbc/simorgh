import { runCoreAmpTests, runAmpAnalyticsTests } from '#src/integration/common';
import runCrossPlatformTests from './crossPlatformTests';

export default (service: string) => {
  runCrossPlatformTests(service);
  runCoreAmpTests();
  runAmpAnalyticsTests();
};
