import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
} from '../../common';
import runCrossPlatformTests from './crossPlatformTests';

export default service => {
  runCrossPlatformTests(service, 'MAP');
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();
};
