/**
 * @service kyrgyz
 * @pathname /kyrgyz
 */

import { data as pageData } from '#data/kyrgyz/homePage/index.json';
import runCanonicalTests from '../canonicalTests';

describe('Canonical', () => {
  describe(pageType, () => {
    runCanonicalTests({ service, pageData });
  });
});
