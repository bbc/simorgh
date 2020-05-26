import runCrossPlatformTests from './crossPlatformTests';
import { runCoreAmpTests, runAmpAnalyticsTests } from '../../common';

export default () => {
  runCrossPlatformTests();
  runCoreAmpTests();
  runAmpAnalyticsTests();
};
