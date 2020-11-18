import { runCoreAmpTests, runAmpAnalyticsTests } from '../../common';
import runCrossPlatformTests from './crossPlatformTests';

export default () => {
  runCrossPlatformTests();
  runCoreAmpTests();
  runAmpAnalyticsTests();
};
