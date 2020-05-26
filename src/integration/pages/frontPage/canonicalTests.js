import runCrossPlatformTests from './crossPlatformTests';
import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
} from '../../common';

export default () => {
  runCrossPlatformTests();
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();

  it('Radio schedule', () => {
    const hasRadioSchedule = [
      'afrique',
      'arabic',
      'hausa',
      'korean',
      'pashto',
      'somali',
      'swahili',
    ].includes(service);
    const id = document.getElementById('Radio-Schedule');

    if (hasRadioSchedule) {
      expect(id).toBeInTheDocument();
    } else {
      expect(id).not.toBeInTheDocument();
    }
  });
};
