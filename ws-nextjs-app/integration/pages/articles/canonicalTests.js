import {
  // runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
} from '#src/integration/common';
import runCrossPlatformTests from './crossPlatformTests';

export default service => {
  runCrossPlatformTests(service);
  // NextJS app is different. Tests need to be changed or removed
  // runCoreCanonicalTests();

  if (service !== 'news') {
    runCanonicalAnalyticsTests();
  }
};
