import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
  runRadioScheduleTests,
} from '../../common';

const servicesWithRadioSchedule = ['indonesia'];
const servicesWithoutRadioSchedule = ['gahuza'];

export default () => {
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();

  if (servicesWithRadioSchedule.includes(service)) {
    runRadioScheduleTests({ shouldBeInTheDocument: true });
  }
  if (servicesWithoutRadioSchedule.includes(service)) {
    runRadioScheduleTests({ shouldBeInTheDocument: false });
  }
};
