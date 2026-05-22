/**
 * @service mundo
 * @pathname /mundo/articles/ce42wzqr2mko
 */

import { runLiteSiteTests, runLiteInlinedCssTests } from '../../../common';

describe('Lite Site', () => {
  describe(pageType, () => {
    runLiteSiteTests();
    runLiteInlinedCssTests();
  });
});
