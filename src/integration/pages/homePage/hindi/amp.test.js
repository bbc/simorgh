/**
 * @service hindi
 * @pathname /hindi
 */

import runAmpTests from '../ampTests';
import { data as pageData } from '../../../../../data/hindi/homePage/index.json';

describe('AMP', () => {
  describe(pageType, () => {
    runAmpTests({ service, pageData });
  });
});
