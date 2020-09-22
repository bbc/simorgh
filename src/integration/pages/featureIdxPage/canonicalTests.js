import runCrossPlatformTests from './crossPlatformTests';
import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
  runSeoCanonicalTests,
} from '../../common';

export default service => {
  runCrossPlatformTests(service);
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();
  runSeoCanonicalTests(service);
};
