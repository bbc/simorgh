/**
 * @service kyrgyz
 * @pathname /kyrgyz
 */

import runCanonicalTests from '../canonicalTests';
import { data as pageData } from '#data/kyrgyz/homePage/index.json';

describe('Canonical', () => {
  describe(pageType, () => {
    runCanonicalTests({ service, pageData });
  });
});
