import {
  runCoreAmpTests,
  runAmpAnalyticsTests,
  runSeoAmpTests,
} from '../../common';
import runCrossPlatformTests from './crossPlatformTests';

export default service => {
  runCrossPlatformTests(service);
  runCoreAmpTests();
  runAmpAnalyticsTests();
  runSeoAmpTests();
};
