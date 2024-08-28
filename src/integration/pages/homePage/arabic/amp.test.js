/**
 * @service arabic
 * @pathname /arabic
 * @displayAds true
 */

import runAmpTests from '../ampTests';
import { data as pageData } from '#data/arabic/homePage/index.json';

describe('AMP', () => {
  describe(pageType, () => {
    runAmpTests({ service, pageData, displayAds: true });
  });
});
