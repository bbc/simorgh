import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
  runRadioScheduleTests,
  runSeoCanonicalTests,
} from '../../common';

export default () => {
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();
  runRadioScheduleTests({ isAmp: false });
  runSeoCanonicalTests(service);
};
