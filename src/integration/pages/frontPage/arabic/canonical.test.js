/**
 * @service arabic
 * @pathname /arabic
 * @displayAds true
 */

import runCrossPlatformTests from '../crossPlatformTests';
import runCanonicalTests from '../canonicalTests';

describe('Canonical', () => {
  describe(pageType, () => {
    runCrossPlatformTests();
    runCanonicalTests();
  });
});

describe('Canonical Ads', () => {
  const hasAds = service === 'arabic';
  const leaderboardId = document.getElementById('dotcom-leaderboard');
  const mpuId = document.getElementById('dotcom-mpu');
  if (hasAds) {
    it('ad should be in the document', () => {
      expect(leaderboardId).toBeInTheDocument();
      expect(mpuId).toBeInTheDocument();
    });
  } else {
    it('ad should not be in the document', () => {
      expect(leaderboardId).not.toBeInTheDocument();
      expect(mpuId).not.toBeInTheDocument();
    });
  }
});
