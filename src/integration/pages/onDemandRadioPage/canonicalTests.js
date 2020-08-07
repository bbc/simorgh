import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
  runRadioScheduleTests,
} from '../../common';

export default () => {
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();
  runRadioScheduleTests({ isAmp: false });
};
