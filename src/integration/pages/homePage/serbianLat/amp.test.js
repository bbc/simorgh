/**
 * @service serbian
 * @pathname /serbian/lat
 */

import runAmpTests from '../ampTests';
import { data as pageData } from '../../../../../data/serbian/homePage/lat.json';

describe('AMP', () => {
  describe(pageType, () => {
    runAmpTests({ service, pageData });
  });
});
