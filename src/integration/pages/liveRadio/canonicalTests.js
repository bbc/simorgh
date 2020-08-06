import runCrossPlatformTests from './crossPlatformTests';
import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
} from '../../common';

export default () => {
  runCrossPlatformTests();
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();

  describe('Radio Schedule canonical', () => {
    const hasRadioSchedule = service === 'korean';
    const scheduleWrapper = document.querySelector(
      '[data-e2e="radio-schedule"]',
    );

    if (hasRadioSchedule) {
      it('should be in the document', () => {
        expect(scheduleWrapper).toBeInTheDocument();
      });
    } else {
      it('should not be in the document', () => {
        expect(scheduleWrapper).not.toBeInTheDocument();
      });
    }
  });
};
