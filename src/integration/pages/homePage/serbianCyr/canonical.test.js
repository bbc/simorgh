/**
 * @service serbian
 * @pathname /serbian/cyr
 */

import serbianData from '#data/serbian/homePage/cyr.json';
import runCanonicalTests from '../canonicalTests';

describe('Canonical', () => {
  const { data: pageData } = serbianData;
  describe(pageType, () => {
    runCanonicalTests({ service, pageData });
  });
});
