import {
  runCoreAmpTests,
  runAmpAnalyticsTests,
  runRadioScheduleTests,
  runSeoAmpTests,
} from '../../common';

export default () => {
  runCoreAmpTests();
  runAmpAnalyticsTests();
  runRadioScheduleTests({ isAmp: true });
  runSeoAmpTests();
};
