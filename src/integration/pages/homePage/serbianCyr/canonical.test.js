/**
 * @service serbian
 * @pathname /serbian/cyr
 */

import runCanonicalTests from '../canonicalTests';
import { data as pageData } from '../../../../../data/serbian/homePage/cyr.json';

describe('Canonical', () => {
  describe(pageType, () => {
    runCanonicalTests({ service, pageData });
  });
});
