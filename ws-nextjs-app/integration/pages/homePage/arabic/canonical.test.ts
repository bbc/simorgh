/**
 * @service arabic
 * @pathname /arabic
 * @displayAds true
 */

import arabicData from '#data/arabic/homePage/index.json';
import runCanonicalTests from '../canonicalTests';

describe('Canonical', () => {
  const { data: pageData } = arabicData;
  describe(pageType, () => {
    runCanonicalTests({ service, pageData, displayAds: true });
  });
});
