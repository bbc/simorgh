/**
 * @service hindi
 * @pathname /hindi
 */

import { data as pageData } from '#data/hindi/homePage/index.json';
import runAmpTests from '../ampTests';

describe('AMP', () => {
  describe(pageType, () => {
    runAmpTests({ service, pageData });
  });
});
