import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
  runRadioScheduleTests,
} from '../../common';
import runCrossPlatformTests from './crossPlatformTests';

export default service => {
  runCrossPlatformTests(service);
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();
  runRadioScheduleTests({ isAmp: false });
};
