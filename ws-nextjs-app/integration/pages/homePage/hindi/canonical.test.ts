/**
 * @service hindi
 * @pathname /hindi
 */

import hindiData from '#data/hindi/homePage/index.json';
import runCanonicalTests from '../canonicalTests';

describe('Canonical', () => {
  const { data: pageData } = hindiData;
  describe(pageType, () => {
    runCanonicalTests({ service, pageData, displayAds: false }); // is displayAds ever supposed to be true? Where would it come from?
  });
});
