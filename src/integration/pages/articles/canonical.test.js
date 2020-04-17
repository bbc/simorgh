/**
 * @service pidgin
 * @pathname /pidgin/tori-51745682
 */

import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
} from '../../common';

describe('Canonical Articles', () => {
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();
});
