/**
 * @service serbian
 * @pathname /serbian/lat
 */

import serbianData from '#data/serbian/homePage/lat.json';
import runCanonicalTests from '../canonicalTests';

describe('Canonical', () => {
  const { data: pageData } = serbianData;
  describe(pageType, () => {
    runCanonicalTests({ service, pageData, displayAds: false }); // is displayAds ever supposed to be true? Where would it come from?
  });
});
