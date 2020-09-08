import {
  runCoreAmpTests,
  runAmpAnalyticsTests,
  runRadioScheduleTests,
} from '../../common';
import runCrossPlatformTests from './crossPlatformTests';

export default service => {
  runCrossPlatformTests(service);
  runCoreAmpTests();
  runAmpAnalyticsTests();
  runRadioScheduleTests({ isAmp: true });
};
