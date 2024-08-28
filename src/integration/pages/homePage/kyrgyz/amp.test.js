/**
 * @service kyrgyz
 * @pathname /kyrgyz
 */

import runAmpTests from '../ampTests';
import { data as pageData } from '#data/kyrgyz/homePage/index.json';

describe('AMP', () => {
  describe(pageType, () => {
    runAmpTests({ service, pageData });
  });
});
