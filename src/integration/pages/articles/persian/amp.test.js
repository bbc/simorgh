/**
 * @service persian
 * @pathname /persian/articles/c4vlle3q337o
 */

import runAmpTests from '../ampTests';
import runImpageCopyrightNonBBC from '../imageCopyrightNonBBC';

describe('AMP', () => {
  describe(pageType, () => {
    runAmpTests(service);
    runImpageCopyrightNonBBC();
  });
});
