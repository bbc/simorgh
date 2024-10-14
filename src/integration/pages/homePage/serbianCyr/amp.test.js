/**
 * @service serbian
 * @pathname /serbian/cyr
 */

import runAmpTests from '../ampTests';
import { data as pageData } from '../../../../../data/serbian/homePage/cyr.json';

describe('AMP', () => {
  describe(pageType, () => {
    runAmpTests({ service, pageData });
  });
});
