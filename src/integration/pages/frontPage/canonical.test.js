/**
 * @service pidgin
 * @pathname /pidgin
 */

import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
} from '../../common';

describe('Canonical Front page', () => {
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();
});
