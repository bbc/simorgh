/**
 * @service persian
 * @pathname /persian/articles/c4vlle3q337o
 */

import runCanonicalTests from '../canonicalTests';
import runImpageCopyrightNonBBC from '../imageCopyrightNonBBC';

describe('Canonical', () => {
  describe(pageType, () => {
    runCanonicalTests(service);
    runImpageCopyrightNonBBC();
  });
});
