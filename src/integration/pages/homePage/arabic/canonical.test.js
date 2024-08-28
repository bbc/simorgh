/**
 * @service arabic
 * @pathname /arabic
 * @displayAds true
 */

import { data as pageData } from '#data/arabic/homePage/index.json';
import runCanonicalTests from '../canonicalTests';

describe('Canonical', () => {
  describe(pageType, () => {
    runCanonicalTests({ service, pageData, displayAds: true });
  });
});
