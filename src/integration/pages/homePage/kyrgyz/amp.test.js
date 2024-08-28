/**
 * @service kyrgyz
 * @pathname /kyrgyz
 */

import { data as pageData } from '../../../../../data/kyrgyz/homePage/index.json';
import runAmpTests from '../ampTests';

describe('AMP', () => {
  describe(pageType, () => {
    runAmpTests({ service, pageData });
  });
});
