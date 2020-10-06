import runCrossPlatformTests from './crossPlatformTests';
import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
} from '../../common';

export default service => {
  runCrossPlatformTests(service);
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();
};
