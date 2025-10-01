import {
  // runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
} from '#src/integration/common';
import runCrossPlatformTests from './crossPlatformTests';

export default service => {
  runCrossPlatformTests(service);
  // debuggggg
  // runCoreCanonicalTests();

  if (service !== 'news') {
    runCanonicalAnalyticsTests();
  }
};
