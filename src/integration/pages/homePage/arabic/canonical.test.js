/**
 * @service arabic
 * @pathname /arabic
 * @displayAds true
 */

import runCanonicalTests from '../canonicalTests';
import { data as pageData } from '#data/arabic/homePage/index.json';

describe('Canonical', () => {
  describe(pageType, () => {
    runCanonicalTests({ service, pageData, displayAds: true });
  });
});
