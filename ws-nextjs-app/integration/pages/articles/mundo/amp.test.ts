/**
 * @service mundo
 * @pathname /mundo/articles/ce42wzqr2mko
 */

import runAmpTests from '../ampTests';
import { runAmpInlinedCssTests } from '../../../common';

describe('AMP', () => {
  describe(pageType, () => {
    runAmpTests(service);
    runAmpInlinedCssTests();
  });
});
