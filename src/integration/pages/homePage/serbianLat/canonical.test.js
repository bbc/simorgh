/**
 * @service serbian
 * @pathname /serbian/lat
 */

import runCanonicalTests from '../canonicalTests';
import { data as pageData } from '../../../../../data/serbian/homePage/lat.json';

describe('Canonical', () => {
  describe(pageType, () => {
    runCanonicalTests({ service, pageData });
  });
});
