import { runCoreAmpTests, runAmpAnalyticsTests } from '#src/integration/common';
import { Services } from '#app/models/types/global';
import runCrossPlatformTests from './crossPlatformTests';

export default (service: Services) => {
  runCrossPlatformTests(service);
  runCoreAmpTests();
  runAmpAnalyticsTests();
};
