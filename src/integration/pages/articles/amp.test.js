/**
 * @service pidgin
 * @pathname /pidgin/tori-51745682
 */

import { runCoreAmpTests, runAmpAnalyticsTests } from '../../common';

describe('AMP Articles', () => {
  runCoreAmpTests();
  runAmpAnalyticsTests();
});
