import {
  runCoreAmpTests,
  runAmpAnalyticsTests,
  runRadioScheduleTests,
} from '../../common';

export default () => {
  runCoreAmpTests();
  runAmpAnalyticsTests();
  runRadioScheduleTests({ isAmp: true });
};
