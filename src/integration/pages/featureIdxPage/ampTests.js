import runCrossPlatformTests from './crossPlatformTests';
import {
  runCoreAmpTests,
  runAmpAnalyticsTests,
  runStoryPromoTests,
} from '../../common';

export default service => {
  runCrossPlatformTests(service);
  runCoreAmpTests();
  runAmpAnalyticsTests();
  runStoryPromoTests();
};
