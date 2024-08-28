/**
 * @service arabic
 * @pathname /arabic
 * @displayAds true
 */

import { data as pageData } from '../../../../../data/arabic/homePage/index.json';
import runAmpTests from '../ampTests';

describe('AMP', () => {
  describe(pageType, () => {
    runAmpTests({ service, pageData, displayAds: true });
  });
});
