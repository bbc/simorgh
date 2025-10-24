/**
 * @service kyrgyz
 * @pathname /kyrgyz
 */

import kyrgyzData from '#data/kyrgyz/homePage/index.json';
import runCanonicalTests from '../canonicalTests';

describe('Canonical', () => {
  const { data: pageData } = kyrgyzData;
  describe(pageType, () => {
    runCanonicalTests({ service, pageData });
  });
});
