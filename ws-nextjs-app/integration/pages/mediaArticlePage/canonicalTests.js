import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
} from '#src/integration/common';
import runCrossPlatformTests from './crossPlatformTests';

export default service => {
  runCrossPlatformTests(service);
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();
};
