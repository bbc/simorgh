/**
 * @service hindi
 * @pathname /hindi
 */

import runCanonicalTests from '../canonicalTests';
import { data as pageData } from '../../../../../data/hindi/homePage/index.json';

describe('Canonical', () => {
  describe(pageType, () => {
    runCanonicalTests({ service, pageData });
  });
});
