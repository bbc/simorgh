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
  const id = document.getElementById('dotcom-leaderboard');
  if (hasAds) {
    it('ad should be in the document', () => {
      expect(id).toBeInTheDocument();
    });
  } else {
    it('ad should not be in the document', () => {
      expect(id).not.toBeInTheDocument();
    });
  }
});
