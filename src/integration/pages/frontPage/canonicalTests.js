import runCrossPlatformTests from './crossPlatformTests';
import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
} from '../../common';

export default service => {
  runCrossPlatformTests(service);
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();

  describe('Radio Schedule', () => {
    const hasRadioSchedule = service === 'arabic';
    const id = document.getElementById('Radio-Schedule');

    if (hasRadioSchedule) {
      it('should be in the document', () => {
        expect(id).toBeInTheDocument();
      });
    } else {
      it('should not be in the document', () => {
        expect(id).not.toBeInTheDocument();
      });
    }
  });
};
