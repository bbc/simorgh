import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
  runMediaPlaceholderTests,
} from '../../common';
import runCrossPlatformTests from './crossPlatformTests';

export default service => {
  runCrossPlatformTests(service);
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();
  runMediaPlaceholderTests();
};
