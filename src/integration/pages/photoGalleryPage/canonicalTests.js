import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
} from '../../common';
import runCrossPlatformTests from './crossPlatformTests';

export default service => {
  runCrossPlatformTests(service, 'PGL');
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();
};
