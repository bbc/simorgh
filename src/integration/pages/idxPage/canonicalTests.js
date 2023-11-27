import runCrossPlatformTests from './crossPlatformTests';
import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
  runMostReadTests,
} from '../../common';

export default service => {
  runCrossPlatformTests(service);
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();

  runMostReadTests();

  describe('Radio Schedule', () => {
    const id = document.getElementById('Radio-Schedule');

    it('should not be in the document', () => {
      expect(id).not.toBeInTheDocument();
    });
  });
};
