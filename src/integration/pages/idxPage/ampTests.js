import runCrossPlatformTests from './crossPlatformTests';
import {
  runCoreAmpTests,
  runAmpAnalyticsTests,
  runSeoAmpTests,
} from '../../common';

export default service => {
  runCrossPlatformTests(service);
  runCoreAmpTests();
  runAmpAnalyticsTests();
  runSeoAmpTests();
};
