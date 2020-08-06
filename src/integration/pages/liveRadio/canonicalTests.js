import runCrossPlatformTests from './crossPlatformTests';
import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
  runRadioScheduleTests,
} from '../../common';

const servicesWithRadioSchedule = ['indonesia'];
const servicesWithoutRadioSchedule = ['gahuza'];

export default () => {
  runCrossPlatformTests();
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();

  if (servicesWithRadioSchedule.includes(service)) {
    runRadioScheduleTests({ shouldBeInTheDocument: true });
  }
  if (servicesWithoutRadioSchedule.includes(service)) {
    runRadioScheduleTests({ shouldBeInTheDocument: false });
  }
};
