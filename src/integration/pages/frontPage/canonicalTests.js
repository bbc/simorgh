import runCrossPlatformTests from './crossPlatformTests';
import CanonicalAd from '../../../../src/app/containers/Ad/Canonical';
import { ServiceContext } from '../../../../src/app/contexts/ServiceContext';
import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
} from '../../common';

export default () => {
  runCrossPlatformTests();
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

  describe('Ads', () => {
    const hasAds = service === 'arabic';
    const id = document.getElementById('google_image_div');
    jest.mock('CanonicalAd', () => ({ leaderboard }) => ({
      showAdsBasedOnLocation: true,
      queryString: '',
    }));

    if (hasAds) {
      it('leaderboard ad should be in the document', () => {
        expect(id).toBeInTheDocument();
      });
    } else {
      it('leaderboard ad should not be in the document', () => {
        expect(id).not.toBeInTheDocument();
      });
    }
  });
};
