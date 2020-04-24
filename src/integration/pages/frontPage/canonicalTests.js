import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
} from '../../common';

export default () => {
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();

  it('I can see a radio schedule component with an id', () => {
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
