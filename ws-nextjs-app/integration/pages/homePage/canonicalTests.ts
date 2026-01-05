import numberOfCurations from './numberOfCurations';
import {
  runCoreCanonicalTests,
  runMostReadTests,
  runCanonicalAdsTests,
  runCanonicalAnalyticsTests,
} from '../../common';
import runCrossPlatformTests from './crossPlatformTests';

export default ({ service, pageData, displayAds }) => {
  runCrossPlatformTests({ service });
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();
  runMostReadTests();
  numberOfCurations(pageData);
  if (displayAds) {
    runCanonicalAdsTests();
  }

  describe('Radio Schedule', () => {
    const radioScheduleComponent = document.getElementById('Radio-Schedule');

    if (service === 'arabic') {
      it('should be in the document', () => {
        expect(radioScheduleComponent).toBeInTheDocument();
      });
    } else {
      it('should not be in the document', () => {
        expect(radioScheduleComponent).not.toBeInTheDocument();
      });
    }
  });

  describe('Embed', () => {
    const embedComponent = document.querySelector('[data-testid="embed"]');
    if (service === 'marathi') {
      it('should be in the document', () => {
        expect(embedComponent).toBeInTheDocument();
      });
    } else {
      it('should not be in the document', () => {
        expect(embedComponent).not.toBeInTheDocument();
      });
    }
  });
};
