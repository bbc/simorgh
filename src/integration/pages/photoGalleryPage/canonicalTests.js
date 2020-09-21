import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
  runSeoCanonicalTests,
} from '../../common';
import runCrossPlatformTests from './crossPlatformTests';

export default service => {
  runCrossPlatformTests(service);
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();
  runSeoCanonicalTests(service);
};
