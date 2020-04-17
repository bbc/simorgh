/**
 * @service pidgin
 * @pathname /pidgin
 */

import { runCoreAmpTests, runAmpAnalyticsTests } from '../../common';

describe('AMP Front page', () => {
  runCoreAmpTests();
  runAmpAnalyticsTests();
});
