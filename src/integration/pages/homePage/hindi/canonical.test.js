/**
 * @service hindi
 * @pathname /hindi
 */

import { data as pageData } from '../../../../../data/hindi/homePage/index.json';
import runCanonicalTests from '../canonicalTests';

describe('Canonical', () => {
  describe(pageType, () => {
    runCanonicalTests({ service, pageData });
  });
});
